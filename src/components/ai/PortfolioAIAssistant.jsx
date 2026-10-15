import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, RefreshCw, Mic, MicOff, ExternalLink, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { askTalaAI } from '../../services/aiService';

const STORAGE_KEY = 'tala_portfolio_ai_chat_v3';

const INITIAL_WELCOME = {
  id: 'welcome',
  sender: 'ai',
  text: 'يا أهلاً وسهلاً بك! 👋 أنا المساعد الذكي الخاص بالمطورة **تالة ابوشيحة**.\nيسعدني جداً الإجابة على أي استفسار بخصوص مهارات تالة، مشاريعها الحية، خبراتها في TAQAT و Kafeeli، أو كيفية التواصل معها لبدء مشروع جديد. تفضل بسؤالي أو اختر من الأسئلة السريعة بالأعلى! ✨',
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  actions: [
    { type: 'scroll', target: '#projects', label: 'استعراض المشاريع المميزة 🚀' },
    { type: 'scroll', target: '#skills', label: 'الترسانة التقنية ⚡' },
    { type: 'link', target: 'https://wa.me/970594828270', label: 'محادثة واتساب مباشرة 💬' },
  ],
};

const DEFAULT_QUICK_QUESTIONS = [
  { label: 'من هي تالة؟ 🌸', query: 'مين هي تالة ابوشيحة وما هو مجالها؟' },
  { label: 'أبرز المشاريع 🌟', query: 'ما هي أبرز المشاريع التي طورتها تالة؟' },
  { label: 'الترسانة التقنية ⚡', query: 'ما هي التقنيات والمهارات التي تتقنها تالة؟' },
  { label: 'التواصل والتوظيف 📬', query: 'كيف يمكنني التواصل مع تالة أو توظيفها؟' },
  { label: 'تدريب طاقات 💼', query: 'أخبرني عن خبرة تالة في التدريب وبرنامج TAQAT' },
  { label: 'السيرة الذاتية (CV) 📄', query: 'كيف يمكنني استعراض وتحميل الـ CV الخاص بتالة؟' },
  { label: 'Who is Tala? 🚀', query: 'Who is Tala Abusheha and what does she do?' },
];

