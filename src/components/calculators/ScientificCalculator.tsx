import React, { useState } from 'react'

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)
  const [degreeMode, setDegreeMode] = useState(true)

  const handleNumber = (number: string) => {
    if (shouldResetDisplay) {
      setDisplay(number)
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === '0' ? number : display + number)
    }
  }

  const handleOperator = (operator: string) => {
    setEquation(display + ' ' + operator + ' ')
    setShouldResetDisplay(true)
  }

  const handleFunction = (func: string) => {
    try {
      let result: number
      const num = parseFloat(display)
      
      switch (func) {
        case 'sin':
          result = degreeMode ? Math.sin(num * Math.PI / 180) : Math.sin(num)
          break
        case 'cos':
          result = degreeMode ? Math.cos(num * Math.PI / 180) : Math.cos(num)
          break
        case 'tan':
          result = degreeMode ? Math.tan(num * Math.PI / 180) : Math.tan(num)
          break
        case 'log':
          result = Math.log10(num)
          break
        case 'ln':
          result = Math.log(num)
          break
        case 'sqrt':
          result = Math.sqrt(num)
          break
        case 'square':
          result = num * num
          break
        case 'factorial':
          result = factorial(num)
          break
        default:
          result = num
      }
      
      setDisplay(result.toString())
      setShouldResetDisplay(true)
    } catch (error) {
      setDisplay('Error')
      setShouldResetDisplay(true)
    }
  }

  const factorial = (n: number): number => {
    if (n < 0) return NaN
    if (n === 0) return 1
    let result = 1
    for (let i = 1; i <= n; i++) {
      result *= i
    }
    return result
  }

  const handleEquals = () => {
    try {
      const result = eval(equation + display)
      setDisplay(String(result))
      setEquation('')
      setShouldResetDisplay(true)
    } catch (error) {
      setDisplay('Error')
      setEquation('')
      setShouldResetDisplay(true)
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setShouldResetDisplay(false)
  }

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'π'],
    ['log', 'ln', 'sqrt', '^'],
    ['(', ')', '!', 'e'],
  ]

  const basicButtons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 h-6">
          {equation}
        </div>
        <div className="calculator-display">
          {display}
        </div>
      </div>
      <div className="mb-4">
        <button
          className={`calculator-button mr-2 ${degreeMode ? 'bg-primary-600' : 'bg-gray-500'}`}
          onClick={() => setDegreeMode(true)}
        >
          DEG
        </button>
        <button
          className={`calculator-button ${!degreeMode ? 'bg-primary-600' : 'bg-gray-500'}`}
          onClick={() => setDegreeMode(false)}
        >
          RAD
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className="calculator-button col-span-4 bg-red-600 hover:bg-red-700"
          onClick={handleClear}
        >
          Clear
        </button>
        {scientificButtons.map((row, i) => (
          <React.Fragment key={`sci-${i}`}>
            {row.map((button) => (
              <button
                key={button}
                className="calculator-button bg-primary-500 hover:bg-primary-600"
                onClick={() => {
                  switch (button) {
                    case 'π':
                      handleNumber(Math.PI.toString())
                      break
                    case 'e':
                      handleNumber(Math.E.toString())
                      break
                    case '^':
                      handleOperator('**')
                      break
                    case '!':
                      handleFunction('factorial')
                      break
                    default:
                      handleFunction(button)
                  }
                }}
              >
                {button}
              </button>
            ))}
          </React.Fragment>
        ))}
        {basicButtons.map((row, i) => (
          <React.Fragment key={`basic-${i}`}>
            {row.map((button) => (
              <button
                key={button}
                className={`calculator-button ${
                  '×÷+-'.includes(button) ? 'bg-primary-500 hover:bg-primary-600' : ''
                } ${button === '=' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                onClick={() => {
                  if (button === '=') handleEquals()
                  else if ('×÷+-'.includes(button)) handleOperator(button === '×' ? '*' : button === '÷' ? '/' : button)
                  else handleNumber(button)
                }}
              >
                {button}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ScientificCalculator 