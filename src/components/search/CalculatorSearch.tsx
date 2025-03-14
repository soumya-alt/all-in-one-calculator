import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { calculatorCategories } from '../../routes/calculatorRoutes';

interface SearchResult {
  name: string;
  description: string;
  path: string;
  category: string;
  icon: string;
}

const CalculatorSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allCalculators: SearchResult[] = useMemo(() => {
    return calculatorCategories.flatMap(category => 
      category.routes.map(route => ({
        name: route.name,
        description: route.description,
        path: `/all-in-one-calculator/${route.path}`,
        category: category.name,
        icon: route.icon
      }))
    );
  }, []);

  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim() && !selectedCategory) return [];
    
    let filtered = allCalculators;
    
    if (selectedCategory) {
      filtered = filtered.filter(calc => calc.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(calc => 
        calc.name.toLowerCase().includes(query) ||
        calc.description.toLowerCase().includes(query) ||
        calc.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, allCalculators]);

  return (
    <div className="h-full w-full max-w-5xl mx-auto flex flex-col gap-2">
      {/* Search Bar - Always Visible */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-md p-2 rounded-lg border border-gray-700/50">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-lg text-purple-400" aria-hidden="true">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculators by name or function..."
            className="input pl-10 pr-4 py-2 text-sm w-full"
            aria-label="Search calculators"
          />
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="absolute right-3 text-pink-400 hover:text-purple-400 transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Quick Categories */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg text-pink-400" aria-hidden="true">📚</span>
            <h2 className="text-sm font-bold text-pink-400">Quick Access</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {calculatorCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(
                    selectedCategory === category.name ? null : category.name
                  );
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                    : 'bg-gray-800/60 text-gray-300 border border-gray-700/50 hover:border-purple-500/50 hover:text-purple-400'
                }`}
                aria-pressed={selectedCategory === category.name}
              >
                <span className="text-base" role="img" aria-hidden="true">
                  {category.icon === 'CalculatorIcon' ? '🧮' :
                   category.icon === 'BeakerIcon' ? '🧪' :
                   category.icon === 'BanknotesIcon' ? '💰' :
                   category.icon === 'WrenchScrewdriverIcon' ? '🔧' :
                   category.icon === 'ComputerDesktopIcon' ? '💻' :
                   category.icon === 'ChartBarSquareIcon' ? '📊' :
                   category.icon === 'ArrowsRightLeftIcon' ? '🔄' :
                   category.icon === 'CalendarIcon' ? '📅' : '🔨'}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results or Popular Calculators */}
        <div className="space-y-2">
          {(searchQuery || selectedCategory) ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-purple-400" aria-hidden="true">✨</span>
                  <h2 className="text-sm font-bold text-purple-400">
                    {filteredCalculators.length > 0 
                      ? `Found ${filteredCalculators.length} calculator${filteredCalculators.length === 1 ? '' : 's'}`
                      : 'No matches found'}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCalculators.map((calc) => (
                  <Link
                    key={calc.path}
                    to={calc.path}
                    className="group flex items-start gap-3 p-3 rounded-lg bg-gray-800/60 border border-gray-700/50 hover:border-purple-500/50 hover:bg-gray-800/80 transition-all duration-300"
                  >
                    <span className="text-2xl filter drop-shadow-glow" role="img" aria-hidden="true">
                      {calc.icon === 'PlusIcon' ? '➕' :
                       calc.icon === 'PercentIcon' ? '💯' :
                       calc.icon === 'Square2StackIcon' ? '🔲' :
                       calc.icon === 'CubeIcon' ? '📦' :
                       calc.icon === 'ChartBarIcon' ? '📊' :
                       calc.icon === 'ArrowTrendingUpIcon' ? '📈' :
                       calc.icon === 'TableCellsIcon' ? '🔢' : '🧮'}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-purple-400 group-hover:text-pink-400 transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-xs text-pink-400 mb-1">
                        {calc.category}
                      </p>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {calc.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm mb-2">
                Start typing to search calculators or select a category above
              </p>
              <p className="text-xs text-gray-500">
                Browse through our collection of specialized calculators
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorSearch; 