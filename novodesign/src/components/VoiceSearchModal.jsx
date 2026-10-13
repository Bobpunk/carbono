import React, { useEffect, useState } from 'react';
import { Mic, X, AlertCircle } from 'lucide-react';

export function VoiceSearchModal({ isOpen, onClose, onSearch, isDark }) {
  const [phase, setPhase] = useState('listening'); // 'listening', 'transcribing', 'done', 'error'
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setPhase('listening');
      setTranscript('');
      return;
    }

    const t1 = setTimeout(() => {
      setPhase('listening');
    }, 400);

    const t2 = setTimeout(() => {
      setPhase('transcribing');
      setTranscript('latest artificial intelligence breakthroughs');
    }, 2400);

    const t3 = setTimeout(() => {
      setPhase('done');
      onSearch('latest artificial intelligence breakthroughs');
      onClose();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isOpen, onSearch, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className={`w-full max-w-lg rounded-3xl p-8 shadow-2xl relative transition-all duration-300 ${
          isDark ? 'bg-gray-900 border border-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          aria-label="Close voice search"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <p className="text-xl font-normal text-gray-700 dark:text-gray-300 mb-8 min-h-[32px]">
            {phase === 'listening' && "Listening..."}
            {phase === 'transcribing' && (
              <span className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                &ldquo;{transcript}&rdquo;
              </span>
            )}
            {phase === 'done' && `Searching: "${transcript}"`}
          </p>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute w-28 h-28 bg-red-400/20 rounded-full animate-ping" />
            <div className="absolute w-24 h-24 bg-red-500/30 rounded-full animate-pulse" />
            <button
              onClick={() => {
                setPhase('listening');
              }}
              className="relative z-10 w-20 h-20 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              <Mic className="w-10 h-10" />
            </button>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs space-y-2">
            <p className="font-medium text-gray-600 dark:text-gray-300">
              Allow mic access
            </p>
            <p>
              To start searching, open browser settings and let Google use your microphone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}