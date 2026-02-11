import React, { useState, useEffect } from 'react';
import { stockAPI } from '../services/api';
import StockCard from '../components/StockCard';
import { useAuth } from '../context/AuthContext';

const StockList = () => {
  const { isAuthenticated } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    symbol: '',
    companyName: '',
    sortBy: '',
    isDescending: false,
    pageNumber: 1,
    pageSize: 12,
  });

  useEffect(() => {
    fetchStocks();
  }, [filters]);

  const fetchStocks = async () => {
    setLoading(true);
    setError('');
    try {
      const queryParams = {
        Symbol: filters.symbol || undefined,
        CompanyName: filters.companyName || undefined,
        SortBy: filters.sortBy || undefined,
        IsDecsending: filters.isDescending,
        PageNumber: filters.pageNumber,
        PageSize: filters.pageSize,
      };
      
      const response = await stockAPI.getAll(queryParams);
      setStocks(response.data);
    } catch (err) {
      setError('Failed to load stocks. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
      pageNumber: 1, // Reset to first page when filters change
    });
  };

  const handleSortChange = (sortBy) => {
    setFilters({
      ...filters,
      sortBy: sortBy,
      isDescending: filters.sortBy === sortBy ? !filters.isDescending : false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Market</h1>
          <p className="text-gray-600">Explore and invest in top stocks</p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Symbol
              </label>
              <input
                type="text"
                name="symbol"
                value={filters.symbol}
                onChange={handleFilterChange}
                placeholder="e.g., AAPL"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Company
              </label>
              <input
                type="text"
                name="companyName"
                value={filters.companyName}
                onChange={handleFilterChange}
                placeholder="e.g., Apple"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">None</option>
                <option value="Symbol">Symbol</option>
                <option value="CompanyName">Company Name</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="isDescending"
              checked={filters.isDescending}
              onChange={(e) => setFilters({ ...filters, isDescending: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label htmlFor="isDescending" className="ml-2 block text-sm text-gray-700">
              Sort Descending
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin h-10 w-10 border-2 border-gray-300 border-t-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading stocks...</p>
          </div>
        ) : (
          <>
            {/* Stock Grid */}
            {stocks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No stocks found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {stocks.map((stock) => (
                  <StockCard key={stock.id} stock={stock} onPortfolioUpdate={fetchStocks} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setFilters({ ...filters, pageNumber: Math.max(1, filters.pageNumber - 1) })}
                disabled={filters.pageNumber === 1}
                className="px-4 py-2 bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-white border border-gray-300">
                Page {filters.pageNumber}
              </span>
              <button
                onClick={() => setFilters({ ...filters, pageNumber: filters.pageNumber + 1 })}
                disabled={stocks.length < filters.pageSize}
                className="px-4 py-2 bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StockList;
