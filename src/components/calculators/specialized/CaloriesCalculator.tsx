import React, { useState } from 'react';

interface CaloriesResult {
  bmr: number;
  maintenance: number;
  weightLoss: {
    mild: number;
    moderate: number;
    extreme: number;
  };
  weightGain: {
    mild: number;
    moderate: number;
  };
}

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';

const activityMultipliers: Record<ActivityLevel, number> = {
  'sedentary': 1.2,      // Little or no exercise
  'light': 1.375,        // Light exercise 1-3 times/week
  'moderate': 1.55,      // Moderate exercise 3-5 times/week
  'active': 1.725,       // Heavy exercise 6-7 times/week
  'very-active': 1.9     // Very heavy exercise, physical job
};

const CaloriesCalculator: React.FC = () => {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<CaloriesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateBMR = (
    age: number,
    gender: 'male' | 'female',
    heightCm: number,
    weightKg: number
  ): number => {
    // Mifflin-St Jeor Equation
    const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return gender === 'male' ? baseBMR + 5 : baseBMR - 161;
  };

  const calculate = () => {
    try {
      const ageNum = parseFloat(age);
      const heightCm = parseFloat(height);
      const weightKg = parseFloat(weight);

      if (isNaN(ageNum) || isNaN(heightCm) || isNaN(weightKg)) {
        setError('Please enter valid numbers');
        setResult(null);
        return;
      }

      if (ageNum <= 0 || heightCm <= 0 || weightKg <= 0) {
        setError('Values must be greater than 0');
        setResult(null);
        return;
      }

      if (ageNum > 120) {
        setError('Please enter a valid age');
        setResult(null);
        return;
      }

      const bmr = calculateBMR(ageNum, gender, heightCm, weightKg);
      const maintenance = bmr * activityMultipliers[activityLevel];

      setResult({
        bmr: Math.round(bmr),
        maintenance: Math.round(maintenance),
        weightLoss: {
          mild: Math.round(maintenance - 250),      // 0.25kg/week loss
          moderate: Math.round(maintenance - 500),   // 0.5kg/week loss
          extreme: Math.round(maintenance - 1000),   // 1kg/week loss
        },
        weightGain: {
          mild: Math.round(maintenance + 250),      // 0.25kg/week gain
          moderate: Math.round(maintenance + 500),   // 0.5kg/week gain
        }
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error occurred');
      setResult(null);
    }
  };

  const handleInputChange = (value: string, setter: (value: string) => void) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
      setError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Calories Calculator
        </h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => setGender('male')}
              className={`btn flex-1 ${gender === 'male' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`btn flex-1 ${gender === 'female' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Female
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Age (years)
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => handleInputChange(e.target.value, setAge)}
              className="input w-full"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Height (cm)
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => handleInputChange(e.target.value, setHeight)}
              className="input w-full"
              placeholder="Enter your height in centimeters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weight (kg)
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => handleInputChange(e.target.value, setWeight)}
              className="input w-full"
              placeholder="Enter your weight in kilograms"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="select w-full"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Lightly active (1-3 days/week)</option>
              <option value="moderate">Moderately active (3-5 days/week)</option>
              <option value="active">Very active (6-7 days/week)</option>
              <option value="very-active">Extra active (very physical job/training)</option>
            </select>
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
            disabled={!age || !height || !weight}
          >
            Calculate Calories
          </button>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
                <p className="text-gray-900 dark:text-white">
                  Basal Metabolic Rate (BMR): <span className="font-bold">{result.bmr} calories/day</span>
                </p>
                <p className="text-gray-900 dark:text-white">
                  Maintenance Calories: <span className="font-bold">{result.maintenance} calories/day</span>
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Weight Loss Targets
                </h3>
                <p className="text-gray-900 dark:text-white">
                  Mild (0.25kg/week): <span className="font-bold">{result.weightLoss.mild} calories/day</span>
                </p>
                <p className="text-gray-900 dark:text-white">
                  Moderate (0.5kg/week): <span className="font-bold">{result.weightLoss.moderate} calories/day</span>
                </p>
                <p className="text-gray-900 dark:text-white">
                  Extreme (1kg/week): <span className="font-bold">{result.weightLoss.extreme} calories/day</span>
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Weight Gain Targets
                </h3>
                <p className="text-gray-900 dark:text-white">
                  Mild (0.25kg/week): <span className="font-bold">{result.weightGain.mild} calories/day</span>
                </p>
                <p className="text-gray-900 dark:text-white">
                  Moderate (0.5kg/week): <span className="font-bold">{result.weightGain.moderate} calories/day</span>
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Calorie Calculation
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• BMR is your calorie burn at complete rest</li>
              <li>• Maintenance calories keep your weight stable</li>
              <li>• Activity level greatly affects daily needs</li>
              <li>• Safe weight loss is 0.5-1kg per week</li>
              <li>• Results are estimates; adjust based on progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator; 