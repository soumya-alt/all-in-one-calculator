import React, { useState, useEffect } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
];

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError(null);
    try {
      // Note: In a production environment, you would use a real API key
      // and proper error handling for API rate limits
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch exchange rates. Using fallback rates.');
      // Fallback rates (approximate - for demo purposes)
      setExchangeRates({
        USD: 1,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110,
        AUD: 1.35,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.45,
        INR: 74.5,
        NZD: 1.42,
        SGD: 1.35,
        HKD: 7.78,
        KRW: 1150,
        MXN: 20.0,
        BRL: 5.25
      });
    }
    setLoading(false);
  };

  const convertCurrency = (value: number, from: string, to: string): number => {
    if (!exchangeRates) return 0;
    
    // Convert to USD first (base currency)
    const inUSD = from === 'USD' ? value : value / exchangeRates[from];
    // Then convert from USD to target currency
    return to === 'USD' ? inUSD : inUSD * exchangeRates[to];
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getConvertedAmount = (): number => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return 0;
    return convertCurrency(numAmount, fromCurrency, toCurrency);
  };

  const getExchangeRate = (): number => {
    return convertCurrency(1, fromCurrency, toCurrency);
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Currency Converter
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="input w-full"
              placeholder="Enter amount"
            />
          </div>

          <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="input w-full"
              >
                {CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwapCurrencies}
              className="mt-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ⇄
            </button>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="input w-full"
              >
                {CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-400">
              Loading exchange rates...
            </div>
          ) : (
            exchangeRates && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-2">
                <div className="text-lg text-gray-900 dark:text-white">
                  {amount && !isNaN(parseFloat(amount)) ? (
                    <>
                      <p className="font-medium">
                        {formatCurrency(parseFloat(amount), fromCurrency)} =
                      </p>
                      <p className="text-2xl font-bold mt-1">
                        {formatCurrency(getConvertedAmount(), toCurrency)}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Enter an amount to see the conversion
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  1 {fromCurrency} = {getExchangeRate().toFixed(4)} {toCurrency}
                </p>

                {lastUpdated && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last updated: {lastUpdated.toLocaleString()}
                  </p>
                )}
              </div>
            )
          )}

          <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              About Currency Conversion
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Exchange rates are updated regularly</li>
              <li>• Rates are indicative and may vary from actual market rates</li>
              <li>• For large transactions, consult financial institutions</li>
              <li>• Historical rates and trends are not included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter; 