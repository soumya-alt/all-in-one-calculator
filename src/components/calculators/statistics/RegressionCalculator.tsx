import React, { useState } from 'react';

interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  equation: string;
  predictions: { x: number; y: number }[];
  correlationCoefficient: number;
}

interface DataPoint {
  x: number;
  y: number;
}

const RegressionCalculator: React.FC = () => {
  const [xValues, setXValues] = useState<string>('');
  const [yValues, setYValues] = useState<string>('');
  const [predictionX, setPredictionX] = useState<string>('');
  const [result, setResult] = useState<RegressionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseNumbers = (input: string): number[] => {
    return input
      .split(/[,\s]+/)
      .map(num => num.trim())
      .filter(num => num !== '')
      .map(num => {
        const parsed = parseFloat(num);
        if (isNaN(parsed)) {
          throw new Error(`Invalid number: ${num}`);
        }
        return parsed;
      });
  };

  const calculateMean = (nums: number[]): number => {
    return nums.reduce((sum, num) => sum + num, 0) / nums.length;
  };

  const calculateLinearRegression = (data: DataPoint[]): RegressionResult => {
    const xMean = calculateMean(data.map(point => point.x));
    const yMean = calculateMean(data.map(point => point.y));

    // Calculate slope (m) using least squares method
    let numerator = 0;
    let denominator = 0;
    data.forEach(point => {
      const xDiff = point.x - xMean;
      numerator += xDiff * (point.y - yMean);
      denominator += xDiff * xDiff;
    });

    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    // Calculate R-squared
    const yPredicted = data.map(point => slope * point.x + intercept);
    const ssRes = data.reduce((sum, point, i) => 
      sum + Math.pow(point.y - yPredicted[i], 2), 0);
    const ssTot = data.reduce((sum, point) => 
      sum + Math.pow(point.y - yMean, 2), 0);
    const rSquared = 1 - (ssRes / ssTot);

    // Calculate correlation coefficient (r)
    const correlationCoefficient = Math.sqrt(rSquared) * 
      (numerator >= 0 ? 1 : -1);

    // Generate predictions
    const xMin = Math.min(...data.map(point => point.x));
    const xMax = Math.max(...data.map(point => point.x));
    const predictions = [
      { x: xMin, y: slope * xMin + intercept },
      { x: xMax, y: slope * xMax + intercept }
    ];

    // Format equation string
    const equation = `y = ${slope.toFixed(4)}x ${intercept >= 0 ? '+' : ''} ${intercept.toFixed(4)}`;

    return {
      slope,
      intercept,
      rSquared,
      equation,
      predictions,
      correlationCoefficient
    };
  };

  const calculate = () => {
    setError(null);
    try {
      const xArray = parseNumbers(xValues);
      const yArray = parseNumbers(yValues);

      if (xArray.length !== yArray.length) {
        throw new Error('X and Y values must have the same number of points');
      }
      if (xArray.length < 2) {
        throw new Error('Please enter at least two data points');
      }

      const data: DataPoint[] = xArray.map((x, i) => ({ x, y: yArray[i] }));
      const regressionResult = calculateLinearRegression(data);
      setResult(regressionResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation');
      }
      setResult(null);
    }
  };

  const predictY = (x: number): number | null => {
    if (!result) return null;
    return result.slope * x + result.intercept;
  };

  const clearInputs = () => {
    setXValues('');
    setYValues('');
    setPredictionX('');
    setResult(null);
    setError(null);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Regression Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              X Values
            </label>
            <textarea
              value={xValues}
              onChange={(e) => setXValues(e.target.value)}
              className="input min-h-[80px]"
              placeholder="Enter X values separated by commas or spaces (e.g., 1, 2, 3, 4, 5)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Y Values
            </label>
            <textarea
              value={yValues}
              onChange={(e) => setYValues(e.target.value)}
              className="input min-h-[80px]"
              placeholder="Enter Y values separated by commas or spaces (e.g., 2, 4, 6, 8, 10)"
            />
          </div>

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
            <>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Regression Results
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Equation: <span className="font-medium">{result.equation}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Slope (m): <span className="font-medium">{formatNumber(result.slope)}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Y-intercept (b): <span className="font-medium">{formatNumber(result.intercept)}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  R² (coefficient of determination): <span className="font-medium">{formatNumber(result.rSquared)}</span>
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  r (correlation coefficient): <span className="font-medium">{formatNumber(result.correlationCoefficient)}</span>
                </p>
              </div>

              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Predict Y Value
                </h3>
                <div className="flex space-x-4">
                  <input
                    type="number"
                    value={predictionX}
                    onChange={(e) => setPredictionX(e.target.value)}
                    className="input flex-1"
                    placeholder="Enter X value"
                  />
                </div>
                {predictionX && !isNaN(parseFloat(predictionX)) && (
                  <p className="text-gray-700 dark:text-gray-300">
                    Predicted Y: <span className="font-medium">
                      {formatNumber(predictY(parseFloat(predictionX)) || 0)}
                    </span>
                  </p>
                )}
              </div>
            </>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Linear Regression
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Equation form: y = mx + b (where m is slope and b is y-intercept)</li>
              <li>• R² ranges from 0 to 1 (higher is better fit)</li>
              <li>• r ranges from -1 to 1 (indicates direction and strength)</li>
              <li>• Perfect positive correlation: r = 1</li>
              <li>• Perfect negative correlation: r = -1</li>
              <li>• No correlation: r = 0</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegressionCalculator; 