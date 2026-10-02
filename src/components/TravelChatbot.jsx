import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { chatbotContent } from '../data/chatbotContent';
import { getQuickActions, handleChatTurn } from '../utils/chatbotAgent';

function renderBotText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function TravelChatbot() {
  const { lang } = useLanguage();
  const copy = chatbotContent[lang] || chatbotContent.en;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [flow, setFlow] = useState(null);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: copy.welcome }]);
    }
  }, [open, messages.length, copy.welcome]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const pushBotReplies = (replies) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((prev) => [...prev, ...replies.map((text) => ({ role: 'bot', text }))]);
      setTyping(false);
    }, 450);
  };

  const submitText = (raw) => {
    const text = raw.trim();
    if (!text) return;

    const action = quickActions.find((a) => a.value === text);
    setMessages((prev) => [...prev, { role: 'user', text: action ? action.label : text }]);
    setInput('');

    const result = handleChatTurn({ text, lang, flow });
    setFlow(result.flow);
    pushBotReplies(result.replies);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitText(input);
  };

  const quickActions = getQuickActions(lang);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 text-white font-extrabold text-sm shadow-xl shadow-teal-700/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label={copy.openLabel}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">{copy.openLabel}</span>
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-5 right-5 z-[60] w-[min(100vw-1.5rem,24rem)] h-[min(70vh,32rem)] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
          role="dialog"
          aria-label={copy.agentName}
        >
          <header className="flex items-center justify-between gap-2 px-4 py-3 bg-gradient-to-r from-teal-600 to-sky-700 text-white shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black font-outfit truncate">{copy.agentName}</p>
                <p className="text-[10px] text-teal-100 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {copy.agentSubtitle}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-white/15 transition-colors"
              aria-label={copy.closeLabel}
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-slate-50 dark:bg-slate-950/80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap font-medium ${
                    msg.role === 'user'
                      ? 'bg-teal-600 text-white rounded-br-md'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-md'
                  }`}
                >
                  {msg.role === 'bot' ? renderBotText(msg.text) : msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold px-1">{copy.thinking}</div>
            )}
          </div>

          <div className="px-2 pb-2 pt-1 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {quickActions.map((action) => (
                <button
                  key={action.value}
                  type="button"
                  onClick={() => submitText(action.value)}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-slate-800 border border-teal-200 dark:border-slate-700 text-[10px] font-bold text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-1 pb-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.placeholder}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md cursor-pointer"
                aria-label={copy.send}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
