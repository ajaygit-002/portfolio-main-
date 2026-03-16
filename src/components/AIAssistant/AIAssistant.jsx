'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistant.module.css';
import { FaTimes, FaCircle, FaPaperPlane } from 'react-icons/fa';


/* Professional "A" Monogram SVG Icon */
function AIcon({ size = 24, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="rgba(17,25,40,0.8)" stroke="url(#aiIconGrad)" strokeWidth="2" />
      <path
        d="M24 12L15 36H19.5L21.4 31H26.6L28.5 36H33L24 12ZM22.6 27.5L24 23L25.4 27.5H22.6Z"
        fill="url(#aiIconGrad)"
      />
    </svg>
  );
}


export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hey! 👋 I'm the AI assistant for Ajay's portfolio. Ask me anything about projects, skills, tech stack, or experience!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('connecting');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Check server health on mount
  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        setServerStatus('connected');
      } else {
        setServerStatus('error');
      }
    } catch (error) {
      setServerStatus('disconnected');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: inputValue,
          conversation_history: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '⚠️ Could not connect to the MCP server. Make sure it\'s running on port 8000.\n\nRun: `python -m uvicorn app.main:app --reload --port 8000`'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "🚀 Tell me about your projects",
    "💻 What's your tech stack?",
    "🎯 What are your core skills?",
    "📈 Describe your experience"
  ];

  const handleSuggestedQuestion = (question) => {
    // Remove emoji prefix for the actual query
    setInputValue(question.replace(/^[^\s]+ /, ''));
  };

  return (
    <>
      {/* Floating Chat Button with A Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className={styles.chatButton}
        title="Ask AI about this portfolio"
        aria-label="Open AI Assistant"
      >
        <AIcon size={32} className={styles.chatButtonIcon} />
        <span className={styles.badge} />
        <span className={styles.ripple} />
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className={styles.chatOverlay}>
          <div className={styles.chatWindow}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.titleSection}>
                  <div className={styles.titleRow}>
                    <AIcon size={28} className={styles.headerIcon} />
                    <h3 className={styles.title}>Portfolio AI</h3>
                  </div>
                  <div className={styles.statusIndicator}>
                    <FaCircle
                      className={styles.statusDot}
                      style={{
                        color: serverStatus === 'connected' ? '#10b981' :
                               serverStatus === 'disconnected' ? '#ef4444' : '#f59e0b'
                      }}
                    />
                    <span className={styles.statusText}>
                      {serverStatus === 'connected' && 'MCP Connected'}
                      {serverStatus === 'disconnected' && 'Server Offline'}
                      {serverStatus === 'error' && 'Connection Error'}
                      {serverStatus === 'connecting' && 'Connecting...'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={styles.closeButton}
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${styles.message} ${styles[message.role]}`}
                >
                  {message.role === 'assistant' && (
                    <div className={styles.avatar}>
                      <AIcon size={20} />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.avatar}>
                    <AIcon size={20} />
                  </div>
                  <div className={styles.messageContent}>
                    <div className={styles.loadingDots}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 2 && !isLoading && (
              <div className={styles.suggestionsContainer}>
                <p className={styles.suggestionsLabel}>Quick prompts:</p>
                <div className={styles.suggestions}>
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      className={styles.suggestionButton}
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className={styles.inputContainer}>
              <div className={styles.inputWrapper}>
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about projects, skills, experience..."
                  className={styles.input}
                  disabled={isLoading}
                  rows="1"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={styles.sendButton}
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <p className={styles.footerText}>
                Powered by MCP Server • Built by Ajay S
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
