import React, { useState } from 'react';

type CalculationType = 'heat' | 'pressure' | 'temperature' | 'work';

interface ThermodynamicsResult {
  initialTemp?: number;
  finalTemp?: number;
  pressure?: number;
  volume?: number;
  work?: number;
  heat?: number;
  entropy?: number;
}

const ThermodynamicsCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('heat');
  const [mass, setMass] = useState('');
  const [specificHeat, setSpecificHeat] = useState('');
  const [initialTemp, setInitialTemp] = useState('');
  const [finalTemp, setFinalTemp] = useState('');
  const [pressure, setPressure] = useState('');
  const [volume, setVolume] = useState('');
  const [heatEnergy, setHeatEnergy] = useState('');
  const [result, setResult] = useState<ThermodynamicsResult | null>(null);

  const calculate = () => {
    try {
      const m = parseFloat(mass);
      const c = parseFloat(specificHeat);
      const T1 = parseFloat(initialTemp);
      const T2 = parseFloat(finalTemp);
      const P = parseFloat(pressure);
      const V = parseFloat(volume);
      const Q = parseFloat(heatEnergy);

      let calculatedResult: ThermodynamicsResult = {};

      switch (calculationType) {
        case 'heat':
          // Q = mcΔT
          if (isNaN(m) || isNaN(c) || isNaN(T1) || isNaN(T2)) {
            throw new Error('Please enter mass, specific heat, and temperatures');
          }
          const deltaT = T2 - T1;
          const heat = m * c * deltaT;
          calculatedResult = {
            initialTemp: T1,
            finalTemp: T2,
            heat: heat,
            entropy: heat / T2, // ΔS = Q/T for reversible process
          };
          break;

        case 'pressure':
          // PV = nRT (ideal gas law)
          if (isNaN(V) || isNaN(T1)) {
            throw new Error('Please enter volume and temperature');
          }
          const R = 8.314; // Universal gas constant in J/(mol·K)
          const n = 1; // Assuming 1 mole for simplicity
          const pressure_calc = (n * R * T1) / V;
          calculatedResult = {
            pressure: pressure_calc,
            volume: V,
            initialTemp: T1,
          };
          break;

        case 'temperature':
          // T2 = T1 + Q/(mc)
          if (isNaN(m) || isNaN(c) || isNaN(T1) || isNaN(Q)) {
            throw new Error('Please enter mass, specific heat, initial temperature, and heat energy');
          }
          const finalTemperature = T1 + Q / (m * c);
          calculatedResult = {
            initialTemp: T1,
            finalTemp: finalTemperature,
            heat: Q,
          };
          break;

        case 'work':
          // W = PΔV (work done by/on gas)
          if (isNaN(P) || isNaN(V)) {
            throw new Error('Please enter pressure and volume');
          }
          const work = P * V; // Simplified work calculation
          calculatedResult = {
            pressure: P,
            volume: V,
            work: work,
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
    setMass('');
    setSpecificHeat('');
    setInitialTemp('');
    setFinalTemp('');
    setPressure('');
    setVolume('');
    setHeatEnergy('');
    setResult(null);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Thermodynamics Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Calculate
            </label>
            <select
              value={calculationType}
              onChange={(e) => {
                setCalculationType(e.target.value as CalculationType);
                clearInputs();
              }}
              className="select"
            >
              <option value="heat">Heat Energy</option>
              <option value="pressure">Pressure (Ideal Gas)</option>
              <option value="temperature">Final Temperature</option>
              <option value="work">Work Done</option>
            </select>
          </div>

          {(calculationType === 'heat' || calculationType === 'temperature') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mass (kg)
                </label>
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  className="input"
                  placeholder="Enter mass"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Specific Heat (J/kg·K)
                </label>
                <input
                  type="number"
                  value={specificHeat}
                  onChange={(e) => setSpecificHeat(e.target.value)}
                  className="input"
                  placeholder="Enter specific heat capacity"
                  step="0.1"
                  min="0"
                />
              </div>
            </>
          )}

          {(calculationType === 'heat' || calculationType === 'pressure' || calculationType === 'temperature') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Initial Temperature (K)
              </label>
              <input
                type="number"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="input"
                placeholder="Enter initial temperature"
                step="0.1"
                min="0"
              />
            </div>
          )}

          {calculationType === 'heat' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Final Temperature (K)
              </label>
              <input
                type="number"
                value={finalTemp}
                onChange={(e) => setFinalTemp(e.target.value)}
                className="input"
                placeholder="Enter final temperature"
                step="0.1"
                min="0"
              />
            </div>
          )}

          {calculationType === 'temperature' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heat Energy (J)
              </label>
              <input
                type="number"
                value={heatEnergy}
                onChange={(e) => setHeatEnergy(e.target.value)}
                className="input"
                placeholder="Enter heat energy"
                step="0.1"
                min="0"
              />
            </div>
          )}

          {(calculationType === 'pressure' || calculationType === 'work') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Volume (m³)
              </label>
              <input
                type="number"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="input"
                placeholder="Enter volume"
                step="0.1"
                min="0"
              />
            </div>
          )}

          {calculationType === 'work' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pressure (Pa)
              </label>
              <input
                type="number"
                value={pressure}
                onChange={(e) => setPressure(e.target.value)}
                className="input"
                placeholder="Enter pressure"
                step="0.1"
                min="0"
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
              {result.initialTemp !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Initial Temperature: <span className="font-medium">{result.initialTemp.toFixed(2)} K</span>
                </p>
              )}
              {result.finalTemp !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Final Temperature: <span className="font-medium">{result.finalTemp.toFixed(2)} K</span>
                </p>
              )}
              {result.pressure !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Pressure: <span className="font-medium">{result.pressure.toFixed(2)} Pa</span>
                </p>
              )}
              {result.volume !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Volume: <span className="font-medium">{result.volume.toFixed(2)} m³</span>
                </p>
              )}
              {result.work !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Work: <span className="font-medium">{result.work.toFixed(2)} J</span>
                </p>
              )}
              {result.heat !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Heat Energy: <span className="font-medium">{result.heat.toFixed(2)} J</span>
                </p>
              )}
              {result.entropy !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Entropy Change: <span className="font-medium">{result.entropy.toFixed(2)} J/K</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Thermodynamics Equations
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Heat Energy (Q) = mcΔT</li>
              <li>• Ideal Gas Law: PV = nRT</li>
              <li>• Work Done (W) = PΔV</li>
              <li>• Entropy Change (ΔS) = Q/T</li>
              <p className="mt-2 text-xs">
                Where: m = mass, c = specific heat capacity, ΔT = temperature change,
                P = pressure, V = volume, n = number of moles, R = gas constant
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermodynamicsCalculator; 