export default function PortfolioAIAssistant() {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [INITIAL_WELCOME];
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [followUpChips, setFollowUpChips] = useState(DEFAULT_QUICK_QUESTIONS);

  const chatBottomRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Save conversation to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  // Speech Recognition (Microphone) Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ar-SA';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputMessage((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('المتصفح الحالي لا يدعم التعرف على الصوت المباشر.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  // Stream Typewriter Effect for newly generated message
  const streamMessage = (fullText, actions, msgId) => {
    let currentIdx = 0;
    const step = fullText.length > 200 ? 3 : fullText.length > 80 ? 2 : 1;

    const interval = setInterval(() => {
      currentIdx += step;
      if (currentIdx >= fullText.length) {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, text: fullText, isStreaming: false, actions } : m
          )
        );
      } else {
        const partial = fullText.slice(0, currentIdx);
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, text: partial, isStreaming: true } : m))
        );
      }
    }, 15);
  };

  const handleSendMessage = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputMessage;
    if (!text.trim() || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { text: aiReply, actions, followUps } = await askTalaAI(text.trim(), messages);
      const aiMsgId = (Date.now() + 1).toString();

      const placeholderMsg = {
        id: aiMsgId,
        sender: 'ai',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, placeholderMsg]);
      setIsLoading(false);

      // Start streaming characters
      streamMessage(aiReply, actions, aiMsgId);

      // Update follow-up chips if available
      if (followUps && followUps.length > 0) {
        setFollowUpChips(
          followUps.map((item) => ({
            label: item,
            query: item,
          }))
        );
      }
    } catch {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: 'عذراً، حدث خطأ بسيط. يمكنك التواصل مع تالة مباشرة عبر البريد talaabusheha@gmail.com أو الواتساب +970594828270.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([INITIAL_WELCOME]);
    setFollowUpChips(DEFAULT_QUICK_QUESTIONS);
  };

  const handleActionClick = (action) => {
    if (action.type === 'scroll') {
      const targetElement = document.querySelector(action.target);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'link') {
      window.open(action.target, '_blank', 'noopener,noreferrer');
    }
  };

  // Helper to format basic markdown like **bold**, newlines and links
  const formatText = (content) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, i) => {
      const formattedLine = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g).map((chunk, j) => {
        if (chunk.startsWith('**') && chunk.endsWith('**')) {
          return <strong key={j} className="font-bold text-inherit">{chunk.slice(2, -2)}</strong>;
        }
        if (chunk.startsWith('[') && chunk.includes('](') && chunk.endsWith(')')) {
          const title = chunk.substring(1, chunk.indexOf(']('));
          const url = chunk.substring(chunk.indexOf('](') + 2, chunk.length - 1);
          return (
            <a
              key={j}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline hover:text-indigo-300 font-semibold"
            >
              {title}
            </a>
          );
        }
        return chunk;
      });

      return (
        <React.Fragment key={i}>
          {formattedLine}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Ask Tala's AI Assistant"
            className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-semibold shadow-[0_8px_30px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 border border-indigo-400/40"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
            <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
            <span className="text-sm tracking-wide hidden sm:inline font-bold">Ask about Tala</span>
          </button>
        )}
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] h-[600px] max-h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 ${
            isDarkMode
              ? 'bg-zinc-950/95 border-zinc-800 text-zinc-100 shadow-black/80'
              : 'bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-400/30'
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-4 border-b flex items-center justify-between ${
              isDarkMode ? 'bg-zinc-900/60 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm">Ask about Tala</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  AI Portfolio Assistant • Live
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className={`p-2 rounded-xl transition-colors ${
                  isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-xl transition-colors ${
                  isDarkMode
                    ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div
            className={`px-4 py-2.5 border-b overflow-x-auto no-scrollbar flex gap-2 ${
              isDarkMode ? 'bg-zinc-900/30 border-zinc-800/60' : 'bg-zinc-100/50 border-zinc-200/80'
            }`}
          >
            {followUpChips.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                disabled={isLoading}
                className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap font-medium transition-all duration-200 active:scale-95 flex-shrink-0 ${
                  isDarkMode
                    ? 'bg-zinc-900/80 hover:bg-indigo-600/20 border-zinc-800 hover:border-indigo-500/50 text-zinc-300 hover:text-indigo-300'
                    : 'bg-white hover:bg-indigo-50 border-zinc-200 hover:border-indigo-300 text-zinc-700 hover:text-indigo-600 shadow-sm'
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm flex flex-col gap-2 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none'
                      : isDarkMode
                      ? 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-bl-none'
                      : 'bg-zinc-100 border border-zinc-200/80 text-zinc-800 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{formatText(msg.text)}</div>

                  {/* Interactive Action Triggers (Smooth Scroll / Links) */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1 border-t border-indigo-500/10 mt-1">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(act)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                            isDarkMode
                              ? 'bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/30 text-indigo-300 hover:text-white'
                              : 'bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700'
                          }`}
                        >
                          {act.label}
                          {act.type === 'link' ? (
                            <ExternalLink className="w-3 h-3" />
                          ) : (
                            <ArrowRight className="w-3 h-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[9px] mt-0.5 text-right ${
                      msg.sender === 'user' ? 'text-indigo-200' : isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
                <div
                  className={`rounded-2xl rounded-bl-none px-4 py-3 text-xs border ${
                    isDarkMode ? 'bg-zinc-900/90 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input Footer */}
          <div
            className={`p-3 border-t ${
              isDarkMode ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
            }`}
          >
            <div className="relative flex items-center gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? 'جارٍ الاستماع لصوتك...' : 'Ask about Tala or speak...'}
                className={`w-full py-2.5 pl-4 pr-20 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  isListening
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30'
                    : isDarkMode
                    ? 'bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500'
                    : 'bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 shadow-sm'
                }`}
              />

              {/* Microphone Speech Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-10 p-2 rounded-lg transition-all duration-200 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30'
                    : isDarkMode
                    ? 'text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800'
                    : 'text-zinc-500 hover:text-indigo-600 hover:bg-zinc-100'
                }`}
                title={isListening ? 'إيقاف التسجيل الصوتي' : 'تحدث بالصوت'}
                aria-label="Voice input"
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              </button>

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-1.5 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all duration-200 shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
