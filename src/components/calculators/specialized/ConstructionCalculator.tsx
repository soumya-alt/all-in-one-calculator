import React, { useState } from 'react';

type CalculationType = 'area' | 'volume' | 'materials' | 'cost';

interface AreaResult {
  totalArea: number;
  perimeter: number;
}

interface VolumeResult {
  volume: number;
  surfaceArea: number;
}

interface MaterialsResult {
  cement: number;
  sand: number;
  aggregate: number;
  bricks: number;
}

interface CostResult {
  materialCost: number;
  laborCost: number;
  totalCost: number;
}

type CalculationResult = AreaResult | VolumeResult | MaterialsResult | CostResult;

const ConstructionCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<CalculationType>('area');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Constants for materials calculation
  const CEMENT_PER_M3 = 350; // kg per cubic meter
  const SAND_PER_M3 = 0.4; // cubic meters
  const AGGREGATE_PER_M3 = 0.8; // cubic meters
  const BRICKS_PER_M2 = 60; // standard bricks per square meter
  
  // Constants for cost calculation
  const CEMENT_COST = 15; // per kg
  const SAND_COST = 1500; // per cubic meter
  const AGGREGATE_COST = 2000; // per cubic meter
  const BRICK_COST = 10; // per brick
  const LABOR_COST_FACTOR = 0.3; // 30% of material cost

  const calculateArea = (l: number, w: number): AreaResult => {
    const totalArea = l * w;
    const perimeter = 2 * (l + w);
    return { totalArea, perimeter };
  };

  const calculateVolume = (l: number, w: number, h: number): VolumeResult => {
    const volume = l * w * h;
    const surfaceArea = 2 * (l * w + l * h + w * h);
    return { volume, surfaceArea };
  };

  const calculateMaterials = (volume: number, wallArea: number): MaterialsResult => {
    return {
      cement: volume * CEMENT_PER_M3,
      sand: volume * SAND_PER_M3,
      aggregate: volume * AGGREGATE_PER_M3,
      bricks: wallArea * BRICKS_PER_M2
    };
  };

  const calculateCost = (materials: MaterialsResult): CostResult => {
    const materialCost = 
      materials.cement * CEMENT_COST +
      materials.sand * SAND_COST +
      materials.aggregate * AGGREGATE_COST +
      materials.bricks * BRICK_COST;
    
    const laborCost = materialCost * LABOR_COST_FACTOR;
    const totalCost = materialCost + laborCost;

    return {
      materialCost,
      laborCost,
      totalCost
    };
  };

  const calculate = () => {
    try {
      const l = parseFloat(length);
      const w = parseFloat(width);
      const h = parseFloat(height);

      if (calculationType === 'area' && (isNaN(l) || isNaN(w))) {
        throw new Error('Please enter valid length and width');
      }

      if (['volume', 'materials', 'cost'].includes(calculationType) && 
          (isNaN(l) || isNaN(w) || isNaN(h))) {
        throw new Error('Please enter valid length, width, and height');
      }

      if ([l, w, h].some(val => val <= 0)) {
        throw new Error('Dimensions must be greater than 0');
      }

      let calculationResult: CalculationResult;

      switch (calculationType) {
        case 'area':
          calculationResult = calculateArea(l, w);
          break;
        case 'volume':
          calculationResult = calculateVolume(l, w, h);
          break;
        case 'materials': {
          const { volume } = calculateVolume(l, w, h);
          const wallArea = 2 * (l + w) * h; // Only vertical walls
          calculationResult = calculateMaterials(volume, wallArea);
          break;
        }
        case 'cost': {
          const { volume } = calculateVolume(l, w, h);
          const wallArea = 2 * (l + w) * h;
          const materials = calculateMaterials(volume, wallArea);
          calculationResult = calculateCost(materials);
          break;
        }
        default:
          throw new Error('Invalid calculation type');
      }

      setResult(calculationResult);
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

  const renderResult = () => {
    if (!result) return null;

    switch (calculationType) {
      case 'area':
        const areaResult = result as AreaResult;
        return (
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              Total Area: <span className="font-bold">{areaResult.totalArea.toFixed(2)} m²</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Perimeter: <span className="font-bold">{areaResult.perimeter.toFixed(2)} m</span>
            </p>
          </div>
        );

      case 'volume':
        const volumeResult = result as VolumeResult;
        return (
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              Volume: <span className="font-bold">{volumeResult.volume.toFixed(2)} m³</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Surface Area: <span className="font-bold">{volumeResult.surfaceArea.toFixed(2)} m²</span>
            </p>
          </div>
        );

      case 'materials':
        const materialsResult = result as MaterialsResult;
        return (
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              Cement Required: <span className="font-bold">{materialsResult.cement.toFixed(2)} kg</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Sand Required: <span className="font-bold">{materialsResult.sand.toFixed(2)} m³</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Aggregate Required: <span className="font-bold">{materialsResult.aggregate.toFixed(2)} m³</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Bricks Required: <span className="font-bold">{Math.ceil(materialsResult.bricks)} pieces</span>
            </p>
          </div>
        );

      case 'cost':
        const costResult = result as CostResult;
        return (
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white">
              Material Cost: <span className="font-bold">${costResult.materialCost.toFixed(2)}</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Labor Cost: <span className="font-bold">${costResult.laborCost.toFixed(2)}</span>
            </p>
            <p className="text-gray-900 dark:text-white">
              Total Cost: <span className="font-bold">${costResult.totalCost.toFixed(2)}</span>
            </p>
          </div>
        );
    }
  };

  return (
    <main 
      className="w-full max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8" 
      role="main"
      aria-labelledby="page-title"
    >
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 
            id="page-title"
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Construction Calculator
          </h1>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              calculate();
            }}
            className="space-y-6"
            noValidate
          >
            <div className="space-y-4">
              <div role="group" aria-labelledby="calc-type-label">
                <label 
                  id="calc-type-label"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Calculation Type
                </label>
                <select
                  value={calculationType}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="select w-full focus:ring-2 focus:ring-primary"
                  aria-describedby="calc-type-description"
                >
                  <option value="area">Area & Perimeter</option>
                  <option value="volume">Volume & Surface Area</option>
                  <option value="materials">Materials Estimation</option>
                  <option value="cost">Cost Estimation</option>
                </select>
                <p 
                  id="calc-type-description" 
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  Select the type of construction calculation you need
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="length"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Length (m)
                  </label>
                  <div className="relative">
                    <input
                      id="length"
                      type="text"
                      inputMode="decimal"
                      value={length}
                      onChange={(e) => handleInputChange(e.target.value, setLength)}
                      className="input w-full pr-8 focus:ring-2 focus:ring-primary"
                      placeholder="Enter length"
                      aria-describedby="length-description"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m</span>
                  </div>
                  <p id="length-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter the length in meters
                  </p>
                </div>

                <div>
                  <label 
                    htmlFor="width"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Width (m)
                  </label>
                  <div className="relative">
                    <input
                      id="width"
                      type="text"
                      inputMode="decimal"
                      value={width}
                      onChange={(e) => handleInputChange(e.target.value, setWidth)}
                      className="input w-full pr-8 focus:ring-2 focus:ring-primary"
                      placeholder="Enter width"
                      aria-describedby="width-description"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m</span>
                  </div>
                  <p id="width-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter the width in meters
                  </p>
                </div>
              </div>

              {calculationType !== 'area' && (
                <div>
                  <label 
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Height (m)
                  </label>
                  <div className="relative">
                    <input
                      id="height"
                      type="text"
                      inputMode="decimal"
                      value={height}
                      onChange={(e) => handleInputChange(e.target.value, setHeight)}
                      className="input w-full pr-8 focus:ring-2 focus:ring-primary"
                      placeholder="Enter height"
                      aria-describedby="height-description"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m</span>
                  </div>
                  <p id="height-description" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Enter the height in meters
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto px-8 py-3 text-base font-medium"
                disabled={!length || !width || (calculationType !== 'area' && !height)}
                aria-disabled={!length || !width || (calculationType !== 'area' && !height)}
              >
                Calculate
              </button>
            </div>
          </form>

          {error && (
            <div 
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg" 
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            </div>
          )}

          {result && (
            <div 
              className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
              role="region"
              aria-label="Calculation Results"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Results
              </h2>
              <div className="divide-y divide-gray-200 dark:divide-gray-600">
                {renderResult()}
              </div>
            </div>
          )}

          <div 
            className="mt-8 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg"
            role="complementary"
            aria-label="Help Information"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About Construction Calculations
            </h2>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 list-disc pl-5">
              <li>Area calculation for flooring and roofing</li>
              <li>Volume calculation for concrete requirements</li>
              <li>Materials estimation based on standard ratios</li>
              <li>Cost estimation includes materials and labor</li>
              <li>All measurements should be in meters</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ConstructionCalculator; 