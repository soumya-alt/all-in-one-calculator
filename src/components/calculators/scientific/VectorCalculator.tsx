import React, { useState } from 'react';

interface Vector {
  x: number;
  y: number;
  z: number;
}

const VectorCalculator: React.FC = () => {
  const [vector1, setVector1] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const [vector2, setVector2] = useState<Vector>({ x: 0, y: 0, z: 0 });
  const [scalar, setScalar] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'dot' | 'cross' | 'scalar'>('add');
  const [result, setResult] = useState<Vector | number | null>(null);

  const handleVector1Change = (component: keyof Vector, value: string) => {
    const num = value === '' ? 0 : parseFloat(value);
    if (isNaN(num)) return;
    setVector1({ ...vector1, [component]: num });
  };

  const handleVector2Change = (component: keyof Vector, value: string) => {
    const num = value === '' ? 0 : parseFloat(value);
    if (isNaN(num)) return;
    setVector2({ ...vector2, [component]: num });
  };

  const calculate = () => {
    switch (operation) {
      case 'add':
        setResult({
          x: vector1.x + vector2.x,
          y: vector1.y + vector2.y,
          z: vector1.z + vector2.z,
        });
        break;
      case 'subtract':
        setResult({
          x: vector1.x - vector2.x,
          y: vector1.y - vector2.y,
          z: vector1.z - vector2.z,
        });
        break;
      case 'dot':
        setResult(
          vector1.x * vector2.x +
          vector1.y * vector2.y +
          vector1.z * vector2.z
        );
        break;
      case 'cross':
        setResult({
          x: vector1.y * vector2.z - vector1.z * vector2.y,
          y: vector1.z * vector2.x - vector1.x * vector2.z,
          z: vector1.x * vector2.y - vector1.y * vector2.x,
        });
        break;
      case 'scalar':
        const s = parseFloat(scalar);
        if (isNaN(s)) {
          alert('Please enter a valid scalar value');
          return;
        }
        setResult({
          x: vector1.x * s,
          y: vector1.y * s,
          z: vector1.z * s,
        });
        break;
    }
  };

  const formatVector = (v: Vector): string => {
    return `(${v.x}, ${v.y}, ${v.z})`;
  };

  const renderVectorInput = (
    vector: Vector,
    onChange: (component: keyof Vector, value: string) => void,
    label: string
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          value={vector.x || ''}
          onChange={(e) => onChange('x', e.target.value)}
          className="input"
          placeholder="x"
        />
        <input
          type="number"
          value={vector.y || ''}
          onChange={(e) => onChange('y', e.target.value)}
          className="input"
          placeholder="y"
        />
        <input
          type="number"
          value={vector.z || ''}
          onChange={(e) => onChange('z', e.target.value)}
          className="input"
          placeholder="z"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Vector Calculator
        </h2>
        
        <div className="space-y-6">
          {renderVectorInput(vector1, handleVector1Change, 'First Vector')}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as typeof operation)}
              className="select"
            >
              <option value="add">Addition (+)</option>
              <option value="subtract">Subtraction (-)</option>
              <option value="dot">Dot Product (·)</option>
              <option value="cross">Cross Product (×)</option>
              <option value="scalar">Scalar Multiplication</option>
            </select>
          </div>

          {operation === 'scalar' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Scalar Value
              </label>
              <input
                type="number"
                value={scalar}
                onChange={(e) => setScalar(e.target.value)}
                className="input"
                placeholder="Enter scalar value"
              />
            </div>
          ) : (
            renderVectorInput(vector2, handleVector2Change, 'Second Vector')
          )}

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Result: {typeof result === 'number' ? result : formatVector(result)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VectorCalculator; 