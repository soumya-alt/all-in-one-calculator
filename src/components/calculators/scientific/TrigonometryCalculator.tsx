import React, { useState } from 'react';

const TrigonometryCalculator: React.FC = () => {
  const [angle, setAngle] = useState('');
  const [unit, setUnit] = useState<'degrees' | 'radians'>('degrees');
  const [results, setResults] = useState<{ sin: number; cos: number; tan: number } | null>(null);

  const calculateTrig = () => {
    const numAngle = parseFloat(angle);
    if (isNaN(numAngle)) return;

    const angleInRadians = unit === 'degrees' ? (numAngle * Math.PI) / 180 : numAngle;

    setResults({
      sin: Math.sin(angleInRadians),
      cos: Math.cos(angleInRadians),
      tan: Math.tan(angleInRadians),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Trigonometry Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Angle
            </label>
            <input
              type="number"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="input"
              placeholder="Enter angle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as 'degrees' | 'radians')}
              className="select"
            >
              <option value="degrees">Degrees</option>
              <option value="radians">Radians</option>
            </select>
          </div>

          <button
            onClick={calculateTrig}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {results && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                sin({angle}{unit === 'degrees' ? '°' : ' rad'}) = {results.sin.toFixed(6)}
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                cos({angle}{unit === 'degrees' ? '°' : ' rad'}) = {results.cos.toFixed(6)}
              </p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                tan({angle}{unit === 'degrees' ? '°' : ' rad'}) = {results.tan.toFixed(6)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrigonometryCalculator; 