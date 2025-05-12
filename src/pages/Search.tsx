import { useState } from 'react';
import { motion } from 'framer-motion';

interface Filter {
  cuisines: string[];
  regions: string[];
  commonDishes: boolean;
}

const regions = [
  "Европа",
  "Азия",
  "Северная Америка",
  "Южная Америка",
  "Африка",
  "Океания"
];

const cuisines = [
  "Итальянская",
  "Японская",
  "Мексиканская",
  "Французская",
  "Тайская",
  "Индийская",
  "Корейская",
  "Китайская",
  "Русская",
  "Грузинская"
];

export default function Search() {
  const [filters, setFilters] = useState<Filter>({
    cuisines: [],
    regions: [],
    commonDishes: false
  });

  const handleCuisineToggle = (cuisine: string) => {
    setFilters(prev => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter(c => c !== cuisine)
        : [...prev.cuisines, cuisine]
    }));
  };

  const handleRegionToggle = (region: string) => {
    setFilters(prev => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter(r => r !== region)
        : [...prev.regions, region]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Фильтры */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Фильтры</h2>

              {/* Кухни */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Кухни</h3>
                <div className="space-y-2">
                  {cuisines.map(cuisine => (
                    <label key={cuisine} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.cuisines.includes(cuisine)}
                        onChange={() => handleCuisineToggle(cuisine)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-gray-700">{cuisine}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Регионы */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Регионы</h3>
                <div className="space-y-2">
                  {regions.map(region => (
                    <label key={region} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={filters.regions.includes(region)}
                        onChange={() => handleRegionToggle(region)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-gray-700">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Общие блюда */}
              <div className="mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={filters.commonDishes}
                    onChange={e => setFilters(prev => ({ ...prev, commonDishes: e.target.checked }))}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-gray-700">Только с общими блюдами</span>
                </label>
              </div>

              <button className="btn btn-primary w-full">
                Применить фильтры
              </button>
            </div>
          </motion.div>

          {/* Результаты поиска */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Здесь будут карточки пользователей */}
              <div className="card">
                <div className="relative h-48 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
                    alt="Блюдо"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Анна, 28</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Итальянская
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Японская
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Люблю готовить рамен и экспериментировать с соусами
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 