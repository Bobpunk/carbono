import React, { useState, useRef, useEffect } from 'react';
import { Settings, ExternalLink } from 'lucide-react';

export function Footer({ isDark, onToggleDark }) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <footer className={`w-full text-xs select-none ${
      isDark ? 'bg-gray-950 text-gray-400' : 'bg-gray-100 text-gray-600'
    }`}>
      {/* Top Sub-footer: Location */}
      <div className={`px-6 py-3 border-b flex items-center justify-between ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <span>United States</span>
        <span className="text-[11px] text-gray-400">
          Based on your past activity - Update location
        </span>
      </div>

      {/* Main Footer Links */}
      <div className="px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
          <a
            href="https://www.google.com/intl/en_us/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            Advertising
          </a>
          <a
            href="https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            Business
          </a>
          <a
            href="https://google.com/search/howsearchworks/?fg=1"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            How Search works
          </a>
        </div>

        {/* Center Promotion */}
        <div className="text-center">
          <a
            href="https://ai.google/helpful-tools/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Build, create, and do more with AI tools from Google</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6 relative">
          <a
            href="https://policies.google.com/privacy?hl=en&fg=1"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            Privacy
          </a>
          <a
            href="https://policies.google.com/terms?hl=en&fg=1"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition"
          >
            Terms
          </a>

          {/* Settings Menu */}
          <div ref={settingsRef} className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="hover:underline hover:text-gray-900 dark:hover:text-gray-200 transition cursor-pointer flex items-center gap-1"
            >
              <span>Settings</span>
            </button>

            {showSettings && (
              <div className={`absolute bottom-full right-0 mb-2 w-56 rounded-2xl shadow-xl border py-2 z-30 ${
                isDark ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
              }`}>
                <a
                  href="https://www.google.com/preferences?hl=en&fg=1"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Search settings
                </a>
                <a
                  href="https://www.google.com/advanced_search?hl=en&fg=1"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Advanced search
                </a>
                <a
                  href="https://www.google.com/history/privacyadvisor/search/unauth?utm_source=googlemenu&fg=1&cctld=com"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Your data in Search
                </a>
                <a
                  href="https://www.google.com/history/optout?hl=en&fg=1"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Search history
                </a>
                <a
                  href="https://support.google.com/websearch/?p=ws_results_help&hl=en&fg=1"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Search help
                </a>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    onToggleDark();
                    setShowSettings(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-between"
                >
                  <span>Dark theme</span>
                  <span className="text-gray-400 font-medium">{isDark ? "On" : "Off"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}