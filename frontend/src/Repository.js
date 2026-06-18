import React, { useState } from 'react';
import { Search, Filter, Video, Download, Trash2, Eye } from 'lucide-react';

const MOCK_REPO = [
  { id: '1', name: 'intro_video_v1.mp4', date: '2023-10-20', lang: 'Hindi → Marathi', size: '156 MB' },
  { id: '2', name: 'crop_rotation_tutorial.mp4', date: '2023-10-18', lang: 'Hindi → Marathi', size: '210 MB' },
  { id: '3', name: 'water_management.mp3', date: '2023-10-15', lang: 'Marathi → Hindi', size: '45 MB' },
];

const Repository = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = MOCK_REPO.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-slate-300">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

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
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <Video className="w-4 h-4 text-blue-500 dark:text-blue-400" /> {item.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.date}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{item.lang}</td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.size}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-3 justify-end">
                    <button className="text-slate-400 hover:text-blue-600 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors" title="Download"><Download className="w-4 h-4" /></button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400">
            No items found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default Repository;