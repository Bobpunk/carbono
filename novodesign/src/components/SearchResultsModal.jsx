import React, { useState } from 'react';
import { Search, X, Globe, Sparkles, ExternalLink, ArrowLeft } from 'lucide-react';

export function SearchResultsModal({ query, isOpen, onClose, isDark }) {
  const [activeTab, setActiveTab] = useState('All');

  if (!isOpen) return null;

  const mockResults = [
    {
      title: `${query} - Official Overview & News`,
      url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      snippet: `Explore all latest insights, real-time updates, and resources regarding ${query}. Discover in-depth analysis, comprehensive documentation, and community discussions.`,
      displayUrl: `https://en.wikipedia.org/wiki/${query.replace(/\s+/g, '_')}`
    },
    {
      title: `Gemini AI Overview: Deep Dive into ${query}`,
      url: "https://ai.google/gemini",
      snippet: `AI-generated summary: Key concepts, applications, and verified facts surrounding ${query} broken down clearly with source references.`,
      displayUrl: "https://ai.google/insights"
    },
    {
      title: `What is ${query}? Complete Beginner Guide & Examples`,
      url: "https://support.google.com",
      snippet: `A complete breakdown explaining ${query}. Find answers to commonly asked questions, step-by-step guides, and practical next steps.`,
      displayUrl: "https://guides.google.com/learn"
    },
    {
      title: `Latest Headlines and Discussions on ${query}`,
      url: "https://news.google.com",
      snippet: `Top reporting from trusted publishers worldwide covering recent events, changes, and expert opinions about ${query}.`,
      displayUrl: "https://news.google.com/stories"
    }
  ];

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-10 w-full px-6 py-4 border-b flex items-center justify-between ${
        isDark ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'
      }`}>
        <div className="flex items-center space-x-4 flex-1 max-w-3xl">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            title="Back to Google Home"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="text-2xl font-bold tracking-tight mr-2 hidden sm:block">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </div>

          <div className={`flex items-center flex-1 px-4 py-2 rounded-full border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <span className="text-sm font-medium truncate">{query}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="ml-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className={`px-6 sm:px-24 border-b flex space-x-6 text-sm font-medium ${
        isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
      }`}>
        {['All', 'Images', 'News', 'Videos', 'Maps', 'More'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 border-b-2 transition ${
              activeTab === tab
                ? isDark
                  ? 'border-blue-400 text-blue-400'
                  : 'border-blue-600 text-blue-600'
                : 'border-transparent hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Results Content */}
      <div className="max-w-4xl px-6 sm:px-24 py-6">
        <p className="text-xs text-gray-400 mb-6">
          About 1,420,000,000 results (0.34 seconds)
        </p>

        {/* AI Overview Box */}
        <div className={`p-5 rounded-2xl border mb-8 transition ${
          isDark 
            ? 'bg-blue-950/20 border-blue-900/60' 
            : 'bg-blue-50/70 border-blue-100'
        }`}>
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Overview</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            For <strong className="text-gray-900 dark:text-white">&ldquo;{query}&rdquo;</strong>, current authoritative sources identify primary definitions, operational applications, and ongoing research trends. AI models synthesize these key points to deliver concise reference notes, verified cross-references, and direct access to primary sources.
          </p>
        </div>

        {/* List of results */}
        <div className="space-y-8">
          {mockResults.map((result, index) => (
            <div key={index} className="max-w-2xl">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                <Globe className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{result.displayUrl}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-normal text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mb-1">
                {result.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {result.snippet}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}