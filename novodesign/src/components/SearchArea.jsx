import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Mic, 
  Camera, 
  Sparkles, 
  Clock, 
  X, 
  FileUp, 
  Image as ImageIcon, 
  Lightbulb, 
  Compass, 
  Layers 
} from 'lucide-react';

const SUGGESTIONS = [
  "Create images, illustrations, and art",
  "Canvas: A workspace to create, edit, and save your progress",
  "Ask about files and documents",
  "Brainstorm ideas with Gemini",
  "Build, create, and do more with AI tools",
  "Google Fitbit Edge health coaching",
  "Google I/O developer highlights",
  "Pixel 9 Pro features and camera",
  "Weather forecast this weekend",
  "How Search works ranking algorithms"
];

const RECENT_SEARCHES = [
  "Google Gemini AI live updates",
  "Google Pixel Fold specifications",
  "Latest world technology news"
];

export function SearchArea({ isDark, aiMode, onSearch, onOpenVoice }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showFileModal, setShowFileModal] = useState(false);
  const searchContainerRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleFeelingLucky = () => {
    const luckyQueries = [
      "Google Doodles archive",
      "Google Earth Voyager",
      "Google Arts & Culture virtual tours",
      "Google Chrome Dino Game",
      "Google AI experiments"
    ];
    const picked = luckyQueries[Math.floor(Math.random() * luckyQueries.length)];
    onSearch(picked);
  };

  const filteredSuggestions = SUGGESTIONS.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow px-4 pb-12">
      {/* Google Logo / Brand */}
      <div className="mb-7 select-none text-center">
        {aiMode ? (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="flex items-center space-x-2">
              <span className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Google
              </span>
              <span className="px-2 py-0.5 text-xs font-bold tracking-widest uppercase bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md">
                AI Mode
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 font-normal">
              Supercharged with Gemini intelligence and file canvas
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center text-7xl sm:text-8xl md:text-9xl font-semibold tracking-tighter">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </div>
        )}
      </div>

      {/* Main Search Container */}
      <div 
        ref={searchContainerRef}
        className="w-full max-w-[660px] relative z-20"
      >
        <form
          onSubmit={handleSubmit}
          className={`w-full flex items-center px-4 py-3 rounded-full transition-all duration-200 border ${
            isFocused
              ? isDark
                ? 'bg-gray-800 border-gray-600 shadow-xl'
                : 'bg-white border-transparent shadow-xl ring-1 ring-gray-200'
              : isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600 hover:shadow-md'
              : 'bg-white border-gray-200 hover:border-transparent hover:shadow-md'
          }`}
        >
          <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={aiMode ? "What's on your mind? Ask, create, or brainstorm..." : "Search Google or type a URL"}
            className={`w-full bg-transparent border-none outline-none text-base placeholder-gray-400 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 mr-2"
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={onOpenVoice}
            className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition mr-1"
            title="Search by voice"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Google Lens / Image Search Button */}
          <button
            type="button"
            onClick={() => setShowFileModal(true)}
            className="p-2 text-blue-500 hover:text-blue-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            title="Search by image or file"
          >
            <Camera className="w-5 h-5" />
          </button>
        </form>

        {/* Suggestions Autocomplete Dropdown */}
        {isFocused && (
          <div
            className={`absolute left-0 right-0 top-full mt-2 rounded-2xl shadow-2xl border overflow-hidden backdrop-blur-md transition-all ${
              isDark
                ? 'bg-gray-800/95 border-gray-700 text-gray-200'
                : 'bg-white/95 border-gray-200 text-gray-800'
            }`}
          >
            {/* Recent Searches */}
            {!query && (
              <div className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Recent searches
                </div>
                {RECENT_SEARCHES.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setQuery(item);
                      onSearch(item);
                    }}
                    className={`flex items-center justify-between px-4 py-2 cursor-pointer transition ${
                      isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{item}</span>
                    </div>
                    <span className="text-xs text-gray-400 hover:underline">Delete</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
              </div>
            )}

            {/* Smart Suggestions */}
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                <span>Suggestions</span>
                <span className="text-blue-500 lowercase cursor-pointer hover:underline">See more</span>
              </div>
              {filteredSuggestions.slice(0, 5).map((suggestion, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setQuery(suggestion);
                    onSearch(suggestion);
                  }}
                  className={`flex items-center px-4 py-2.5 cursor-pointer transition ${
                    isDark ? 'hover:bg-gray-750' : 'hover:bg-gray-100'
                  }`}
                >
                  <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {suggestion}
                  </span>
                </div>
              ))}
            </div>

            <div className={`px-4 py-2 text-[11px] text-gray-400 border-t flex justify-between ${
              isDark ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <span>Report inappropriate predictions</span>
              <span>Google SafeSearch</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Chips from Scraped Content */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-5 max-w-2xl">
        <button
          onClick={() => {
            setQuery("Create images: futuristic cityscape with vibrant neon");
            onSearch("Create images: futuristic cityscape with vibrant neon");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
              : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
          <span>Create images</span>
        </button>

        <button
          onClick={() => setShowFileModal(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
              : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FileUp className="w-3.5 h-3.5 text-green-500" />
          <span>Ask about files</span>
        </button>

        <button
          onClick={() => {
            setQuery("Brainstorm: business ideas using multimodal AI in 2026");
            onSearch("Brainstorm: business ideas using multimodal AI in 2026");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
              : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
          <span>Brainstorm</span>
        </button>

        <button
          onClick={() => {
            setQuery("Canvas: interactive workspace for creative projects");
            onSearch("Canvas: interactive workspace for creative projects");
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            isDark 
              ? 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700' 
              : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-500" />
          <span>Canvas</span>
        </button>
      </div>

      {/* Classic Action Buttons */}
      <div className="flex items-center justify-center mt-7">
        <button
          type="button"
          onClick={() => handleSubmit()}
          className={`px-4 py-2 text-sm rounded-md border transition-all duration-150 ${
            isDark
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 hover:border-gray-600'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-100 hover:border-gray-200 shadow-sm'
          }`}
        >
          Google Search
        </button>
      </div>

      {/* Promo banner from scraped content */}
      <div className="mt-8 text-center text-xs sm:text-sm">
        <a
          href="https://store.google.com/category/fitbit"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <span className="font-semibold px-2 py-0.5 rounded text-[11px] bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
            NEW
          </span>
          <span>Get live health coaching on the all-new Google Fitbit Edge</span>
        </a>
      </div>

      {/* File/Image Upload Modal */}
      {showFileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className={`w-full max-w-md rounded-3xl p-6 shadow-2xl relative ${
            isDark ? 'bg-gray-900 border border-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            <button
              onClick={() => setShowFileModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-semibold mb-2">Search with Google Lens &amp; Files</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Search any image to find the source, shop products, or upload files for AI answers.
            </p>

            <div className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition ${
              isDark 
                ? 'border-gray-700 hover:border-blue-500 bg-gray-850' 
                : 'border-gray-300 hover:border-blue-500 bg-gray-50'
            }`}>
              <Camera className="w-10 h-10 text-blue-500 mb-3" />
              <p className="text-sm font-medium mb-1">Drag an image or document here</p>
              <p className="text-xs text-gray-400 mb-4">PNG, JPG, PDF, TXT supported</p>
              <button
                type="button"
                onClick={() => {
                  setShowFileModal(false);
                  onSearch("Analyzed document: Summary and insights");
                }}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-full hover:bg-blue-700 shadow"
              >
                Upload a file
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}