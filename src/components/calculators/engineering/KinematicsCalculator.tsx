import React, { useState } from 'react';

type CalculationType = 'displacement' | 'velocity' | 'acceleration' | 'time';

interface KinematicsResult {
  initialVelocity: number;
  finalVelocity: number;
  acceleration: number;
  time: number;
  displacement: number;
}

const KinematicsCalculator: React.FC = () => {
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [time, setTime] = useState('');
  const [displacement, setDisplacement] = useState('');
  const [calculationType, setCalculationType] = useState<CalculationType>('displacement');
  const [result, setResult] = useState<KinematicsResult | null>(null);

  const calculate = () => {
    const u = parseFloat(initialVelocity); // initial velocity
    const v = parseFloat(finalVelocity);   // final velocity
    const a = parseFloat(acceleration);     // acceleration
    const t = parseFloat(time);            // time
    const s = parseFloat(displacement);     // displacement

    try {
      let calculatedResult: KinematicsResult;

      switch (calculationType) {
        case 'displacement':
          // s = ut + (1/2)at²
          if (isNaN(u) || isNaN(a) || isNaN(t)) {
            throw new Error('Please enter initial velocity, acceleration, and time');
          }
          calculatedResult = {
            initialVelocity: u,
            finalVelocity: u + a * t,
            acceleration: a,
            time: t,
            displacement: u * t + 0.5 * a * t * t,
          };
          break;

        case 'velocity':
          // v = u + at
          if (isNaN(u) || isNaN(a) || isNaN(t)) {
            throw new Error('Please enter initial velocity, acceleration, and time');
          }
          calculatedResult = {
            initialVelocity: u,
            finalVelocity: u + a * t,
            acceleration: a,
            time: t,
            displacement: u * t + 0.5 * a * t * t,
          };
          break;

        case 'acceleration':
          // v² = u² + 2as
          if (isNaN(u) || isNaN(v) || isNaN(s)) {
            throw new Error('Please enter initial velocity, final velocity, and displacement');
          }
          const calculatedAcceleration = (v * v - u * u) / (2 * s);
          const calculatedTime = (v - u) / calculatedAcceleration;
          calculatedResult = {
            initialVelocity: u,
            finalVelocity: v,
            acceleration: calculatedAcceleration,
            time: calculatedTime,
            displacement: s,
          };
          break;

        case 'time':
          // t = (v - u) / a
          if (isNaN(u) || isNaN(v) || isNaN(a)) {
            throw new Error('Please enter initial velocity, final velocity, and acceleration');
          }
          const calculatedTime2 = (v - u) / a;
          calculatedResult = {
            initialVelocity: u,
            finalVelocity: v,
            acceleration: a,
            time: calculatedTime2,
            displacement: u * calculatedTime2 + 0.5 * a * calculatedTime2 * calculatedTime2,
          };
          break;

        default:
          throw new Error('Invalid calculation type');
      }

      setResult(calculatedResult);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An error occurred during calculation');
      }
    }
  };

  const clearInputs = () => {
    setInitialVelocity('');
    setFinalVelocity('');
    setAcceleration('');
    setTime('');
    setDisplacement('');
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
          Kinematics Calculator
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
              <option value="displacement">Displacement</option>
              <option value="velocity">Velocity</option>
              <option value="acceleration">Acceleration</option>
              <option value="time">Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initial Velocity (m/s)
            </label>
            <input
              type="number"
              value={initialVelocity}
              onChange={(e) => setInitialVelocity(e.target.value)}
              className="input"
              placeholder="Enter initial velocity"
              step="0.1"
            />
          </div>

          {calculationType === 'acceleration' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Final Velocity (m/s)
              </label>
              <input
                type="number"
                value={finalVelocity}
                onChange={(e) => setFinalVelocity(e.target.value)}
                className="input"
                placeholder="Enter final velocity"
                step="0.1"
              />
            </div>
          )}

          {calculationType !== 'acceleration' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Acceleration (m/s²)
              </label>
              <input
                type="number"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                className="input"
                placeholder="Enter acceleration"
                step="0.1"
              />
            </div>
          )}

          {calculationType !== 'time' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Time (s)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input"
                placeholder="Enter time"
                step="0.1"
                min="0"
              />
            </div>
          )}

          {calculationType === 'acceleration' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Displacement (m)
              </label>
              <input
                type="number"
                value={displacement}
                onChange={(e) => setDisplacement(e.target.value)}
                className="input"
                placeholder="Enter displacement"
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
                Initial Velocity: <span className="font-medium">{result.initialVelocity.toFixed(2)} m/s</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Final Velocity: <span className="font-medium">{result.finalVelocity.toFixed(2)} m/s</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Acceleration: <span className="font-medium">{result.acceleration.toFixed(2)} m/s²</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Time: <span className="font-medium">{result.time.toFixed(2)} s</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Displacement: <span className="font-medium">{result.displacement.toFixed(2)} m</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Kinematics Equations
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• v = u + at</li>
              <li>• s = ut + ½at²</li>
              <li>• v² = u² + 2as</li>
              <li>• s = ½(u + v)t</li>
              <p className="mt-2 text-xs">
                Where: v = final velocity, u = initial velocity, a = acceleration,
                t = time, s = displacement
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KinematicsCalculator; 