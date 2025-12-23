import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Users, 
  MessageCircle, 
  ArrowLeft,
  MoreVertical,
  Phone,
  Video
} from 'lucide-react';
import { useSocket } from '../../contexts/SocketContext';
import { getChatMessages, sendMessage, markAsRead } from '../../services/chatApi';

const Chat = ({ chat, onClose, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (chat) {
      loadMessages();
    }
  }, [chat]);

  useEffect(() => {
    if (socket && chat && connected) {
      // Join chat room
      socket.emit('join_chat', chat._id);

      // Listen for new messages
      socket.on('new_message', (message) => {
        if (message.chat === chat._id || message.chat?._id === chat._id) {
          setMessages(prev => {
            // Check if message already exists to avoid duplicates
            const exists = prev.some(msg => msg._id === message._id);
            if (exists) return prev;
            return [...prev, message];
          });
        }
      });

      // Listen for typing indicators
      socket.on('user_typing', (data) => {
        if (data.chatId === chat._id) {
          setTyping(true);
        }
      });

      socket.on('user_stopped_typing', (data) => {
        if (data.chatId === chat._id) {
          setTyping(false);
        }
      });

      return () => {
        socket.emit('leave_chat', chat._id);
        socket.off('new_message');
        socket.off('user_typing');
        socket.off('user_stopped_typing');
      };
    }
  }, [socket, chat, connected]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const messagesData = await getChatMessages(chat._id);
      setMessages(messagesData);
      // Mark messages as read
      await markAsRead(chat._id);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    try {
      if (socket && connected) {
        // Send via Socket.io for real-time when connected
        socket.emit('send_message', {
          chatId: chat._id,
          content: messageContent,
          type: 'text'
        });
      } else {
        // Fallback to API when socket is disconnected
        const newMsg = await sendMessage(chat._id, messageContent);
        setMessages(prev => [...prev, newMsg]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message if sending failed
      setNewMessage(messageContent);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (socket && connected) {
      if (e.target.value.trim()) {
        socket.emit('typing_start', { chatId: chat._id });
      } else {
        socket.emit('typing_stop', { chatId: chat._id });
      }
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  };

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full bg-neutral-50">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-600 mb-2">No chat selected</h3>
          <p className="text-neutral-500">Choose a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              {chat.type === 'group' ? (
                <Users className="w-5 h-5 text-primary-600" />
              ) : (
                <MessageCircle className="w-5 h-5 text-primary-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">
                {chat.name || chat.participants?.find(p => p._id !== getCurrentUser()?._id)?.name || 'Chat'}
              </h3>
              <p className="text-sm text-neutral-500">
                {chat.type === 'group' 
                  ? `${chat.participants?.length || 0} members`
                  : 'Online'
                }
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-neutral-600" />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Video className="w-5 h-5 text-neutral-600" />
          </button>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const senderId = message.sender?._id || message.sender;
              const currentUserId = getCurrentUser()?._id;
              const isOwn = senderId === currentUserId || senderId?.toString() === currentUserId?.toString();
              const prevSenderId = index > 0 ? (messages[index - 1].sender?._id || messages[index - 1].sender) : null;
              const showAvatar = index === 0 || prevSenderId?.toString() !== senderId?.toString();
              
              return (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {!isOwn && showAvatar && (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary-600">
                        {message.sender.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-xs lg:max-w-md ${isOwn ? 'items-end' : 'items-start'}`}>
                    {!isOwn && showAvatar && (
                      <span className="text-xs text-neutral-500 mb-1">
                        {message.sender.name}
                      </span>
                    )}
                    
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isOwn
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <span className="text-xs text-neutral-400 mt-1">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  
                  {isOwn && showAvatar && (
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-white">
                        {message.sender.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
            
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start gap-2"
              >
                <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
                </div>
                <div className="bg-neutral-100 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-neutral-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder={connected ? "Type a message..." : "Type a message... (offline mode)"}
            className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        
        {!connected && (
          <p className="text-xs text-amber-600 mt-2 text-center">
            ⚠️ Offline mode - Messages will be sent when connection is restored
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;





