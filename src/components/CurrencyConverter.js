import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'fca_live_Fl4fl0IfTYCSxVPZJkSr3g7zSV29QrvbIRJ2cnfC';

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  // Add more currency symbols as needed
};

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleConvert = async () => {
    try {
      const response = await axios.get(`https://api.freecurrencyapi.com/v1/latest`, {
        params: {
          apikey: API_KEY,
          base_currency: fromCurrency,
          currencies: toCurrency,
        },
      });

      const rate = response.data.data[toCurrency];
      const result = amount * rate;
      setConvertedAmount(`${currencySymbols[toCurrency] || ''}${result.toFixed(2)}`);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white">
      <div className="max-w-md mx-auto mb-4 bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="from-currency">From</label>
          <input
            type="text"
            id="from-currency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
            className="w-full p-2 rounded border border-gray-300 text-gray-700"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="to-currency">To</label>
          <input
            type="text"
            id="to-currency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            className="w-full p-2 rounded border border-gray-300 text-gray-700"
          />
        </div>
        <button onClick={handleConvert} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold">Converted Amount</h2>
          <p className="text-xl">{convertedAmount}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
