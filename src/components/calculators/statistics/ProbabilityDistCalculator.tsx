import React, { useState } from 'react';

type DistributionType = 'normal' | 'poisson' | 'binomial';

interface DistributionResult {
  probability: number;
  mean: number;
  variance: number;
  standardDeviation?: number;
}

const ProbabilityDistCalculator: React.FC = () => {
  const [distributionType, setDistributionType] = useState<DistributionType>('normal');
  const [result, setResult] = useState<DistributionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Normal distribution parameters
  const [normalMean, setNormalMean] = useState<string>('');
  const [normalStdDev, setNormalStdDev] = useState<string>('');
  const [normalX, setNormalX] = useState<string>('');
  const [normalType, setNormalType] = useState<'lessThan' | 'greaterThan' | 'between'>('lessThan');
  const [normalX2, setNormalX2] = useState<string>(''); // For between case

  // Poisson distribution parameters
  const [poissonLambda, setPoissonLambda] = useState<string>('');
  const [poissonK, setPoissonK] = useState<string>('');
  const [poissonType, setPoissonType] = useState<'exactly' | 'atMost' | 'atLeast'>('exactly');

  // Binomial distribution parameters
  const [binomialN, setBinomialN] = useState<string>('');
  const [binomialP, setBinomialP] = useState<string>('');
  const [binomialK, setBinomialK] = useState<string>('');
  const [binomialType, setBinomialType] = useState<'exactly' | 'atMost' | 'atLeast'>('exactly');

  // Standard normal CDF (using approximation)
  const normalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - p : p;
  };

  // Factorial function
  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  // Combination function
  const combination = (n: number, k: number): number => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const calculateNormalDistribution = () => {
    const mean = parseFloat(normalMean);
    const stdDev = parseFloat(normalStdDev);
    const x = parseFloat(normalX);
    const x2 = parseFloat(normalX2);

    if (isNaN(mean)) throw new Error('Mean must be a valid number');
    if (isNaN(stdDev) || stdDev <= 0) throw new Error('Standard deviation must be a positive number');
    if (isNaN(x)) throw new Error('X value must be a valid number');
    if (normalType === 'between' && isNaN(x2)) throw new Error('Second X value must be a valid number');

    const z = (x - mean) / stdDev;
    let probability: number;

    switch (normalType) {
      case 'lessThan':
        probability = normalCDF(z);
        break;
      case 'greaterThan':
        probability = 1 - normalCDF(z);
        break;
      case 'between':
        const z2 = (x2 - mean) / stdDev;
        probability = normalCDF(Math.max(z, z2)) - normalCDF(Math.min(z, z2));
        break;
      default:
        throw new Error('Invalid calculation type');
    }

    return {
      probability,
      mean,
      variance: stdDev * stdDev,
      standardDeviation: stdDev
    };
  };

  const calculatePoissonDistribution = () => {
    const lambda = parseFloat(poissonLambda);
    const k = parseInt(poissonK);

    if (isNaN(lambda) || lambda <= 0) throw new Error('Lambda must be a positive number');
    if (isNaN(k) || k < 0) throw new Error('K must be a non-negative integer');

    const calculateExactProbability = (x: number): number => {
      return (Math.pow(lambda, x) * Math.exp(-lambda)) / factorial(x);
    };

    let probability: number;
    switch (poissonType) {
      case 'exactly':
        probability = calculateExactProbability(k);
        break;
      case 'atMost':
        probability = Array.from({ length: k + 1 }, (_, i) => calculateExactProbability(i))
          .reduce((sum, p) => sum + p, 0);
        break;
      case 'atLeast':
        probability = 1 - Array.from({ length: k }, (_, i) => calculateExactProbability(i))
          .reduce((sum, p) => sum + p, 0);
        break;
      default:
        throw new Error('Invalid calculation type');
    }

    return {
      probability,
      mean: lambda,
      variance: lambda
    };
  };

  const calculateBinomialDistribution = () => {
    const n = parseInt(binomialN);
    const p = parseFloat(binomialP);
    const k = parseInt(binomialK);

    if (isNaN(n) || n <= 0) throw new Error('N must be a positive integer');
    if (isNaN(p) || p < 0 || p > 1) throw new Error('P must be between 0 and 1');
    if (isNaN(k) || k < 0 || k > n) throw new Error('K must be between 0 and N');

    const calculateExactProbability = (x: number): number => {
      return combination(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
    };

    let probability: number;
    switch (binomialType) {
      case 'exactly':
        probability = calculateExactProbability(k);
        break;
      case 'atMost':
        probability = Array.from({ length: k + 1 }, (_, i) => calculateExactProbability(i))
          .reduce((sum, p) => sum + p, 0);
        break;
      case 'atLeast':
        probability = 1 - Array.from({ length: k }, (_, i) => calculateExactProbability(i))
          .reduce((sum, p) => sum + p, 0);
        break;
      default:
        throw new Error('Invalid calculation type');
    }

    return {
      probability,
      mean: n * p,
      variance: n * p * (1 - p)
    };
  };

  const calculate = () => {
    setError(null);
    try {
      switch (distributionType) {
        case 'normal':
          setResult(calculateNormalDistribution());
          break;
        case 'poisson':
          setResult(calculatePoissonDistribution());
          break;
        case 'binomial':
          setResult(calculateBinomialDistribution());
          break;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation');
      }
      setResult(null);
    }
  };

  const clearInputs = () => {
    setNormalMean('');
    setNormalStdDev('');
    setNormalX('');
    setNormalX2('');
    setPoissonLambda('');
    setPoissonK('');
    setBinomialN('');
    setBinomialP('');
    setBinomialK('');
    setResult(null);
    setError(null);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const formatProbability = (p: number): string => {
    return `${(p * 100).toFixed(4)}%`;
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Probability Distribution Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Distribution Type
            </label>
            <select
              value={distributionType}
              onChange={(e) => setDistributionType(e.target.value as DistributionType)}
              className="input w-full"
            >
              <option value="normal">Normal Distribution</option>
              <option value="poisson">Poisson Distribution</option>
              <option value="binomial">Binomial Distribution</option>
            </select>
          </div>

          {distributionType === 'normal' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mean (μ)
                </label>
                <input
                  type="number"
                  value={normalMean}
                  onChange={(e) => setNormalMean(e.target.value)}
                  className="input w-full"
                  placeholder="Enter mean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Standard Deviation (σ)
                </label>
                <input
                  type="number"
                  value={normalStdDev}
                  onChange={(e) => setNormalStdDev(e.target.value)}
                  className="input w-full"
                  placeholder="Enter standard deviation"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calculation Type
                </label>
                <select
                  value={normalType}
                  onChange={(e) => setNormalType(e.target.value as 'lessThan' | 'greaterThan' | 'between')}
                  className="input w-full"
                >
                  <option value="lessThan">P(X ≤ x)</option>
                  <option value="greaterThan">P(X ≥ x)</option>
                  <option value="between">P(x₁ ≤ X ≤ x₂)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {normalType === 'between' ? 'First X Value (x₁)' : 'X Value'}
                </label>
                <input
                  type="number"
                  value={normalX}
                  onChange={(e) => setNormalX(e.target.value)}
                  className="input w-full"
                  placeholder="Enter x value"
                />
              </div>
              {normalType === 'between' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Second X Value (x₂)
                  </label>
                  <input
                    type="number"
                    value={normalX2}
                    onChange={(e) => setNormalX2(e.target.value)}
                    className="input w-full"
                    placeholder="Enter second x value"
                  />
                </div>
              )}
            </div>
          )}

          {distributionType === 'poisson' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lambda (λ)
                </label>
                <input
                  type="number"
                  value={poissonLambda}
                  onChange={(e) => setPoissonLambda(e.target.value)}
                  className="input w-full"
                  placeholder="Enter lambda (mean rate)"
                  min="0"
                  step="any"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calculation Type
                </label>
                <select
                  value={poissonType}
                  onChange={(e) => setPoissonType(e.target.value as 'exactly' | 'atMost' | 'atLeast')}
                  className="input w-full"
                >
                  <option value="exactly">P(X = k)</option>
                  <option value="atMost">P(X ≤ k)</option>
                  <option value="atLeast">P(X ≥ k)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Events (k)
                </label>
                <input
                  type="number"
                  value={poissonK}
                  onChange={(e) => setPoissonK(e.target.value)}
                  className="input w-full"
                  placeholder="Enter number of events"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          )}

          {distributionType === 'binomial' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Trials (n)
                </label>
                <input
                  type="number"
                  value={binomialN}
                  onChange={(e) => setBinomialN(e.target.value)}
                  className="input w-full"
                  placeholder="Enter number of trials"
                  min="1"
                  step="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Probability of Success (p)
                </label>
                <input
                  type="number"
                  value={binomialP}
                  onChange={(e) => setBinomialP(e.target.value)}
                  className="input w-full"
                  placeholder="Enter probability (0-1)"
                  min="0"
                  max="1"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Calculation Type
                </label>
                <select
                  value={binomialType}
                  onChange={(e) => setBinomialType(e.target.value as 'exactly' | 'atMost' | 'atLeast')}
                  className="input w-full"
                >
                  <option value="exactly">P(X = k)</option>
                  <option value="atMost">P(X ≤ k)</option>
                  <option value="atLeast">P(X ≥ k)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Successes (k)
                </label>
                <input
                  type="number"
                  value={binomialK}
                  onChange={(e) => setBinomialK(e.target.value)}
                  className="input w-full"
                  placeholder="Enter number of successes"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Results
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Probability: <span className="font-medium">{formatProbability(result.probability)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Mean: <span className="font-medium">{formatNumber(result.mean)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Variance: <span className="font-medium">{formatNumber(result.variance)}</span>
              </p>
              {result.standardDeviation !== undefined && (
                <p className="text-gray-700 dark:text-gray-300">
                  Standard Deviation: <span className="font-medium">{formatNumber(result.standardDeviation)}</span>
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Probability Distributions
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {distributionType === 'normal' && (
                <>
                  <li>• Normal distribution is symmetric and bell-shaped</li>
                  <li>• Mean (μ) determines the center</li>
                  <li>• Standard deviation (σ) determines the spread</li>
                  <li>• About 68% of data falls within ±1σ of mean</li>
                  <li>• About 95% of data falls within ±2σ of mean</li>
                </>
              )}
              {distributionType === 'poisson' && (
                <>
                  <li>• Models rare events in a fixed interval</li>
                  <li>• Lambda (λ) is the average rate of events</li>
                  <li>• Mean and variance are both equal to λ</li>
                  <li>• Discrete distribution (whole numbers only)</li>
                  <li>• Events occur independently</li>
                </>
              )}
              {distributionType === 'binomial' && (
                <>
                  <li>• Models number of successes in n independent trials</li>
                  <li>• Each trial has same probability p of success</li>
                  <li>• Mean = np</li>
                  <li>• Variance = np(1-p)</li>
                  <li>• Trials are independent</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityDistCalculator; 