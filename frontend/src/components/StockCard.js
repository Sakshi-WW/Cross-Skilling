import React from 'react';
import { Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';

const StockCard = ({ stock, inPortfolio = false, onPortfolioUpdate }) => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleAddToPortfolio = async () => {
    setLoading(true);
    setMessage('');
    try {
      await portfolioAPI.addStock(stock.symbol);
      setMessage('Added to portfolio!');
      if (onPortfolioUpdate) onPortfolioUpdate();
    } catch (error) {
      setMessage(error.response?.data || 'Failed to add to portfolio');
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRemoveFromPortfolio = async () => {
    setLoading(true);
    setMessage('');
    try {
      await portfolioAPI.removeStock(stock.symbol);
      setMessage('Removed from portfolio!');
      if (onPortfolioUpdate) onPortfolioUpdate();
    } catch (error) {
      setMessage(error.response?.data || 'Failed to remove from portfolio');
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 p-6 hover:border-gray-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{stock.symbol}</h3>
          <p className="text-sm text-gray-600">{stock.company}</p>
        </div>
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
          {stock.industry}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Purchase Price:</span>
          <span className="text-sm font-semibold text-primary-600">
            ${stock.purchase?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Last Dividend:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${stock.lastDiv?.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Market Cap:</span>
          <span className="text-sm font-semibold text-gray-900">
            ${(stock.marketCap / 1000000000).toFixed(2)}B
          </span>
        </div>
      </div>

      {message && (
        <div className={`mb-3 p-2 text-sm ${
          message.includes('Failed') ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-blue-100 text-blue-700 border border-blue-300'
        }`}>
          {message}
        </div>
      )}

      <div className="flex space-x-2">
        <Link
          to={`/stocks/${stock.id}`}
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 text-sm font-medium"
        >
          View Details
        </Link>
        {!inPortfolio ? (
          <button
            onClick={handleAddToPortfolio}
            disabled={loading}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        ) : (
          <button
            onClick={handleRemoveFromPortfolio}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Removing...' : 'Remove'}
          </button>
        )}
      </div>
    </div>
  );
};

export default StockCard;
