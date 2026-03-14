'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistant.module.css';
import { FaRobot, FaTimes, FaCircle, FaPaperPlane } from 'react-icons/fa';


export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm Ajay's portfolio assistant. Ask me anything about their projects, skills, or experience!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('connecting');
  const messagesEndRef = useRef(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Check server health on mount
  useEffect(() => {
    checkServerHealth();
    const interval = setInterval(checkServerHealth, 30000); // Check every 30 seconds
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

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
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
        content: 'Sorry, I encountered an error. Please make sure the MCP server is running on port 8000.'
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
    "Tell me about your projects",
    "What technologies do you use?",
    "What's your strongest skill?",
    "Explain your experience"
  ];

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={styles.chatButton}
        title="Open AI Assistant"
        aria-label="Open AI Assistant"
      >
        <FaRobot className={styles.icon} />
        <span className={styles.badge}></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.titleSection}>
                <h3 className={styles.title}>Portfolio Assistant</h3>
                <div className={styles.statusIndicator}>
                  <FaCircle 
                    className={styles.statusDot} 
                    style={{
                      color: serverStatus === 'connected' ? '#10b981' : 
                             serverStatus === 'disconnected' ? '#ef4444' : '#f59e0b'
                    }}
                  />
                  <span className={styles.statusText}>
                    {serverStatus === 'connected' && 'Connected'}
                    {serverStatus === 'disconnected' && 'Offline'}
                    {serverStatus === 'error' && 'Error'}
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
                    <FaRobot />
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
                  <FaRobot />
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (shown when chat is empty or limited) */}
          {messages.length <= 2 && !isLoading && (
            <div className={styles.suggestionsContainer}>
              <p className={styles.suggestionsLabel}>Try asking:</p>
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
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about projects, skills, experience..."
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

          {/* Footer Info */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Powered by AI • Ajay's Portfolio
            </p>
          </div>
        </div>
      )}
    </>
  );
}
