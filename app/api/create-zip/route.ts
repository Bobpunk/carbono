import { NextResponse } from 'next/server';
import { sandboxManager } from '@/lib/sandbox/sandbox-manager';

declare global {
  var activeSandboxProvider: any;
}

export async function POST() {
  try {
    const provider = sandboxManager.getActiveProvider() || global.activeSandboxProvider;
    if (!provider) {
      return NextResponse.json({ 
        success: false, 
        error: 'No active sandbox' 
      }, { status: 400 });
    }
    
    console.log('[create-zip] Creating project zip...');
    
    // Create zip file in sandbox (shell is not available, so avoid quoted args)
    const zipResult = await provider.runCommand(
      'zip -r /tmp/project.zip . -x node_modules/* .git/* .next/* dist/* build/* *.log'
    );
    
    if (!isCommandSuccessful(zipResult.stdout)) {
      throw new Error(`Failed to create zip: ${zipResult.stderr || zipResult.stdout}`);
    }
    
    // Read the zip file and convert to base64
    const readResult = await provider.runCommand('base64 -w 0 /tmp/project.zip');
    
    if (!isCommandSuccessful(readResult.stdout)) {
      throw new Error(`Failed to read zip file: ${readResult.stderr || readResult.stdout}`);
    }
    
    // runCommand wraps the payload in STDOUT:/Return code markers
    const rawOutput = readResult.stdout || '';
    const stdoutIndex = rawOutput.indexOf('STDOUT:');
    let base64Content = stdoutIndex >= 0 ? rawOutput.slice(stdoutIndex + 'STDOUT:'.length) : rawOutput;
    const endIndex = base64Content.lastIndexOf('Return code:');
    if (endIndex >= 0) {
      base64Content = base64Content.slice(0, endIndex);
    }
    base64Content = base64Content.replace(/\s+/g, '');
    
    if (!base64Content) {
      throw new Error('Zip file is empty');
    }
    
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(base64Content) || base64Content.length % 4 !== 0) {
      throw new Error('Zip output is truncated or invalid');
    }
    
    console.log(`[create-zip] Created project.zip (${base64Content.length} base64 chars)`);
    
    // Create a data URL for download
    const dataUrl = `data:application/zip;base64,${base64Content}`;
    
    return NextResponse.json({
      success: true,
      dataUrl,
      fileName: 'sandbox-project.zip',
      message: 'Zip file created successfully'
    });
    
  } catch (error) {
    console.error('[create-zip] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: (error as Error).message 
      }, 
      { status: 500 }
    );
  }
}

// Provider runCommand output ends with a "Return code: N" footer, and its
// `success` flag only reflects whether the process threw, not the exit code.
function isCommandSuccessful(output: string): boolean {
  return /Return code:\s*0\b/.test(output || '');
}
