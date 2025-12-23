import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import ChatList from '../components/Chat/ChatList';
import Chat from '../components/Chat/Chat';
import { getUserChats } from '../services/chatApi';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChatList, setShowChatList] = useState(true);
  const [searchParams] = useSearchParams();

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setShowChatList(true);
    setSelectedChat(null);
  };

  // Handle chatId from URL query params
  useEffect(() => {
    const chatId = searchParams.get('chatId');
    if (chatId) {
      // Load the specific chat
      getUserChats().then(chats => {
        const chat = chats.find(c => c._id === chatId);
        if (chat) {
          setSelectedChat(chat);
          setShowChatList(false);
        }
      }).catch(error => {
        console.error('Error loading chat:', error);
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          {!showChatList && (
            <button
              onClick={handleBackToList}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-900">Messages</h1>
              <p className="text-sm text-neutral-500">
                {selectedChat ? 'Chat with your travel buddies' : 'Connect with fellow travelers'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-180px)] bg-white rounded-t-2xl shadow-soft overflow-hidden"
        >
          {/* Chat List - Desktop */}
          <div className="hidden lg:block border-r border-neutral-200">
            <ChatList 
              onSelectChat={handleSelectChat}
              selectedChat={selectedChat}
            />
          </div>

          {/* Chat List - Mobile */}
          {showChatList && (
            <div className="lg:hidden">
              <ChatList 
                onSelectChat={handleSelectChat}
                selectedChat={selectedChat}
              />
            </div>
          )}

          {/* Chat Area - Desktop */}
          {selectedChat && (
            <div className="hidden lg:block lg:col-span-2">
              <Chat 
                chat={selectedChat}
                onBack={handleBackToList}
              />
            </div>
          )}

          {/* Chat Area - Mobile */}
          {selectedChat && showChatList === false && (
            <div className="lg:hidden absolute inset-0 bg-white z-10">
              <Chat 
                chat={selectedChat}
                onBack={handleBackToList}
              />
            </div>
          )}

          {/* Empty State - Desktop */}
          {!selectedChat && (
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center bg-neutral-50">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                  Select a conversation
                </h3>
                <p className="text-neutral-500">
                  Choose a chat from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;




