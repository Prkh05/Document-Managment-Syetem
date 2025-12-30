
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../types';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'My Documents', path: '/documents', icon: '📁' },
    { name: 'Recent', path: '/recent', icon: '🕒' },
    { name: 'Shared', path: '/shared', icon: '🤝' },
    { name: 'Trash', path: '/trash', icon: '🗑️' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center space-x-3 text-white mb-8">
          <div className="p-2 bg-blue-600 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">AI DMS</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3 p-2">
          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
