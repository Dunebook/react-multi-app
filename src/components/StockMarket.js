import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const API_KEY = '1GVJ4V13KRCPYZFU';

function StockMarket() {
  const [symbol, setSymbol] = useState('AAPL');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_DAILY',
            symbol,
            apikey: API_KEY,
          },
        });
        const timeSeries = response.data['Time Series (Daily)'];
        const chartData = Object.keys(timeSeries).map(date => ({
          date,
          close: parseFloat(timeSeries[date]['4. close']),
        })).reverse();
        setData(chartData);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [symbol]);

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen text-white">
      <div className="max-w-md mx-auto mb-4 bg-white bg-opacity-20 backdrop-blur-md p-4 rounded-lg shadow-lg">
        <input
          type="text"
          value={symbol}
          onChange={handleSymbolChange}
          placeholder="Enter stock symbol..."
          className="w-full p-2 rounded border border-gray-300 text-gray-700"
        />
        <button onClick={() => setSymbol(symbol)} className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Get Stock Data
        </button>
      </div>
      <div className="mt-8 p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4">Stock Data for {symbol}</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
            <XAxis dataKey="date" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#333' }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ffffff' }} />
            <Line type="monotone" dataKey="close" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StockMarket;
