import React, { useState } from 'react';

type UnitType = 'celsius' | 'fahrenheit' | 'kelvin';

const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState<UnitType>('celsius');
  const [toUnit, setToUnit] = useState<UnitType>('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  const convertToKelvin = (temp: number, unit: UnitType): number => {
    switch (unit) {
      case 'celsius':
        return temp + 273.15;
      case 'fahrenheit':
        return (temp - 32) * 5/9 + 273.15;
      case 'kelvin':
        return temp;
    }
  };

  const convertFromKelvin = (kelvin: number, unit: UnitType): number => {
    switch (unit) {
      case 'celsius':
        return kelvin - 273.15;
      case 'fahrenheit':
        return (kelvin - 273.15) * 9/5 + 32;
      case 'kelvin':
        return kelvin;
    }
  };

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    // Convert to Kelvin first, then to target unit
    const kelvin = convertToKelvin(numValue, fromUnit);
    const converted = convertFromKelvin(kelvin, toUnit);
    setResult(converted);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Temperature Converter
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
              placeholder="Enter temperature"
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
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
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
                <option value="celsius">Celsius (°C)</option>
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="kelvin">Kelvin (K)</option>
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
                {value}°{fromUnit.charAt(0).toUpperCase()} = {result.toFixed(2)}°{toUnit.charAt(0).toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter; 