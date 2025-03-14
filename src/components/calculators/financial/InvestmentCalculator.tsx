import React, { useState } from 'react';

interface InvestmentResult {
  futureValue: number;
  totalInvestment: number;
  totalReturn: number;
  returnPercentage: number;
}

const InvestmentCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    const p = parseFloat(principal);
    const m = parseFloat(monthlyInvestment);
    const r = parseFloat(annualReturn) / 100 / 12; // Monthly rate
    const t = parseFloat(years) * 12; // Total months

    if (isNaN(p) || isNaN(m) || isNaN(r) || isNaN(t)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (r < -1) {
      alert('Return rate cannot be less than -100%');
      return;
    }

    // Calculate future value of initial principal
    const principalFV = p * Math.pow(1 + r, t);

    // Calculate future value of monthly investments
    // FV = PMT × (((1 + r)^t - 1) / r)
    const monthlyFV = m * ((Math.pow(1 + r, t) - 1) / r);

    const totalFV = principalFV + monthlyFV;
    const totalInvestment = p + (m * t);
    const totalReturn = totalFV - totalInvestment;
    const returnPercentage = (totalReturn / totalInvestment) * 100;

    setResult({
      futureValue: totalFV,
      totalInvestment,
      totalReturn,
      returnPercentage,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Investment Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Initial Investment
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="input"
              placeholder="Enter initial investment amount"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Investment
            </label>
            <input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="input"
              placeholder="Enter monthly investment amount"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="input"
              placeholder="Enter expected annual return rate"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="input"
              placeholder="Enter investment period in years"
              min="0"
              step="0.5"
            />
          </div>

          <button
            onClick={calculateInvestment}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
              <p className="text-gray-700 dark:text-gray-300">
                Future Value: <span className="font-medium">${result.futureValue.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Total Investment: <span className="font-medium">${result.totalInvestment.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Total Return: <span className="font-medium">${result.totalReturn.toFixed(2)}</span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Return Percentage: <span className="font-medium">{result.returnPercentage.toFixed(2)}%</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Note: Calculations assume returns are compounded monthly and contributions are made at the beginning of each month.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator; 