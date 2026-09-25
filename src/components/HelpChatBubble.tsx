import React, { useState } from 'react';
import { MessageCircle, X, ChevronRight, HeartPulse, Mountain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HelpChatBubbleProps {
  onSelectProperty: (prop: 'gangtok' | 'kalyani') => void;
}

export const HelpChatBubble: React.FC<HelpChatBubbleProps> = ({ onSelectProperty }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isNight } = useTheme();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
      {isOpen ? (
        <div
          className={`border rounded-2xl shadow-2xl w-80 sm:w-88 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 transition-colors ${
            isNight
              ? 'bg-slate-900 border-slate-700 text-slate-200'
              : 'bg-white border-slate-300 text-slate-800'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              isNight ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`font-semibold text-xs ${isNight ? 'text-white' : 'text-slate-950'}`}>
                Parijai Help & Assistance Desk
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
              className={`p-1 rounded cursor-pointer ${
                isNight ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-950'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className={`text-xs mt-3 leading-relaxed ${isNight ? 'text-slate-300' : 'text-slate-600'}`}>
            Namaste! Need help choosing between our Gangtok mountain residency or Kalyani AIIMS comfort stay?
          </p>

          <div className="mt-4 space-y-2 text-xs">
            <button
              onClick={() => {
                onSelectProperty('gangtok');
                setIsOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between group transition-colors cursor-pointer ${
                isNight
                  ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Mountain className="w-3.5 h-3.5 text-amber-500" />
                <span>I'm planning a Sikkim vacation</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500" />
            </button>

            <button
              onClick={() => {
                onSelectProperty('kalyani');
                setIsOpen(false);
              }}
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between group transition-colors cursor-pointer ${
                isNight
                  ? 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-500" />
                <span>Visiting AIIMS Kalyani for medical care</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500" />
            </button>

            <a
              href="https://wa.me/919163008361?text=Hello%20Parijai%20Group%20of%20Hotels,%20I%20need%20quick%20help%20with%20booking%20and%20tariffs."
              target="_blank"
              rel="noreferrer"
              className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-colors block ${
                isNight
                  ? 'bg-emerald-950/60 hover:bg-emerald-950 border-emerald-800/80 text-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900 font-medium'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold">Chat with Front Desk on WhatsApp</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </a>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
            isNight
              ? 'bg-slate-900/95 hover:bg-slate-800 text-white border-slate-700'
              : 'bg-white/95 hover:bg-slate-50 text-slate-900 border-slate-300 shadow-lg'
          }`}
        >
          <div className="relative">
            <MessageCircle className="w-4 h-4 text-amber-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xs font-semibold">Need help deciding?</span>
        </button>
      )}
    </div>
  );
};
