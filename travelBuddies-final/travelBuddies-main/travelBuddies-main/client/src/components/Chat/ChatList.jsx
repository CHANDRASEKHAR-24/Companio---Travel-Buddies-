import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  Users, 
  Search, 
  Plus,
  Clock,
  Check,
  CheckCheck
} from 'lucide-react';
import { getUserChats } from '../../services/chatApi';

const ChatList = ({ onSelectChat, selectedChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setLoading(true);
      const chatsData = await getUserChats();
      setChats(chatsData);
    } catch (error) {
      console.error('Error loading chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChats = chats.filter(chat => {
    const searchLower = searchTerm.toLowerCase();
    return (
      chat.name?.toLowerCase().includes(searchLower) ||
      chat.participants?.some(p => p.name?.toLowerCase().includes(searchLower))
    );
  });

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // 7 days
      return messageTime.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageTime.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getChatName = (chat) => {
    if (chat.type === 'group') {
      return chat.name;
    }
    
    // For private chats, show the other participant's name
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const otherParticipant = chat.participants?.find(p => p._id !== currentUser?._id);
    return otherParticipant?.name || 'Unknown User';
  };

  const getChatAvatar = (chat) => {
    if (chat.type === 'group') {
      return <Users className="w-5 h-5 text-primary-600" />;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const otherParticipant = chat.participants?.find(p => p._id !== currentUser?._id);
    return (
      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
        <span className="text-sm font-semibold text-primary-600">
          {otherParticipant?.name?.charAt(0) || '?'}
        </span>
      </div>
    );
  };

  const getLastMessagePreview = (chat) => {
    if (!chat.lastMessage) return 'No messages yet';
    
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const isOwn = chat.lastMessage.sender._id === currentUser?._id;
    const prefix = isOwn ? 'You: ' : '';
    
    return `${prefix}${chat.lastMessage.content}`;
  };

  const getUnreadCount = (chat) => {
    // This would need to be calculated based on read status
    // For now, return 0 as we'd need to track this properly
    return 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Messages</h2>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Plus className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="w-16 h-16 text-neutral-300 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-600 mb-2">
              {searchTerm ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-neutral-500">
              {searchTerm 
                ? 'Try adjusting your search terms'
                : 'Start a conversation with someone!'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {filteredChats.map((chat) => (
              <motion.div
                key={chat._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectChat(chat)}
                className={`p-4 hover:bg-neutral-50 cursor-pointer transition-colors duration-200 ${
                  selectedChat?._id === chat._id ? 'bg-primary-50 border-r-2 border-primary-600' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {chat.type === 'group' ? (
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-600" />
                      </div>
                    ) : (
                      getChatAvatar(chat)
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-neutral-900 truncate">
                        {getChatName(chat)}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500">
                          {formatTime(chat.lastMessageAt)}
                        </span>
                        {getUnreadCount(chat) > 0 && (
                          <div className="w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                            {getUnreadCount(chat)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-600 truncate flex-1">
                        {getLastMessagePreview(chat)}
                      </p>
                      <div className="flex items-center gap-1 ml-2">
                        {chat.lastMessage && (
                          <>
                            {chat.lastMessage.sender._id === JSON.parse(localStorage.getItem('user'))?._id ? (
                              <CheckCheck className="w-4 h-4 text-primary-600" />
                            ) : (
                              <Check className="w-4 h-4 text-neutral-400" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;






