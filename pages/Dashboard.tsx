
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Document } from '../types';
import { CATEGORIES } from '../constants';

interface DashboardProps {
  documents: Document[];
}

const Dashboard: React.FC<DashboardProps> = ({ documents }) => {
  const stats = [
    { label: 'Total Documents', value: documents.length, icon: '📄', color: 'bg-blue-500' },
    { label: 'Total Storage', value: `${(documents.reduce((acc, doc) => acc + doc.fileSize, 0) / (1024 * 1024)).toFixed(1)} MB`, icon: '💾', color: 'bg-purple-500' },
    { label: 'Active Versions', value: documents.reduce((acc, doc) => acc + doc.versions.length, 0), icon: '🔄', color: 'bg-emerald-500' },
    { label: 'Collaborators', value: 12, icon: '👥', color: 'bg-orange-500' },
  ];

  const chartData = CATEGORIES.map(cat => ({
    name: cat.name,
    count: documents.filter(doc => doc.category === cat.id).length,
    color: '#3b82f6'
  })).filter(d => d.count > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">System Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's a summary of your organization's assets.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`h-2 w-2 rounded-full ${stat.color}`}></span>
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Documents by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORIES.find(c => c.name === entry.name)?.color.includes('emerald') ? '#10b981' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {documents.slice(0, 5).map((doc, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{doc.ownerName} updated <span className="text-blue-600 cursor-pointer hover:underline">{doc.name}</span></p>
                  <p className="text-xs text-slate-500">{new Date(doc.updatedAt).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
            {documents.length === 0 && <p className="text-slate-400 text-sm italic">No recent activity found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
