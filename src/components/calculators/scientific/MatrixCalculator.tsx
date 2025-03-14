import React, { useState } from 'react';

type Matrix = number[][];

const MatrixCalculator: React.FC = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[0, 0], [0, 0]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[0, 0], [0, 0]]);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'determinant'>('add');
  const [result, setResult] = useState<Matrix | number | null>(null);

  const createEmptyMatrix = (r: number, c: number): Matrix => {
    return Array(r).fill(0).map(() => Array(c).fill(0));
  };

  const handleDimensionChange = (newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setMatrixA(createEmptyMatrix(newRows, newCols));
    setMatrixB(createEmptyMatrix(newRows, newCols));
    setResult(null);
  };

  const handleMatrixChange = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const num = value === '' ? 0 : parseFloat(value);
    if (isNaN(num)) return;

    if (matrix === 'A') {
      const newMatrix = [...matrixA];
      newMatrix[row][col] = num;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = [...matrixB];
      newMatrix[row][col] = num;
      setMatrixB(newMatrix);
    }
  };

  const calculateDeterminant = (matrix: Matrix): number => {
    if (matrix.length !== matrix[0].length) return NaN;
    if (matrix.length === 1) return matrix[0][0];
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let i = 0; i < matrix[0].length; i++) {
      det += matrix[0][i] * (i % 2 === 0 ? 1 : -1) * calculateDeterminant(
        matrix.slice(1).map(row => [...row.slice(0, i), ...row.slice(i + 1)])
      );
    }
    return det;
  };

  const calculate = () => {
    switch (operation) {
      case 'add':
        setResult(matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j])));
        break;
      case 'subtract':
        setResult(matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j])));
        break;
      case 'multiply':
        if (matrixA[0].length !== matrixB.length) {
          alert('Matrix dimensions not compatible for multiplication');
          return;
        }
        const result = Array(matrixA.length).fill(0).map(() => Array(matrixB[0].length).fill(0));
        for (let i = 0; i < matrixA.length; i++) {
          for (let j = 0; j < matrixB[0].length; j++) {
            for (let k = 0; k < matrixB.length; k++) {
              result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
          }
        }
        setResult(result);
        break;
      case 'determinant':
        const det = calculateDeterminant(matrixA);
        if (isNaN(det)) {
          alert('Can only calculate determinant of square matrices');
          return;
        }
        setResult(det);
        break;
    }
  };

  const renderMatrix = (matrix: Matrix, label: string, onChange: (row: number, col: number, value: string) => void) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Matrix {label}
      </label>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val || ''}
              onChange={(e) => onChange(i, j, e.target.value)}
              className="input p-2 text-center"
              style={{ width: '100%' }}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Matrix Calculator
        </h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rows
              </label>
              <input
                type="number"
                value={rows}
                onChange={(e) => handleDimensionChange(parseInt(e.target.value) || 2, cols)}
                className="input"
                min="1"
                max="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Columns
              </label>
              <input
                type="number"
                value={cols}
                onChange={(e) => handleDimensionChange(rows, parseInt(e.target.value) || 2)}
                className="input"
                min="1"
                max="5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as typeof operation)}
              className="select"
            >
              <option value="add">Addition (A + B)</option>
              <option value="subtract">Subtraction (A - B)</option>
              <option value="multiply">Multiplication (A × B)</option>
              <option value="determinant">Determinant |A|</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderMatrix(matrixA, 'A', (row, col, value) => handleMatrixChange('A', row, col, value))}
            {operation !== 'determinant' && renderMatrix(matrixB, 'B', (row, col, value) => handleMatrixChange('B', row, col, value))}
          </div>

          <button
            onClick={calculate}
            className="btn btn-primary w-full"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Result:
              </p>
              {typeof result === 'number' ? (
                <p className="text-xl text-center">
                  |A| = {result}
                </p>
              ) : (
                <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${(result as Matrix)[0].length}, minmax(0, 1fr))` }}>
                  {(result as Matrix).map((row, i) =>
                    row.map((val, j) => (
                      <div
                        key={`${i}-${j}`}
                        className="bg-white dark:bg-gray-600 p-2 text-center rounded"
                      >
                        {val}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixCalculator; 