import React, { Suspense } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { calculatorCategories } from '../routes/calculatorRoutes';

const Router: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/basic/arithmetic" replace />} />
        
        {calculatorCategories.map(category =>
          category.routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))
        )}

        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                404 - Page Not Found
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                The calculator you're looking for doesn't exist.
              </p>
              <Link
                to="/basic/arithmetic"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Go to Basic Calculator
              </Link>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router; 