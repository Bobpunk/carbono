import React from 'react';
import { 
  Search, 
  Mail, 
  MapPin, 
  Play, 
  FileText, 
  Calendar, 
  HardDrive, 
  MessageSquare, 
  Image, 
  Globe, 
  ShoppingBag, 
  Video 
} from 'lucide-react';

const apps = [
  { name: 'Search', icon: Search, color: 'text-blue-500', link: 'https://www.google.com' },
  { name: 'Maps', icon: MapPin, color: 'text-green-500', link: 'https://maps.google.com' },
  { name: 'YouTube', icon: Play, color: 'text-red-500', link: 'https://youtube.com' },
  { name: 'Play', icon: ShoppingBag, color: 'text-blue-400', link: 'https://play.google.com' },
  { name: 'News', icon: Globe, color: 'text-blue-600', link: 'https://news.google.com' },
  { name: 'Gmail', icon: Mail, color: 'text-red-500', link: 'https://mail.google.com' },
  { name: 'Meet', icon: Video, color: 'text-emerald-500', link: 'https://meet.google.com' },
  { name: 'Chat', icon: MessageSquare, color: 'text-emerald-600', link: 'https://chat.google.com' },
  { name: 'Drive', icon: HardDrive, color: 'text-yellow-500', link: 'https://drive.google.com' },
  { name: 'Calendar', icon: Calendar, color: 'text-blue-500', link: 'https://calendar.google.com' },
  { name: 'Photos', icon: Image, color: 'text-yellow-600', link: 'https://photos.google.com' },
  { name: 'Docs', icon: FileText, color: 'text-blue-600', link: 'https://docs.google.com' },
];

export function AppsDrawer({ isOpen, onClose, isDark }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end p-4 sm:pr-8 sm:pt-16"
      onClick={onClose}
    >
      <div 
        className={`w-80 max-h-96 overflow-y-auto rounded-3xl p-5 shadow-2xl border transition-all duration-200 ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-gray-200' 
            : 'bg-white border-gray-200 text-gray-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-xs font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400">
            Google apps
          </span>
          <button 
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {apps.map((app) => {
            const Icon = app.icon;
            return (
              <a
                key={app.name}
                href={app.link}
                target="_blank"
                rel="noreferrer"
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-150 group ${
                  isDark 
                    ? 'hover:bg-gray-700/60' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`p-2.5 rounded-full mb-1.5 transition-transform duration-150 group-hover:scale-110 ${
                  isDark ? 'bg-gray-750' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${app.color}`} />
                </div>
                <span className="text-xs text-center font-normal truncate w-full">
                  {app.name}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
          <a
            href="https://about.google/products/"
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            More from Google
          </a>
        </div>
      </div>
    </div>
  );
}