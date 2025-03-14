import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { calculatorCategories } from './routes/calculatorRoutes';
import CalculatorSearch from './components/search/CalculatorSearch';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-[50vh]">
    <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pattern-grid-dark overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-700/50 py-2">
          <div className="container mx-auto px-3">
            <Link 
              to="/all-in-one-calculator/"
              className="block group"
              aria-label="Return to Calculator Home"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl sm:text-3xl filter drop-shadow-glow">🧮</span>
                <h1 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-105 transition duration-300 drop-shadow-glow">
                  All-in-One Calculator
                </h1>
              </div>
              <p className="text-center text-gray-400 text-xs">
                Your comprehensive calculation companion
              </p>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-3 py-2 overflow-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/all-in-one-calculator/" element={<CalculatorSearch />} />
              {calculatorCategories.flatMap(category =>
                category.routes.map(route => (
                  <Route
                    key={route.path}
                    path={`/all-in-one-calculator/${route.path}`}
                    element={
                      <div className="h-full max-w-4xl mx-auto">
                        <nav className="mb-2" aria-label="Breadcrumb">
                          <Link 
                            to="/all-in-one-calculator/" 
                            className="inline-flex items-center text-purple-400 hover:text-pink-400 transition-colors gap-2 bg-gray-800/60 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-glow text-sm"
                          >
                            <span aria-hidden="true">←</span>
                            <span>Back to Search</span>
                          </Link>
                        </nav>
                        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-glow p-3 border border-gray-700/50">
                          <route.component />
                        </div>
                      </div>
                    }
                  />
                ))
              )}
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700/50 py-1.5">
          <div className="container mx-auto px-3">
            <p className="text-center text-gray-400 text-xs">
              Made with <span className="text-pink-400">❤️</span> for students and professionals alike
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App; 