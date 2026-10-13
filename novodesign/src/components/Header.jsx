import React, { useState } from 'react';
import { Grid, Moon, Sun, User, Sparkles } from 'lucide-react';

export function Header({ isDark, onToggleDark, onOpenApps, aiMode, onToggleAiMode }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 text-sm select-none">
      <div className="flex items-center space-x-5">
        <a
          href="https://about.google/?fg=1"
          target="_blank"
          rel="noreferrer"
          className={`transition-colors duration-150 hover:underline ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          About
        </a>
        <a
          href="https://store.google.com/US?hl=en-US"
          target="_blank"
          rel="noreferrer"
          className={`transition-colors duration-150 hover:underline ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Store
        </a>

        <button
          onClick={onToggleAiMode}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
            aiMode
              ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
              : isDark
              ? 'bg-gray-800 text-blue-400 border-gray-700 hover:bg-gray-750'
              : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
          }`}
          title="Toggle Gemini AI Search Engine Mode"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Mode</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <a
          href="https://mail.google.com"
          target="_blank"
          rel="noreferrer"
          className={`transition-colors duration-150 hover:underline ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Gmail
        </a>
        <a
          href="https://images.google.com"
          target="_blank"
          rel="noreferrer"
          className={`transition-colors duration-150 hover:underline ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Images
        </a>

        {/* Theme toggle */}
        <button
          onClick={onToggleDark}
          className={`p-2 rounded-full transition-colors duration-150 ${
            isDark
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          aria-label="Toggle Dark Mode"
          title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Apps Drawer Icon */}
        <button
          onClick={onOpenApps}
          className={`p-2 rounded-full transition-colors duration-150 ${
            isDark
              ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          aria-label="Google apps"
          title="Google apps"
        >
          <Grid className="w-5 h-5" />
        </button>

        {/* Sign In Button / User Avatar */}
        <a
          href="https://accounts.google.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-md transition-all duration-150"
        >
          Sign in
        </a>
      </div>
    </header>
  );
}