import React, { useState } from 'react';

const units = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.34,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254,
};

type UnitType = keyof typeof units;

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState<UnitType>('meters');
  const [toUnit, setToUnit] = useState<UnitType>('feet');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Convert to meters first, then to target unit
    const meters = numValue * units[fromUnit];
    const converted = meters / units[toUnit];
    setResult(converted);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Length Converter
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input"
              placeholder="Enter value"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as UnitType)}
                className="select"
              >
                {Object.keys(units).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as UnitType)}
                className="select"
              >
                {Object.keys(units).map((unit) => (
                  <option key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="btn btn-primary w-full"
          >
            Convert
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {value} {fromUnit} = {result.toFixed(6)} {toUnit}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LengthConverter; 