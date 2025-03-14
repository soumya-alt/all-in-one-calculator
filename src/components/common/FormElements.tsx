import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'date';
  placeholder?: string;
  unit?: string;
  description?: string;
  error?: string;
  inputMode?: 'text' | 'decimal' | 'numeric';
  pattern?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  unit,
  description,
  error,
  inputMode,
  pattern,
  required = false,
}) => {
  const inputId = `${id}-input`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <label 
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            input w-full pr-12 focus:ring-2 focus:ring-primary
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${unit ? 'pr-12' : 'pr-4'}
          `}
          placeholder={placeholder}
          aria-describedby={`${description ? descriptionId : ''} ${error ? errorId : ''}`}
          aria-invalid={!!error}
          aria-required={required}
          inputMode={inputMode}
          pattern={pattern}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {unit}
          </span>
        )}
      </div>
      {description && (
        <p 
          id={descriptionId}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      )}
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  description?: string;
  error?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  description,
  error,
  required = false,
}) => {
  const selectId = `${id}-select`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      <label 
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          select w-full focus:ring-2 focus:ring-primary
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        aria-describedby={`${description ? descriptionId : ''} ${error ? errorId : ''}`}
        aria-invalid={!!error}
        aria-required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description && (
        <p 
          id={descriptionId}
          className="mt-1 text-sm text-gray-500 dark:text-gray-400"
        >
          {description}
        </p>
      )}
      {error && (
        <p 
          id={errorId}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface ResultDisplayProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  label,
  value,
  unit
}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span className="text-gray-700 dark:text-gray-300">{label}:</span>
      <span className="font-semibold text-gray-900 dark:text-white">
        {value}{unit && <span className="ml-1">{unit}</span>}
      </span>
    </div>
  );
};

interface ResultsContainerProps {
  title: string;
  children: React.ReactNode;
}

export const ResultsContainer: React.FC<ResultsContainerProps> = ({
  title,
  children
}) => {
  return (
    <div 
      className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
      role="region"
      aria-label={title}
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {children}
      </div>
    </div>
  );
};

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg" 
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm text-red-600 dark:text-red-400">
        {message}
      </p>
    </div>
  );
}; 