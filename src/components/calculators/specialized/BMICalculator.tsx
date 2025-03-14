import React, { useState } from 'react';
import CalculatorLayout from '../../layout/CalculatorLayout';
import { InputField, ResultDisplay, ResultsContainer, ErrorMessage } from '../../common/FormElements';

interface BMIResult {
  bmi: number;
  category: string;
  idealWeightRange: {
    min: number;
    max: number;
  };
}

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    if (bmi < 35) return 'Obesity Class I';
    if (bmi < 40) return 'Obesity Class II';
    return 'Obesity Class III';
  };

  const calculateIdealWeightRange = (heightInMeters: number): { min: number; max: number } => {
    const minBMI = 18.5;
    const maxBMI = 24.9;
    return {
      min: Math.round(minBMI * heightInMeters * heightInMeters),
      max: Math.round(maxBMI * heightInMeters * heightInMeters)
    };
  };

  const calculate = () => {
    try {
      let heightInMeters: number;
      let weightInKg: number;

      if (unit === 'metric') {
        heightInMeters = parseFloat(height) / 100; // cm to m
        weightInKg = parseFloat(weight);
      } else {
        // Convert feet and inches (format: 5'11") to meters
        const heightParts = height.split("'");
        const feet = parseFloat(heightParts[0]);
        const inches = parseFloat(heightParts[1].replace('"', ''));
        heightInMeters = (feet * 12 + inches) * 0.0254;
        
        // Convert pounds to kg
        weightInKg = parseFloat(weight) * 0.453592;
      }

      if (isNaN(heightInMeters) || isNaN(weightInKg)) {
        setError('Please enter valid numbers');
        setResult(null);
        return;
      }

      if (heightInMeters <= 0 || weightInKg <= 0) {
        setError('Height and weight must be greater than 0');
        setResult(null);
        return;
      }

      const bmi = weightInKg / (heightInMeters * heightInMeters);
      const category = getBMICategory(bmi);
      const idealWeightRange = calculateIdealWeightRange(heightInMeters);

      setResult({
        bmi,
        category,
        idealWeightRange: unit === 'metric' ? idealWeightRange : {
          min: Math.round(idealWeightRange.min / 0.453592),
          max: Math.round(idealWeightRange.max / 0.453592)
        }
      });
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

  const handleHeightChange = (value: string) => {
    if (unit === 'metric') {
      handleInputChange(value, setHeight);
    } else {
      // Allow format like 5'11"
      if (value === '' || /^\d*'?\d*"?$/.test(value)) {
        setHeight(value);
        setError(null);
      }
    }
  };

  const helpContent = (
    <>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        BMI Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
          <li>Underweight: BMI less than 18.5</li>
          <li>Normal weight: BMI 18.5-24.9</li>
          <li>Overweight: BMI 25-29.9</li>
        </ul>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
          <li>Obesity Class I: BMI 30-34.9</li>
          <li>Obesity Class II: BMI 35-39.9</li>
          <li>Obesity Class III: BMI 40 or greater</li>
        </ul>
      </div>
    </>
  );

  return (
    <CalculatorLayout 
      title="BMI Calculator"
      helpContent={helpContent}
    >
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
        className="space-y-6"
        noValidate
      >
        <div role="group" aria-labelledby="unit-selection-label">
          <span id="unit-selection-label" className="sr-only">
            Select Unit System
          </span>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUnit('metric')}
              className={`btn flex-1 ${unit === 'metric' ? 'btn-primary' : 'btn-secondary'}`}
              aria-pressed={unit === 'metric'}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => setUnit('imperial')}
              className={`btn flex-1 ${unit === 'imperial' ? 'btn-primary' : 'btn-secondary'}`}
              aria-pressed={unit === 'imperial'}
            >
              Imperial
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="height"
            label={`Height ${unit === 'metric' ? '(cm)' : "(feet'inches\")"}`}
            value={height}
            onChange={handleHeightChange}
            inputMode={unit === 'metric' ? 'decimal' : 'text'}
            placeholder={unit === 'metric' ? 'Enter height' : "e.g., 5'11\""}
            unit={unit === 'metric' ? 'cm' : 'ft/in'}
            description={unit === 'metric' 
              ? 'Enter height in centimeters' 
              : "Enter height in feet and inches (e.g., 5'11\")"}
            required
          />

          <InputField
            id="weight"
            label={`Weight ${unit === 'metric' ? '(kg)' : '(lbs)'}`}
            value={weight}
            onChange={(value) => handleInputChange(value, setWeight)}
            inputMode="decimal"
            placeholder="Enter weight"
            unit={unit === 'metric' ? 'kg' : 'lbs'}
            description={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto px-8 py-3 text-base font-medium"
          disabled={!height || !weight}
          aria-disabled={!height || !weight}
        >
          Calculate BMI
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      {result && (
        <ResultsContainer title="BMI Results">
          <div className="space-y-3">
            <ResultDisplay 
              label="BMI"
              value={result.bmi.toFixed(1)}
            />
            <ResultDisplay 
              label="Category"
              value={result.category}
            />
            <ResultDisplay 
              label="Ideal Weight Range"
              value={`${result.idealWeightRange.min}-${result.idealWeightRange.max}`}
              unit={unit === 'metric' ? 'kg' : 'lbs'}
            />
          </div>
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
};

export default BMICalculator; 