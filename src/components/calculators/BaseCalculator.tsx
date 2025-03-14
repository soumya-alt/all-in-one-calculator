import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { useNotification } from '@/contexts/NotificationContext';

export interface BaseCalculatorProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export interface CalculationResult<T> {
  value: T;
  error?: string;
}

export const BaseCalculator: React.FC<BaseCalculatorProps> = ({ title, description, children }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export const useCalculator = () => {
  const { setIsLoading } = useLoading();
  const { showNotification } = useNotification();

  const handleCalculation = async <T,>(
    calculation: () => Promise<CalculationResult<T>>,
    successMessage = 'Calculation completed successfully'
  ): Promise<CalculationResult<T>> => {
    try {
      setIsLoading(true);
      const result = await calculation();
      
      if (result.error) {
        showNotification({
          type: 'error',
          message: result.error,
        });
        return result;
      }

      showNotification({
        type: 'success',
        message: successMessage,
      });
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      showNotification({
        type: 'error',
        message: errorMessage,
      });
      return { value: null as T, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCalculation };
}; 