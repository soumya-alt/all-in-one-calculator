export function roundToDecimalPlaces(value: number, places: number): number {
  const factor = Math.pow(10, places)
  return Math.round(value * factor) / factor
}

export function formatNumber(value: number, options: {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  notation?: 'standard' | 'scientific' | 'engineering' | 'compact'
} = {}): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: options.minimumFractionDigits,
    maximumFractionDigits: options.maximumFractionDigits,
    notation: options.notation,
  }).format(value)
}

export function parseNumberInput(value: string): number {
  const parsedValue = value.replace(/[^\d.-]/g, '')
  const number = parseFloat(parsedValue)
  return isNaN(number) ? 0 : number
}

export function validateNumber(value: number, options: {
  min?: number
  max?: number
  integer?: boolean
} = {}): boolean {
  if (options.integer && !Number.isInteger(value)) return false
  if (options.min !== undefined && value < options.min) return false
  if (options.max !== undefined && value > options.max) return false
  return true
}

export function calculatePercentage(value: number, total: number): number {
  return (value / total) * 100
}

export function interpolateValue(start: number, end: number, fraction: number): number {
  return start + (end - start) * fraction
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI)
}

export function factorial(n: number): number {
  if (n < 0) return NaN
  if (n === 0) return 1
  let result = 1
  for (let i = 1; i <= n; i++) {
    result *= i
  }
  return result
}

export function combinations(n: number, r: number): number {
  if (r > n) return 0
  return factorial(n) / (factorial(r) * factorial(n - r))
}

export function permutations(n: number, r: number): number {
  if (r > n) return 0
  return factorial(n) / factorial(n - r)
}

export function mean(values: number[]): number {
  if (values.length === 0) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0
    ? (sorted[middle - 1] + sorted[middle]) / 2
    : sorted[middle]
}

export function mode(values: number[]): number[] {
  if (values.length === 0) return []
  const counts = new Map<number, number>()
  let maxCount = 0
  
  values.forEach(value => {
    const count = (counts.get(value) || 0) + 1
    counts.set(value, count)
    maxCount = Math.max(maxCount, count)
  })
  
  return Array.from(counts.entries())
    .filter(([_, count]) => count === maxCount)
    .map(([value]) => value)
    .sort((a, b) => a - b)
}

export function standardDeviation(values: number[]): number {
  if (values.length === 0) return 0
  const avg = mean(values)
  const squareDiffs = values.map(value => Math.pow(value - avg, 2))
  return Math.sqrt(mean(squareDiffs))
}

export function variance(values: number[]): number {
  return Math.pow(standardDeviation(values), 2)
}

export function correlation(xValues: number[], yValues: number[]): number {
  if (xValues.length !== yValues.length || xValues.length === 0) return 0
  
  const xMean = mean(xValues)
  const yMean = mean(yValues)
  
  let numerator = 0
  let xDenominator = 0
  let yDenominator = 0
  
  for (let i = 0; i < xValues.length; i++) {
    const xDiff = xValues[i] - xMean
    const yDiff = yValues[i] - yMean
    numerator += xDiff * yDiff
    xDenominator += xDiff * xDiff
    yDenominator += yDiff * yDiff
  }
  
  return numerator / Math.sqrt(xDenominator * yDenominator)
}

export function linearRegression(xValues: number[], yValues: number[]): {
  slope: number
  intercept: number
  r2: number
} {
  if (xValues.length !== yValues.length || xValues.length === 0) {
    return { slope: 0, intercept: 0, r2: 0 }
  }
  
  const xMean = mean(xValues)
  const yMean = mean(yValues)
  
  let numerator = 0
  let denominator = 0
  
  for (let i = 0; i < xValues.length; i++) {
    const xDiff = xValues[i] - xMean
    numerator += xDiff * (yValues[i] - yMean)
    denominator += xDiff * xDiff
  }
  
  const slope = numerator / denominator
  const intercept = yMean - slope * xMean
  const r = correlation(xValues, yValues)
  
  return {
    slope,
    intercept,
    r2: r * r,
  }
} 