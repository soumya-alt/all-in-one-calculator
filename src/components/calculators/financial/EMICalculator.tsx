import React, { useState } from 'react';

interface AmortizationRow {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

const EMICalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
    amortizationSchedule: AmortizationRow[];
  } | null>(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const ratePerMonth = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (isNaN(principal) || isNaN(ratePerMonth) || isNaN(months)) {
      return;
    }

    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, months) / (Math.pow(1 + ratePerMonth, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    // Calculate amortization schedule
    let remainingBalance = principal;
    const schedule: AmortizationRow[] = [];

    for (let month = 1; month <= months; month++) {
      const interestPayment = remainingBalance * ratePerMonth;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: remainingBalance > 0 ? remainingBalance : 0,
      });
    }

    setResult({
      emi,
      totalPayment,
      totalInterest,
      amortizationSchedule: schedule,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          EMI Calculator
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Amount
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="input"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="input"
              placeholder="Enter annual interest rate"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Term (years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="input"
              placeholder="Enter loan term in years"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="btn btn-primary w-full"
          >
            Calculate EMI
          </button>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Summary
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Monthly EMI: <span className="font-medium">${result.emi.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Total Payment: <span className="font-medium">${result.totalPayment.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Total Interest: <span className="font-medium">${result.totalInterest.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Amortization Schedule
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                        <th className="py-2">Month</th>
                        <th className="py-2">EMI</th>
                        <th className="py-2">Principal</th>
                        <th className="py-2">Interest</th>
                        <th className="py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.amortizationSchedule.map((row) => (
                        <tr key={row.month} className="text-sm text-gray-600 dark:text-gray-400">
                          <td className="py-2">{row.month}</td>
                          <td className="py-2">${row.emi.toFixed(2)}</td>
                          <td className="py-2">${row.principal.toFixed(2)}</td>
                          <td className="py-2">${row.interest.toFixed(2)}</td>
                          <td className="py-2">${row.balance.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMICalculator; 