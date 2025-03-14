import React, { useState } from 'react';

const TaxCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [gstIncluded, setGstIncluded] = useState(false);
  const [result, setResult] = useState<{
    taxAmount: number;
    totalAmount: number;
    netAmount: number;
  } | null>(null);

  const calculate = () => {
    const baseAmount = parseFloat(amount);
    const rate = parseFloat(taxRate);

    if (isNaN(baseAmount) || isNaN(rate)) {
      alert('Please enter valid amount and tax rate');
      return;
    }

    if (rate < 0 || rate > 100) {
      alert('Tax rate must be between 0 and 100');
      return;
    }

    let taxAmount: number;
    let totalAmount: number;
    let netAmount: number;

    if (gstIncluded) {
      // If price includes GST, we need to calculate backwards
      netAmount = baseAmount / (1 + rate / 100);
      taxAmount = baseAmount - netAmount;
      totalAmount = baseAmount;
    } else {
      // If price excludes GST, calculate forward
      netAmount = baseAmount;
      taxAmount = (baseAmount * rate) / 100;
      totalAmount = baseAmount + taxAmount;
    }

    setResult({
      taxAmount,
      totalAmount,
      netAmount,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Tax & GST Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tax/GST Rate (%)
            </label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className="input"
              placeholder="Enter tax rate"
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="gstIncluded"
              checked={gstIncluded}
              onChange={(e) => setGstIncluded(e.target.checked)}
              className="checkbox"
            />
            <label
              htmlFor="gstIncluded"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Amount includes GST
            </label>
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Net Amount: <span className="font-medium">${result.netAmount.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Tax Amount: <span className="font-medium">${result.taxAmount.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Total Amount: <span className="font-medium">${result.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {gstIncluded
                  ? 'Calculations based on tax-inclusive amount'
                  : 'Calculations based on tax-exclusive amount'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator; 