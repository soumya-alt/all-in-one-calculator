import React, { useState } from 'react';
import CalculatorLayout from '../../layout/CalculatorLayout';
import { InputField, ResultDisplay, ResultsContainer, ErrorMessage } from '../../common/FormElements';

interface Element {
  symbol: string;
  mass: number;
}

const elements: Record<string, Element> = {
  H: { symbol: 'H', mass: 1.008 },
  C: { symbol: 'C', mass: 12.011 },
  N: { symbol: 'N', mass: 14.007 },
  O: { symbol: 'O', mass: 15.999 },
  Na: { symbol: 'Na', mass: 22.990 },
  Mg: { symbol: 'Mg', mass: 24.305 },
  P: { symbol: 'P', mass: 30.974 },
  S: { symbol: 'S', mass: 32.065 },
  Cl: { symbol: 'Cl', mass: 35.453 },
  K: { symbol: 'K', mass: 39.098 },
  Ca: { symbol: 'Ca', mass: 40.078 },
  Fe: { symbol: 'Fe', mass: 55.845 }
};

const ChemicalCalculator: React.FC = () => {
  const [formula, setFormula] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateMolecularWeight = () => {
    try {
      let totalMass = 0;
      const pattern = /([A-Z][a-z]?)(\d*)/g;
      const matches = formula.matchAll(pattern);

      for (const match of matches) {
        const [, element, count] = match;
        if (!elements[element]) {
          throw new Error(`Unknown element: ${element}`);
        }
        const quantity = count ? parseInt(count) : 1;
        totalMass += elements[element].mass * quantity;
      }

      setResult(totalMass);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid chemical formula');
    }
  };

  const helpContent = (
    <div className="space-y-2">
      <p>Enter a chemical formula using element symbols and numbers (e.g., H2O, NaCl, C6H12O6)</p>
      <p>Available elements: {Object.keys(elements).join(', ')}</p>
    </div>
  );

  return (
    <CalculatorLayout
      title="Chemical Calculator"
      helpContent={helpContent}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateMolecularWeight();
        }}
        className="space-y-6"
      >
        <InputField
          id="formula"
          label="Chemical Formula"
          value={formula}
          onChange={setFormula}
          placeholder="e.g., H2O"
          description="Enter a chemical formula using available elements"
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto px-8 py-3"
          disabled={!formula}
        >
          Calculate Molecular Weight
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      {result && (
        <ResultsContainer title="Results">
          <ResultDisplay
            label="Molecular Weight"
            value={result.toFixed(3)}
            unit="g/mol"
          />
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
};

export default ChemicalCalculator; 