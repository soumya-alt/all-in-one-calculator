import React, { useState } from 'react';

const BasicCalculator: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      return;
    }

    switch (operation) {
      case 'add':
        setResult(num1 + num2);
        break;
      case 'subtract':
        setResult(num1 - num2);
        break;
      case 'multiply':
        setResult(num1 * num2);
        break;
      case 'divide':
        if (num2 !== 0) {
          setResult(num1 / num2);
        }
        break;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Basic Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              First Number
            </label>
            <input
              type="number"
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              className="input"
              placeholder="Enter first number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as any)}
              className="select"
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (-)</option>
              <option value="multiply">Multiply (×)</option>
              <option value="divide">Divide (÷)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Second Number
            </label>
            <input
              type="number"
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              className="input"
              placeholder="Enter second number"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Result: {result}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator; 