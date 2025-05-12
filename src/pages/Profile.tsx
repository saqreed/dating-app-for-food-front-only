import { useState } from 'react';
import { motion } from 'framer-motion';

interface Cuisine {
  id: number;
  name: string;
}

const availableCuisines: Cuisine[] = [
  { id: 1, name: "Итальянская" },
  { id: 2, name: "Японская" },
  { id: 3, name: "Мексиканская" },
  { id: 4, name: "Французская" },
  { id: 5, name: "Тайская" },
  { id: 6, name: "Индийская" },
  { id: 7, name: "Корейская" },
  { id: 8, name: "Китайская" },
  { id: 9, name: "Русская" },
  { id: 10, name: "Грузинская" }
];

export default function Profile() {
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleCuisineToggle = (cuisineId: number) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisineId)
        ? prev.filter(id => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const handlePhotoDelete = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Мой профиль</h1>

          {/* Фотографии */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Мои блюда</h2>
            <div className="grid grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Фото ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handlePhotoDelete(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </label>
            </div>
          </div>

          {/* Кухни */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Любимые кухни</h2>
            <div className="flex flex-wrap gap-2">
              {availableCuisines.map(cuisine => (
                <button
                  key={cuisine.id}
                  onClick={() => handleCuisineToggle(cuisine.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCuisines.includes(cuisine.id)
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine.name}
                </button>
              ))}
            </div>
          </div>

          {/* Описание */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">О себе</h2>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите о своих кулинарных предпочтениях..."
              className="input h-32 resize-none"
            />
          </div>

          <button className="btn btn-primary w-full">
            Сохранить изменения
          </button>
        </motion.div>
      </div>
    </div>
  );
} 