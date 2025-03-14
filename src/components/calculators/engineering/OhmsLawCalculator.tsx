import React, { useState } from 'react';

type CalculationType = 'voltage' | 'current' | 'resistance';

interface OhmsLawResult {
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
}

const OhmsLawCalculator: React.FC = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [calculationType, setCalculationType] = useState<CalculationType>('voltage');
  const [result, setResult] = useState<OhmsLawResult | null>(null);

  const calculate = () => {
    let v = parseFloat(voltage);
    let i = parseFloat(current);
    let r = parseFloat(resistance);

    let calculatedResult: OhmsLawResult = {};

    switch (calculationType) {
      case 'voltage':
        if (isNaN(i) || isNaN(r)) {
          alert('Please enter valid values for current and resistance');
          return;
        }
        // V = I × R
        calculatedResult = {
          voltage: i * r,
          current: i,
          resistance: r,
          power: i * i * r,
        };
        break;

      case 'current':
        if (isNaN(v) || isNaN(r)) {
          alert('Please enter valid values for voltage and resistance');
          return;
        }
        if (r === 0) {
          alert('Resistance cannot be zero');
          return;
        }
        // I = V ÷ R
        calculatedResult = {
          voltage: v,
          current: v / r,
          resistance: r,
          power: (v * v) / r,
        };
        break;

      case 'resistance':
        if (isNaN(v) || isNaN(i)) {
          alert('Please enter valid values for voltage and current');
          return;
        }
        if (i === 0) {
          alert('Current cannot be zero');
          return;
        }
        // R = V ÷ I
        calculatedResult = {
          voltage: v,
          current: i,
          resistance: v / i,
          power: v * i,
        };
        break;
    }

    setResult(calculatedResult);
  };

  const clearInputs = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setResult(null);
  };

  const handleCalculationTypeChange = (type: CalculationType) => {
    setCalculationType(type);
    clearInputs();
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Ohm's Law Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calculate
            </label>
            <select
              value={calculationType}
              onChange={(e) => handleCalculationTypeChange(e.target.value as CalculationType)}
              className="select"
            >
              <option value="voltage">Voltage (V)</option>
              <option value="current">Current (I)</option>
              <option value="resistance">Resistance (R)</option>
            </select>
          </div>

          {calculationType !== 'voltage' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Voltage (V)
              </label>
              <input
                type="number"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="input"
                placeholder="Enter voltage in volts"
                step="0.1"
              />
            </div>
          )}

          {calculationType !== 'current' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current (I)
              </label>
              <input
                type="number"
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                className="input"
                placeholder="Enter current in amperes"
                step="0.1"
              />
            </div>
          )}

          {calculationType !== 'resistance' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Resistance (R)
              </label>
              <input
                type="number"
                value={resistance}
                onChange={(e) => setResistance(e.target.value)}
                className="input"
                placeholder="Enter resistance in ohms"
                step="0.1"
              />
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={calculate}
              className="btn btn-primary flex-1"
            >
              Calculate
            </button>
            <button
              onClick={clearInputs}
              className="btn btn-secondary flex-1"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Voltage: <span className="font-medium">{result.voltage?.toFixed(2)} V</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Current: <span className="font-medium">{result.current?.toFixed(2)} A</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Resistance: <span className="font-medium">{result.resistance?.toFixed(2)} Ω</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Power: <span className="font-medium">{result.power?.toFixed(2)} W</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Ohm's Law Formulas
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Voltage (V) = Current (I) × Resistance (R)</li>
              <li>• Current (I) = Voltage (V) ÷ Resistance (R)</li>
              <li>• Resistance (R) = Voltage (V) ÷ Current (I)</li>
              <li>• Power (P) = Voltage (V) × Current (I)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawCalculator; 