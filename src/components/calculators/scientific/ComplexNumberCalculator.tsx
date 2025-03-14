import React, { useState } from 'react';

interface ComplexNumber {
  real: number;
  imag: number;
}

interface CalculationResult {
  sum?: ComplexNumber;
  difference?: ComplexNumber;
  product?: ComplexNumber;
  quotient?: ComplexNumber;
  magnitude?: number;
  phase?: number;
}

const ComplexNumberCalculator: React.FC = () => {
  const [firstReal, setFirstReal] = useState<string>('');
  const [firstImag, setFirstImag] = useState<string>('');
  const [secondReal, setSecondReal] = useState<string>('');
  const [secondImag, setSecondImag] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseComplex = (real: string, imag: string): ComplexNumber | null => {
    const r = parseFloat(real);
    const i = parseFloat(imag);
    if (isNaN(r) || isNaN(i)) return null;
    return { real: r, imag: i };
  };

  const formatComplex = (num: ComplexNumber): string => {
    const sign = num.imag >= 0 ? '+' : '';
    return `${num.real.toFixed(4)}${sign}${num.imag.toFixed(4)}i`;
  };

  const calculate = () => {
    const first = parseComplex(firstReal, firstImag);
    const second = parseComplex(secondReal, secondImag);

    if (!first || !second) {
      setError('Please enter valid numbers');
      setResult(null);
      return;
    }

    try {
      // Addition: (a + bi) + (c + di) = (a + c) + (b + d)i
      const sum = {
        real: first.real + second.real,
        imag: first.imag + second.imag
      };

      // Subtraction: (a + bi) - (c + di) = (a - c) + (b - d)i
      const difference = {
        real: first.real - second.real,
        imag: first.imag - second.imag
      };

      // Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i
      const product = {
        real: first.real * second.real - first.imag * second.imag,
        imag: first.real * second.imag + first.imag * second.real
      };

      // Division: (a + bi)/(c + di) = ((ac + bd)/(c² + d²)) + ((bc - ad)/(c² + d²))i
      const denominator = second.real * second.real + second.imag * second.imag;
      if (denominator === 0) throw new Error('Division by zero');
      
      const quotient = {
        real: (first.real * second.real + first.imag * second.imag) / denominator,
        imag: (first.imag * second.real - first.real * second.imag) / denominator
      };

      // Magnitude: |a + bi| = √(a² + b²)
      const magnitude = Math.sqrt(first.real * first.real + first.imag * first.imag);

      // Phase: arg(a + bi) = atan2(b, a)
      const phase = Math.atan2(first.imag, first.real);

      setResult({ sum, difference, product, quotient, magnitude, phase });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      setter(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Complex Number Calculator
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Real Part
              </label>
              <input
                type="text"
                value={firstReal}
                onChange={(e) => handleInputChange(e.target.value, setFirstReal)}
                className="input w-full"
                placeholder="Enter real part"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Imaginary Part
              </label>
              <input
                type="text"
                value={firstImag}
                onChange={(e) => handleInputChange(e.target.value, setFirstImag)}
                className="input w-full"
                placeholder="Enter imaginary part"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Second Real Part
              </label>
              <input
                type="text"
                value={secondReal}
                onChange={(e) => handleInputChange(e.target.value, setSecondReal)}
                className="input w-full"
                placeholder="Enter real part"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Second Imaginary Part
              </label>
              <input
                type="text"
                value={secondImag}
                onChange={(e) => handleInputChange(e.target.value, setSecondImag)}
                className="input w-full"
                placeholder="Enter imaginary part"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
            disabled={!firstReal || !firstImag || !secondReal || !secondImag}
          >
            Calculate
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-900 dark:text-white">
                Sum: <span className="font-bold">{formatComplex(result.sum!)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Difference: <span className="font-bold">{formatComplex(result.difference!)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Product: <span className="font-bold">{formatComplex(result.product!)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Quotient: <span className="font-bold">{formatComplex(result.quotient!)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Magnitude: <span className="font-bold">{result.magnitude!.toFixed(4)}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                Phase (rad): <span className="font-bold">{result.phase!.toFixed(4)}</span>
              </p>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Complex Numbers
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Form: a + bi where i² = -1</li>
              <li>• Supports addition, subtraction, multiplication, division</li>
              <li>• Calculates magnitude (|z|) and phase (arg(z))</li>
              <li>• Results are rounded to 4 decimal places</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexNumberCalculator; 