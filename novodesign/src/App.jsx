import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchArea } from './components/SearchArea';
import { AppsDrawer } from './components/AppsDrawer';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { SearchResultsModal } from './components/SearchResultsModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [aiMode, setAiMode] = useState(false);
  const [activeQuery, setActiveQuery] = useState('');
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const toggleDark = () => {
    setIsDark(!isDark);
  };

  const handleSearch = (query) => {
    setActiveQuery(query);
    setIsResultsOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
    }`}>
      {/* Top Navigation */}
      <Header
        isDark={isDark}
        onToggleDark={toggleDark}
        onOpenApps={() => setIsAppsOpen(true)}
        aiMode={aiMode}
        onToggleAiMode={() => setAiMode(!aiMode)}
      />

      {/* Center Search Landing */}
      <SearchArea
        isDark={isDark}
        aiMode={aiMode}
        onSearch={handleSearch}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />

      {/* Bottom Footer */}
      <Footer
        isDark={isDark}
        onToggleDark={toggleDark}
      />

      {/* Google Apps 3x3 modal drawer */}
      <AppsDrawer
        isOpen={isAppsOpen}
        onClose={() => setIsAppsOpen(false)}
        isDark={isDark}
      />

      {/* Voice Search listening preview modal */}
      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onSearch={handleSearch}
        isDark={isDark}
      />

      {/* Interactive Google Search Results view */}
      <SearchResultsModal
        query={activeQuery}
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}