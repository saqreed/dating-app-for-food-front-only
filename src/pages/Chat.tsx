import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  image?: string;
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  messages: Message[];
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "Анна",
    avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    lastMessage: "Привет! Как насчет итальянской кухни?",
    unread: 2,
    messages: [
      {
        id: 1,
        text: "Привет! Как насчет итальянской кухни?",
        sender: "other",
        timestamp: "14:30"
      },
      {
        id: 2,
        text: "Звучит отлично! Я как раз готовлю пасту карбонара",
        sender: "me",
        timestamp: "14:32"
      },
      {
        id: 3,
        text: "Вот мой рецепт!",
        sender: "other",
        timestamp: "14:33",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
      }
    ]
  },
  {
    id: 2,
    name: "Михаил",
    avatar: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
    lastMessage: "Я приготовил новый рецепт рамена!",
    unread: 0,
    messages: [
      {
        id: 1,
        text: "Привет! Я приготовил новый рецепт рамена!",
        sender: "other",
        timestamp: "15:30"
      },
      {
        id: 2,
        text: "О, это интересно! Поделишься рецептом?",
        sender: "me",
        timestamp: "15:32"
      },
      {
        id: 3,
        text: "Конечно! Вот фото готового блюда",
        sender: "other",
        timestamp: "15:33",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8"
      }
    ]
  }
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newMsg: Message = {
        id: Date.now(),
        text: newMessage,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat 
            ? {
                ...chat,
                messages: [...chat.messages, newMsg],
                lastMessage: newMessage
              }
            : chat
        )
      );

      setNewMessage("");
    }
  };

  const currentChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Список чатов */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-80 border-r border-gray-200 bg-white"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Чаты</h2>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-4rem)]">
            {chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                  selectedChat === chat.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {chat.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {chat.messages[chat.messages.length - 1]?.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Окно чата */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 flex flex-col bg-white"
        >
          {currentChat ? (
            <>
              {/* Заголовок чата */}
              <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                <img
                  src={currentChat.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentChat.name}
                </h3>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence mode="wait">
                  {currentChat.messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.sender === 'me'
                            ? 'bg-primary-400 text-white'
                            : 'bg-gray-100 text-gray-900'
                        } rounded-2xl px-4 py-2`}
                      >
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Shared food"
                            className="w-full h-48 object-cover rounded-lg mb-2"
                          />
                        )}
                        <p>{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${
                            message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Ввод сообщения */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Введите сообщение..."
                    className="input flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="btn btn-primary"
                  >
                    Отправить
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">Выберите чат, чтобы начать общение</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 