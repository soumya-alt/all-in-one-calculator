import React, { useState } from 'react';
import CalculatorLayout from '../../layout/CalculatorLayout';
import { InputField, ResultDisplay, ResultsContainer, ErrorMessage } from '../../common/FormElements';

interface WorkdaysResult {
  workdays: number;
  totalDays: number;
  weekends: number;
  holidays: number;
}

const WorkdaysCalculator: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [holidays, setHolidays] = useState('');
  const [result, setResult] = useState<WorkdaysResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateWorkdays = () => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const holidayCount = parseInt(holidays) || 0;

      if (start > end) {
        setError('Start date must be before end date');
        return;
      }

      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      let weekends = 0;
      let current = new Date(start);

      while (current <= end) {
        if (current.getDay() === 0 || current.getDay() === 6) {
          weekends++;
        }
        current.setDate(current.getDate() + 1);
      }

      const workdays = totalDays - weekends - holidayCount;

      setResult({
        workdays,
        totalDays,
        weekends,
        holidays: holidayCount
      });
      setError(null);
    } catch (err) {
      setError('Please enter valid dates');
    }
  };

  return (
    <CalculatorLayout
      title="Workdays Calculator"
      helpContent="Calculate the number of working days between two dates, excluding weekends and holidays."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateWorkdays();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="start-date"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={setStartDate}
            required
          />
          <InputField
            id="end-date"
            label="End Date"
            type="date"
            value={endDate}
            onChange={setEndDate}
            required
          />
        </div>
        <InputField
          id="holidays"
          label="Additional Holidays"
          type="number"
          value={holidays}
          onChange={setHolidays}
          description="Enter the number of holidays (excluding weekends)"
          inputMode="numeric"
          placeholder="0"
        />
        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto px-8 py-3"
          disabled={!startDate || !endDate}
        >
          Calculate Workdays
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      {result && (
        <ResultsContainer title="Results">
          <div className="space-y-3">
            <ResultDisplay label="Working Days" value={result.workdays} unit="days" />
            <ResultDisplay label="Total Days" value={result.totalDays} unit="days" />
            <ResultDisplay label="Weekends" value={result.weekends} unit="days" />
            <ResultDisplay label="Holidays" value={result.holidays} unit="days" />
          </div>
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
};

export default WorkdaysCalculator; 