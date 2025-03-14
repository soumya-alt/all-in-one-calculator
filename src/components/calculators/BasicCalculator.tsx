import React, { useState } from 'react'

const BasicCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

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

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ]

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400 h-6">
          {equation}
        </div>
        <div className="calculator-display">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button
          className="calculator-button col-span-4 bg-red-600 hover:bg-red-700"
          onClick={handleClear}
        >
          Clear
        </button>
        {buttons.map((row, i) => (
          <React.Fragment key={i}>
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

export default BasicCalculator 