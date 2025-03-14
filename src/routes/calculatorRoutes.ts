import { lazy } from 'react';
import type { FC } from 'react';

export interface CalculatorRoute {
  path: string;
  name: string;
  description: string;
  icon: string;
  component: React.LazyExoticComponent<FC>;
}

export interface CalculatorCategory {
  name: string;
  description: string;
  icon: string;
  routes: CalculatorRoute[];
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    name: 'Basic',
    description: 'Fundamental mathematical operations',
    icon: 'CalculatorIcon',
    routes: [
      {
        path: 'basic/arithmetic',
        name: 'Basic Operations',
        description: 'Addition, Subtraction, Multiplication, Division',
        icon: 'PlusIcon',
        component: lazy(() => import('../components/calculators/basic/BasicCalculator')),
      },
      {
        path: 'basic/percentage',
        name: 'Percentage',
        description: 'Percentage calculations',
        icon: 'PercentIcon',
        component: lazy(() => import('../components/calculators/basic/PercentageCalculator')),
      },
      {
        path: 'basic/square-root',
        name: 'Square & Square Root',
        description: 'Square and square root calculations',
        icon: 'Square2StackIcon',
        component: lazy(() => import('../components/calculators/basic/SquareRootCalculator')),
      },
      {
        path: 'basic/cube-root',
        name: 'Cube & Cube Root',
        description: 'Cube and cube root calculations',
        icon: 'CubeIcon',
        component: lazy(() => import('../components/calculators/basic/CubeRootCalculator')),
      },
    ],
  },
  {
    name: 'Scientific',
    description: 'Advanced mathematical calculations',
    icon: 'BeakerIcon',
    routes: [
      {
        path: 'scientific/trigonometry',
        name: 'Trigonometry',
        description: 'Sine, Cosine, Tangent calculations',
        icon: 'AcademicCapIcon',
        component: lazy(() => import('../components/calculators/scientific/TrigonometryCalculator')),
      },
      {
        path: 'scientific/logarithm',
        name: 'Logarithm',
        description: 'Natural and base-10 logarithms',
        icon: 'ChartBarIcon',
        component: lazy(() => import('../components/calculators/scientific/LogarithmCalculator')),
      },
      {
        path: 'scientific/exponential',
        name: 'Exponents & Powers',
        description: 'Powers and roots',
        icon: 'ArrowTrendingUpIcon',
        component: lazy(() => import('../components/calculators/scientific/ExponentialCalculator')),
      },
      {
        path: 'scientific/factorial',
        name: 'Factorial',
        description: 'Factorial calculations',
        icon: 'ExclamationMarkIcon',
        component: lazy(() => import('../components/calculators/scientific/FactorialCalculator')),
      },
      {
        path: 'scientific/matrix',
        name: 'Matrix & Determinants',
        description: 'Matrix operations and determinants',
        icon: 'TableCellsIcon',
        component: lazy(() => import('../components/calculators/scientific/MatrixCalculator')),
      },
      {
        path: 'scientific/complex',
        name: 'Complex Numbers',
        description: 'Complex number operations',
        icon: 'PlusCircleIcon',
        component: lazy(() => import('../components/calculators/scientific/ComplexNumberCalculator')),
      },
      {
        path: 'scientific/probability',
        name: 'Probability & Combinations',
        description: 'Combinations and permutations',
        icon: 'ChartPieIcon',
        component: lazy(() => import('../components/calculators/scientific/ProbabilityCalculator')),
      },
      {
        path: 'scientific/vector',
        name: 'Vector & Scalar',
        description: 'Vector and scalar calculations',
        icon: 'ArrowsPointingOutIcon',
        component: lazy(() => import('../components/calculators/scientific/VectorCalculator')),
      },
    ],
  },
  {
    name: 'Financial',
    description: 'Financial calculations and tools',
    icon: 'BanknotesIcon',
    routes: [
      {
        path: 'financial/compound-interest',
        name: 'Compound Interest',
        description: 'Calculate compound interest over time',
        icon: 'CurrencyDollarIcon',
        component: lazy(() => import('../components/calculators/financial/CompoundInterestCalculator')),
      },
      {
        path: 'financial/emi',
        name: 'EMI Calculator',
        description: 'Calculate EMI for loans',
        icon: 'ReceiptPercentIcon',
        component: lazy(() => import('../components/calculators/financial/EMICalculator')),
      },
      {
        path: 'financial/loan',
        name: 'Loan Calculator',
        description: 'Calculate loan payments and interest',
        icon: 'HomeIcon',
        component: lazy(() => import('../components/calculators/financial/LoanCalculator')),
      },
      {
        path: 'financial/profit-loss',
        name: 'Profit & Loss',
        description: 'Calculate profit, loss, and discount',
        icon: 'ChartBarIcon',
        component: lazy(() => import('../components/calculators/financial/ProfitLossCalculator')),
      },
      {
        path: 'financial/tax',
        name: 'Tax Calculator',
        description: 'Calculate tax and GST',
        icon: 'ReceiptRefundIcon',
        component: lazy(() => import('../components/calculators/financial/TaxCalculator')),
      },
      {
        path: 'financial/investment',
        name: 'Investment Calculator',
        description: 'Stock market and investment calculations',
        icon: 'PresentationChartLineIcon',
        component: lazy(() => import('../components/calculators/financial/InvestmentCalculator')),
      },
    ],
  },
  {
    name: 'Engineering',
    description: 'Engineering and physics calculations',
    icon: 'WrenchScrewdriverIcon',
    routes: [
      {
        path: 'engineering/ohms-law',
        name: 'Ohm\'s Law',
        description: 'Calculate voltage, current, and resistance',
        icon: 'BoltIcon',
        component: lazy(() => import('../components/calculators/engineering/OhmsLawCalculator')),
      },
      {
        path: 'engineering/force',
        name: 'Force & Power',
        description: 'Calculate force, work, and power',
        icon: 'ArrowTrendingUpIcon',
        component: lazy(() => import('../components/calculators/engineering/ForceCalculator')),
      },
      {
        path: 'engineering/kinematics',
        name: 'Kinematics',
        description: 'Motion equations and calculations',
        icon: 'ArrowPathIcon',
        component: lazy(() => import('../components/calculators/engineering/KinematicsCalculator')),
      },
      {
        path: 'engineering/thermodynamics',
        name: 'Thermodynamics',
        description: 'Heat and thermodynamics calculations',
        icon: 'FireIcon',
        component: lazy(() => import('../components/calculators/engineering/ThermodynamicsCalculator')),
      },
    ],
  },
  {
    name: 'Computer Science',
    description: 'Computer science and programming calculations',
    icon: 'ComputerDesktopIcon',
    routes: [
      {
        path: 'cs/number-system',
        name: 'Number System',
        description: 'Binary, octal, and hexadecimal conversions',
        icon: 'CodeBracketIcon',
        component: lazy(() => import('../components/calculators/cs/NumberSystemCalculator')),
      },
      {
        path: 'cs/bitwise',
        name: 'Bitwise Operations',
        description: 'AND, OR, XOR, NOT operations',
        icon: 'CommandLineIcon',
        component: lazy(() => import('../components/calculators/cs/BitwiseCalculator')),
      },
      {
        path: 'cs/algorithm',
        name: 'Algorithm Complexity',
        description: 'Big-O notation calculations',
        icon: 'ChartBarIcon',
        component: lazy(() => import('../components/calculators/cs/AlgorithmComplexityCalculator')),
      },
    ],
  },
  {
    name: 'Statistics',
    description: 'Statistical and data analysis',
    icon: 'ChartBarSquareIcon',
    routes: [
      {
        path: 'statistics/descriptive',
        name: 'Descriptive Statistics',
        description: 'Mean, median, mode calculations',
        icon: 'ChartBarIcon',
        component: lazy(() => import('../components/calculators/statistics/DescriptiveStatsCalculator')),
      },
      {
        path: 'statistics/regression',
        name: 'Regression Analysis',
        description: 'Linear and multiple regression',
        icon: 'ArrowTrendingUpIcon',
        component: lazy(() => import('../components/calculators/statistics/RegressionCalculator')),
      },
      {
        path: 'statistics/probability',
        name: 'Probability Distribution',
        description: 'Normal, Poisson, Binomial distributions',
        icon: 'ChartPieIcon',
        component: lazy(() => import('../components/calculators/statistics/ProbabilityDistCalculator')),
      },
    ],
  },
  {
    name: 'Unit Conversion',
    description: 'Convert between different units',
    icon: 'ArrowsRightLeftIcon',
    routes: [
      {
        path: 'conversion/length',
        name: 'Length Converter',
        description: 'Convert between length units',
        icon: 'ArrowsUpDownIcon',
        component: lazy(() => import('../components/calculators/conversion/LengthConverter')),
      },
      {
        path: 'conversion/weight',
        name: 'Weight Converter',
        description: 'Convert between weight units',
        icon: 'ScaleIcon',
        component: lazy(() => import('../components/calculators/conversion/WeightConverter')),
      },
      {
        path: 'conversion/temperature',
        name: 'Temperature Converter',
        description: 'Convert between temperature units',
        icon: 'SunIcon',
        component: lazy(() => import('../components/calculators/conversion/TemperatureConverter')),
      },
      {
        path: 'conversion/currency',
        name: 'Currency Converter',
        description: 'Convert between currencies',
        icon: 'CurrencyDollarIcon',
        component: lazy(() => import('../components/calculators/conversion/CurrencyConverter')),
      },
    ],
  },
  {
    name: 'Date & Time',
    description: 'Date and time calculations',
    icon: 'CalendarIcon',
    routes: [
      {
        path: 'datetime/date-difference',
        name: 'Date Difference',
        description: 'Calculate the difference between dates',
        icon: 'CalendarDaysIcon',
        component: lazy(() => import('../components/calculators/datetime/DateDifferenceCalculator')),
      },
      {
        path: 'datetime/time-zone',
        name: 'Time Zone Converter',
        description: 'Convert between time zones',
        icon: 'ClockIcon',
        component: lazy(() => import('../components/calculators/datetime/TimeZoneConverter')),
      },
      {
        path: 'datetime/workdays',
        name: 'Workdays Calculator',
        description: 'Calculate workdays and holidays',
        icon: 'BriefcaseIcon',
        component: lazy(() => import('../components/calculators/datetime/WorkdaysCalculator')),
      },
    ],
  },
  {
    name: 'Specialized',
    description: 'Specialized calculations',
    icon: 'BeakerIcon',
    routes: [
      {
        path: 'specialized/bmi',
        name: 'BMI Calculator',
        description: 'Body Mass Index calculation',
        icon: 'UserIcon',
        component: lazy(() => import('../components/calculators/specialized/BMICalculator')),
      },
      {
        path: 'specialized/calories',
        name: 'Calories Calculator',
        description: 'Diet and calorie calculations',
        icon: 'HeartIcon',
        component: lazy(() => import('../components/calculators/specialized/CaloriesCalculator')),
      },
      {
        path: 'specialized/chemistry',
        name: 'Chemical Calculator',
        description: 'Molecular weight calculations',
        icon: 'BeakerIcon',
        component: lazy(() => import('../components/calculators/specialized/ChemicalCalculator')),
      },
      {
        path: 'specialized/astronomy',
        name: 'Astronomy Calculator',
        description: 'Astronomical calculations',
        icon: 'StarIcon',
        component: lazy(() => import('../components/calculators/specialized/AstronomyCalculator')),
      },
      {
        path: 'specialized/construction',
        name: 'Construction Calculator',
        description: 'Construction and civil engineering calculations',
        icon: 'BuildingOfficeIcon',
        component: lazy(() => import('../components/calculators/specialized/ConstructionCalculator')),
      },
    ],
  },
]; 