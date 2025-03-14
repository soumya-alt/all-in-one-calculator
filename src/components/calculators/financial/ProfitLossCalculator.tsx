import React, { useState } from 'react';

const ProfitLossCalculator: React.FC = () => {
  const [costPrice, setCostPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [result, setResult] = useState<{
    profitOrLoss: number;
    percentage: number;
    finalPrice?: number;
    discountAmount?: number;
  } | null>(null);

  const calculate = () => {
    const cp = parseFloat(costPrice);
    const sp = parseFloat(sellingPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(cp) || isNaN(sp)) {
      alert('Please enter valid cost price and selling price');
      return;
    }

    let finalSP = sp;
    let discountAmount = 0;

    // Calculate discount if provided
    if (!isNaN(discount) && discount > 0) {
      discountAmount = (sp * discount) / 100;
      finalSP = sp - discountAmount;
    }

    // Calculate profit/loss
    const difference = finalSP - cp;
    const percentage = (Math.abs(difference) / cp) * 100;

    setResult({
      profitOrLoss: difference,
      percentage,
      finalPrice: finalSP,
      discountAmount: discountAmount > 0 ? discountAmount : undefined,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profit & Loss Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cost Price
            </label>
            <input
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="input"
              placeholder="Enter cost price"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Selling Price
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="input"
              placeholder="Enter selling price"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Discount Percentage (optional)
            </label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="input"
              placeholder="Enter discount percentage"
              min="0"
              max="100"
              step="0.01"
            />
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              {result.discountAmount && (
                <>
                  <p className="text-gray-700 dark:text-gray-300">
                    Discount Amount: <span className="font-medium">${result.discountAmount.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Final Price After Discount: <span className="font-medium">${result.finalPrice!.toFixed(2)}</span>
                  </p>
                </>
              )}
              
              <p className="text-gray-700 dark:text-gray-300">
                {result.profitOrLoss >= 0 ? 'Profit' : 'Loss'}: <span className="font-medium">${Math.abs(result.profitOrLoss).toFixed(2)}</span>
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                {result.profitOrLoss >= 0 ? 'Profit' : 'Loss'} Percentage: <span className="font-medium">{result.percentage.toFixed(2)}%</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfitLossCalculator; 