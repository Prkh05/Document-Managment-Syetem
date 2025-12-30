
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DocumentLibrary from './pages/DocumentLibrary';
import Login from './pages/Login';
import { User, Document, UserRole } from './types';
import { MOCK_USERS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial data load simulation
    const storedDocs = localStorage.getItem('dms_docs');
    if (storedDocs) {
      setDocuments(JSON.parse(storedDocs));
    }
    const storedUser = localStorage.getItem('dms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('dms_docs', JSON.stringify(documents));
  }, [documents]);

  const handleLogin = (email: string) => {
    const foundUser = MOCK_USERS.find(u => u.email === email) as User;
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('dms_user', JSON.stringify(foundUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('dms_user');
  };

  if (isLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <HashRouter>
      {!user ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar user={user} />
          <div className="flex-1 flex flex-col min-w-0">
            <Header user={user} onLogout={handleLogout} />
            <main className="flex-1 overflow-y-auto p-4 md:p-8">
              <Routes>
                <Route path="/" element={<Dashboard documents={documents} />} />
                <Route 
                  path="/documents" 
                  element={<DocumentLibrary 
                    documents={documents} 
                    setDocuments={setDocuments} 
                    user={user} 
                  />} 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </HashRouter>
  );
};

export default App;
