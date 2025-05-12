import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: number;
  name: string;
  age: number;
  photos: string[];
  cuisines: string[];
  description: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Анна",
    age: 28,
    photos: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543"
    ],
    cuisines: ["Итальянская", "Японская", "Мексиканская"],
    description: "Люблю готовить рамен и экспериментировать с соусами"
  },
  {
    id: 2,
    name: "Михаил",
    age: 32,
    photos: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929"
    ],
    cuisines: ["Французская", "Тайская", "Индийская"],
    description: "Шеф-повар с 10-летним стажем, ищу единомышленников"
  }
];

export default function Feed() {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  const currentUser = mockUsers[currentUserIndex];

  const handleSwipe = (direction: number) => {
    setDirection(direction);
    
    if (direction === 1) {
      // Сохраняем текущего пользователя перед сменой
      setMatchedUser(currentUser);
    }

    setTimeout(() => {
      setCurrentUserIndex((prev) => (prev + 1) % mockUsers.length);
      setDirection(0);
      
      if (direction === 1) {
        setShowMatch(true);
        setTimeout(() => {
          setShowMatch(false);
          setMatchedUser(null);
        }, 2000);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentUser.id}
              initial={{ 
                x: direction === 1 ? 500 : direction === -1 ? -500 : 0,
                opacity: 0,
                rotate: direction === 1 ? 30 : direction === -1 ? -30 : 0
              }}
              animate={{ 
                x: 0,
                opacity: 1,
                rotate: 0
              }}
              exit={{ 
                x: direction === 1 ? -500 : direction === -1 ? 500 : 0,
                opacity: 0,
                rotate: direction === 1 ? -30 : direction === -1 ? 30 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <div className="card h-full overflow-hidden">
                <div className="relative h-[400px]">
                  <img
                    src={currentUser.photos[0]}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h2 className="text-2xl font-bold text-white">
                      {currentUser.name}, {currentUser.age}
                    </h2>
                    <div className="flex gap-2 mt-2">
                      {currentUser.cuisines.map((cuisine) => (
                        <span
                          key={cuisine}
                          className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
                        >
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{currentUser.description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleSwipe(-1)}
            className="btn btn-secondary w-16 h-16 rounded-full flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={() => handleSwipe(1)}
            className="btn btn-primary w-16 h-16 rounded-full flex items-center justify-center"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {showMatch && matchedUser && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center bg-black/50"
            >
              <div className="card max-w-sm mx-auto text-center">
                <h3 className="text-2xl font-bold text-primary-400 mb-2">Это взаимно!</h3>
                <p className="text-gray-600">У вас есть совпадение с {matchedUser.name}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 