import React, { useState, useEffect, useRef } from 'react';

function ChatAI() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('accessToken');

  // Fetch all chats
  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch messages when chat changes
  useEffect(() => {
    if (currentChatId) {
      fetchMessages(currentChatId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatId]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setChats(data.data.chats);
        // Auto select first chat
        if (data.data.chats.length > 0 && !currentChatId) {
          setCurrentChatId(data.data.chats[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.data.chat.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'New Chat' }),
      });
      const data = await response.json();
      if (data.success) {
        setChats([data.data.chat, ...chats]);
        setCurrentChatId(data.data.chat.id);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !currentChatId || isSending) return;

    const messageText = inputMessage;
    setInputMessage('');
    setIsSending(true);

    // Add user message immediately to UI
    const tempUserMessage = {
      id: Date.now(),
      role: 'USER',
      content: messageText,
      createdAt: new Date().toISOString(),
    };
    setMessages([...messages, tempUserMessage]);

    try {
      const response = await fetch(`http://localhost:5000/api/chat/${currentChatId}/message`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: messageText }),
      });

      const data = await response.json();
      if (data.success) {
        // Replace temp message with real messages from server
        setMessages([
          ...messages,
          data.data.userMessage,
          data.data.assistantMessage,
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const deleteChat = async (chatId) => {
    if (!confirm('Hapus chat ini?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/chat/${chatId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setChats(chats.filter((c) => c.id !== chatId));
        if (currentChatId === chatId) {
          setCurrentChatId(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  return (
    <div className="flex h-screen bg-dark">
      {/* Sidebar - Chat List - Hidden on mobile by default */}
      <div className={`
        ${currentChatId ? 'hidden' : 'flex'}
        lg:flex
        w-full lg:w-80
        bg-dark-card border-r border-dark-border flex-col
      `}>
        {/* Header */}
        <div className="p-4 border-b border-dark-border">
          <button
            onClick={createNewChat}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>➕</span>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`p-4 rounded-lg cursor-pointer transition group ${
                currentChatId === chat.id
                  ? 'bg-primary/20 border border-primary'
                  : 'bg-dark hover:bg-dark-border border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{chat.title}</h3>
                  <p className="text-gray-400 text-sm truncate">
                    {chat._count?.messages || 0} messages
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition ml-2"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {chats.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-4">💬</div>
              <p className="font-semibold mb-2">No chats yet</p>
              <p className="text-sm">Create a new chat to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`
        ${currentChatId ? 'flex' : 'hidden lg:flex'}
        flex-1 flex-col
        w-full
      `}>
        {currentChatId ? (
          <>
            {/* Mobile Header - Back button */}
            <div className="lg:hidden bg-dark-card border-b border-dark-border p-4 flex items-center space-x-4">
              <button
                onClick={() => setCurrentChatId(null)}
                className="text-white text-xl"
              >
                ← 
              </button>
              <div className="flex-1">
                <h2 className="text-white font-semibold">
                  {chats.find(c => c.id === currentChatId)?.title || 'Chat'}
                </h2>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-gray-400">Loading messages...</div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center px-4">
                    <div className="text-4xl md:text-6xl mb-4">💬</div>
                    <h3 className="text-lg md:text-xl text-white font-semibold mb-2">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      Type your message below to begin chatting with AI
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={message.id || index}
                    className={`flex ${
                      message.role === 'USER' ? 'justify-end' : 'justify-start'
                    } animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-2xl rounded-2xl px-4 md:px-6 py-3 md:py-4 ${
                        message.role === 'USER'
                          ? 'bg-primary text-white'
                          : 'bg-dark-card border border-dark-border text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <div className="flex-shrink-0 text-lg md:text-xl">
                          {message.role === 'USER' ? '👤' : '🤖'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="whitespace-pre-wrap text-sm md:text-base break-words">{message.content}</p>
                          <p className="text-xs opacity-60 mt-2">
                            {new Date(message.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-dark-border p-3 md:p-6 bg-dark-card">
              <form onSubmit={sendMessage} className="flex items-end space-x-2 md:space-x-4">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-dark border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none text-sm md:text-base"
                    rows="2"
                    disabled={isSending}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isSending}
                  className="px-4 md:px-6 py-2 md:py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>{isSending ? '⏳' : '📤'}</span>
                  <span className="hidden md:inline">Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="hidden lg:flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-2xl text-white font-semibold mb-2">
                Welcome to Karo AI Chat
              </h3>
              <p className="text-gray-400 mb-6">
                Select a chat from the sidebar or create a new one to start
              </p>
              <button
                onClick={createNewChat}
                className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition"
              >
                Create New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatAI;