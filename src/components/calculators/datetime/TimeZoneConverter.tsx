import React, { useState } from 'react';

const timeZones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney',
  'Pacific/Auckland',
];

const TimeZoneConverter: React.FC = () => {
  const [dateTime, setDateTime] = useState('');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    if (!dateTime) return;

    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) return;

      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: toZone,
      };

      const converted = new Intl.DateTimeFormat('en-US', options).format(date);
      setResult(converted);
    } catch (error) {
      console.error('Error converting time:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <div className="card bg-white dark:bg-gray-800 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Time Zone Converter
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date and Time
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From Time Zone
              </label>
              <select
                value={fromZone}
                onChange={(e) => setFromZone(e.target.value)}
                className="select"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To Time Zone
              </label>
              <select
                value={toZone}
                onChange={(e) => setToZone(e.target.value)}
                className="select"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={convert}
            className="btn btn-primary w-full"
          >
            Convert
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                {result} ({toZone})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter; 