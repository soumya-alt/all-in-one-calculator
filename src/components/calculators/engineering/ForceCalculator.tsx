import React, { useState } from 'react';

type CalculationType = 'force' | 'work' | 'power';

interface ForceResult {
  force?: number;
  distance?: number;
  time?: number;
  work?: number;
  power?: number;
}

const ForceCalculator: React.FC = () => {
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [calculationType, setCalculationType] = useState<CalculationType>('force');
  const [result, setResult] = useState<ForceResult | null>(null);

  const calculate = () => {
    const f = parseFloat(force);
    const d = parseFloat(distance);
    const t = parseFloat(time);

    let calculatedResult: ForceResult = {};

    switch (calculationType) {
      case 'force':
        if (isNaN(d) || isNaN(t)) {
          alert('Please enter valid values for distance and time');
          return;
        }
        if (t <= 0) {
          alert('Time must be greater than zero');
          return;
        }
        // Work = Force × Distance
        // Power = Work ÷ Time
        const work = f * d;
        calculatedResult = {
          force: f,
          distance: d,
          time: t,
          work: work,
          power: work / t,
        };
        break;

      case 'work':
        if (isNaN(f) || isNaN(d)) {
          alert('Please enter valid values for force and distance');
          return;
        }
        calculatedResult = {
          force: f,
          distance: d,
          time: t,
          work: f * d,
          power: isNaN(t) ? undefined : (f * d) / t,
        };
        break;

      case 'power':
        if (isNaN(f) || isNaN(d) || isNaN(t)) {
          alert('Please enter valid values for force, distance, and time');
          return;
        }
        if (t <= 0) {
          alert('Time must be greater than zero');
          return;
        }
        const workDone = f * d;
        calculatedResult = {
          force: f,
          distance: d,
          time: t,
          work: workDone,
          power: workDone / t,
        };
        break;
    }

    setResult(calculatedResult);
  };

  const clearInputs = () => {
    setForce('');
    setDistance('');
    setTime('');
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
          Force & Power Calculator
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
              <option value="force">Force</option>
              <option value="work">Work</option>
              <option value="power">Power</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Force (N)
            </label>
            <input
              type="number"
              value={force}
              onChange={(e) => setForce(e.target.value)}
              className="input"
              placeholder="Enter force in newtons"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Distance (m)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="input"
              placeholder="Enter distance in meters"
              step="0.1"
            />
          </div>

          {calculationType === 'power' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time (s)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input"
                placeholder="Enter time in seconds"
                step="0.1"
                min="0.1"
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
                Force: <span className="font-medium">{result.force?.toFixed(2)} N</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Distance: <span className="font-medium">{result.distance?.toFixed(2)} m</span>
              </p>
              {result.time && (
                <p className="text-gray-700 dark:text-gray-300">
                  Time: <span className="font-medium">{result.time?.toFixed(2)} s</span>
                </p>
              )}
              <p className="text-gray-700 dark:text-gray-300">
                Work: <span className="font-medium">{result.work?.toFixed(2)} J</span>
              </p>
              {result.power && (
                <p className="text-gray-700 dark:text-gray-300">
                  Power: <span className="font-medium">{result.power?.toFixed(2)} W</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Formulas
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Work (J) = Force (N) × Distance (m)</li>
              <li>• Power (W) = Work (J) ÷ Time (s)</li>
              <li>• Power (W) = Force (N) × Velocity (m/s)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForceCalculator; 