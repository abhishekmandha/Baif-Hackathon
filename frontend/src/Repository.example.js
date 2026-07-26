/**
 * EXAMPLE: Updated Repository Component with Real Backend Integration
 * 
 * This shows how to fetch repository items from the backend
 * and handle download/delete operations.
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  AlertCircle,
  Loader,
  RefreshCw,
} from 'lucide-react';
import { repositoryAPI, APIError } from './services/api';

const Repository = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch repository items on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // Update filtered items when search term or items change
  useEffect(() => {
    const filtered = items.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await repositoryAPI.getAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to load repository';
      setError(message);
      console.error('Error fetching repository:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (itemId, itemName) => {
    try {
      setDownloading(itemId);
      setError(null);
      const blob = await repositoryAPI.download(itemId);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = itemName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Download failed';
      setError(message);
    } finally {
      setDownloading(null);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setDeleting(itemId);
      setError(null);
      await repositoryAPI.delete(itemId);
      setItems(items.filter(item => item.id !== itemId));
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Delete failed';
      setError(message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading repository...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="ml-2 flex-1">
            <p className="text-sm font-semibold text-red-800">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Repository</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search repository..."
              className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 w-64 bg-white dark:bg-slate-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={fetchItems}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-slate-300"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-slate-300">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">No items found</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
              <tr>
                <th className="px-6 py-4">Asset Name</th>
                <th className="px-6 py-4">Created Date</th>
                <th className="px-6 py-4">Languages</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {item.lang}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {item.size}
                  </td>
                  <td className="px-6 py-4 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleDownload(item.id, item.name)}
                      disabled={downloading === item.id}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Download"
                    >
                      {downloading === item.id ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Download className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deleting === item.id}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === item.id ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Repository;
