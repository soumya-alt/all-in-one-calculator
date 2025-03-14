import React from 'react';

interface CalculatorLayoutProps {
  title: string;
  children: React.ReactNode;
  helpContent?: React.ReactNode;
}

const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({ title, children, helpContent }) => {
  return (
    <main 
      className="min-h-screen bg-gray-50 dark:bg-gray-900" 
      role="main"
      aria-labelledby="calculator-title"
    >
      <div className="container mx-auto min-h-screen flex flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h1 
                id="calculator-title"
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
              >
                {title}
              </h1>

              <div className="space-y-6">
                {children}
              </div>

              {helpContent && (
                <div 
                  className="mt-8 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
                  role="complementary"
                  aria-label="Help Information"
                >
                  {helpContent}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalculatorLayout; 