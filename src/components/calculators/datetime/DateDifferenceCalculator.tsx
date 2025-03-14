import React, { useState } from 'react';

const DateDifferenceCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState<{
    days: number;
    months: number;
    years: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    setResult({ days, months, years });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Date Difference Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate Difference
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Time Difference:
              </p>
              <div className="text-base text-gray-700 dark:text-gray-300">
                {result.years > 0 && (
                  <p>{result.years} year{result.years !== 1 ? 's' : ''}</p>
                )}
                {result.months > 0 && (
                  <p>{result.months} month{result.months !== 1 ? 's' : ''}</p>
                )}
                {result.days > 0 && (
                  <p>{result.days} day{result.days !== 1 ? 's' : ''}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateDifferenceCalculator; 