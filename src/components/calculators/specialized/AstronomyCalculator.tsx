import React, { useState } from 'react';
import CalculatorLayout from '../../layout/CalculatorLayout';
import { InputField, SelectField, ResultDisplay, ResultsContainer, ErrorMessage } from '../../common/FormElements';

interface CelestialBody {
  name: string;
  mass: number; // in kg
  radius: number; // in meters
  surfaceGravity: number; // in m/s²
}

const celestialBodies: Record<string, CelestialBody> = {
  sun: { name: 'Sun', mass: 1.989e30, radius: 696340000, surfaceGravity: 274 },
  earth: { name: 'Earth', mass: 5.972e24, radius: 6371000, surfaceGravity: 9.81 },
  moon: { name: 'Moon', mass: 7.34767309e22, radius: 1737100, surfaceGravity: 1.62 },
  mars: { name: 'Mars', mass: 6.39e23, radius: 3389500, surfaceGravity: 3.72 },
  jupiter: { name: 'Jupiter', mass: 1.898e27, radius: 69911000, surfaceGravity: 24.79 }
};

interface AstronomyResult {
  escapeVelocity: number;
  orbitalVelocity: number;
  gravitationalForce: number;
}

const AstronomyCalculator: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState('earth');
  const [distance, setDistance] = useState('');
  const [mass, setMass] = useState('');
  const [result, setResult] = useState<AstronomyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const G = 6.67430e-11; // Universal gravitational constant

  const calculate = () => {
    try {
      const body = celestialBodies[selectedBody];
      const objectMass = parseFloat(mass);
      const distanceValue = parseFloat(distance);

      if (isNaN(objectMass) || isNaN(distanceValue)) {
        throw new Error('Please enter valid numbers');
      }

      if (distanceValue <= 0 || objectMass <= 0) {
        throw new Error('Values must be greater than 0');
      }

      // Calculate escape velocity (v = sqrt(2GM/r))
      const escapeVelocity = Math.sqrt((2 * G * body.mass) / body.radius);

      // Calculate orbital velocity (v = sqrt(GM/r))
      const orbitalVelocity = Math.sqrt((G * body.mass) / (body.radius + distanceValue));

      // Calculate gravitational force (F = GMm/r²)
      const gravitationalForce = (G * body.mass * objectMass) / Math.pow(distanceValue, 2);

      setResult({
        escapeVelocity,
        orbitalVelocity,
        gravitationalForce
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error');
    }
  };

  const bodyOptions = Object.entries(celestialBodies).map(([value, body]) => ({
    value,
    label: body.name
  }));

  return (
    <CalculatorLayout
      title="Astronomy Calculator"
      helpContent="Calculate escape velocity, orbital velocity, and gravitational force for different celestial bodies."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
        className="space-y-6"
      >
        <SelectField
          id="celestial-body"
          label="Celestial Body"
          value={selectedBody}
          onChange={setSelectedBody}
          options={bodyOptions}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="distance"
            label="Distance from Surface"
            value={distance}
            onChange={setDistance}
            type="number"
            inputMode="decimal"
            placeholder="0"
            unit="m"
            description="Distance from the surface of the celestial body"
            required
          />

          <InputField
            id="mass"
            label="Object Mass"
            value={mass}
            onChange={setMass}
            type="number"
            inputMode="decimal"
            placeholder="0"
            unit="kg"
            description="Mass of the orbiting object"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto px-8 py-3"
          disabled={!distance || !mass}
        >
          Calculate
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      {result && (
        <ResultsContainer title="Results">
          <div className="space-y-3">
            <ResultDisplay
              label="Escape Velocity"
              value={result.escapeVelocity.toExponential(3)}
              unit="m/s"
            />
            <ResultDisplay
              label="Orbital Velocity"
              value={result.orbitalVelocity.toExponential(3)}
              unit="m/s"
            />
            <ResultDisplay
              label="Gravitational Force"
              value={result.gravitationalForce.toExponential(3)}
              unit="N"
            />
          </div>
        </ResultsContainer>
      )}
    </CalculatorLayout>
  );
};

export default AstronomyCalculator; 