
import React, { useState } from 'react';
import { Document, User, UserRole, DocumentVersion } from '../types';
import DocumentCard from '../components/DocumentCard';
import { CATEGORIES } from '../constants';
import { getSmartTags } from '../services/geminiService';

interface LibraryProps {
  documents: Document[];
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>;
  user: User;
}

const DocumentLibrary: React.FC<LibraryProps> = ({ documents, setDocuments, user }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocForVersions, setSelectedDocForVersions] = useState<Document | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate smart tagging with Gemini
    const aiTags = await getSmartTags(file.name);

    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      category: 'technical', // Default, could be AI inferred too
      tags: aiTags,
      ownerId: user.id,
      ownerName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      fileSize: file.size,
      mimeType: file.type,
      currentVersion: 1,
      versions: [{
        id: 'v1',
        version: 1,
        timestamp: new Date().toISOString(),
        updatedBy: user.name,
        fileSize: file.size,
        changeNote: 'Initial upload'
      }],
      permissions: [{ userId: user.id, level: 'admin' }]
    };

    setDocuments(prev => [newDoc, ...prev]);
    setIsUploading(false);
    // Clear input
    e.target.value = '';
  };

  const deleteDocument = (id: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(d => d.id !== id));
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Document Library</h1>
          <p className="text-slate-500 text-sm">Manage and organize your organization's digital assets.</p>
        </div>
        
        {user.role !== UserRole.VIEWER && (
          <div className="relative">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg cursor-pointer transition-all shadow-md active:scale-95 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            >
              {isUploading ? (
                <span className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>AI Tagging...</span>
                </span>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <span className="font-semibold">Upload Document</span>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or tags..."
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <button 
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterCategory === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filterCategory === cat.id ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocs.map(doc => (
          <DocumentCard 
            key={doc.id} 
            doc={doc} 
            userRole={user.role} 
            onDelete={deleteDocument}
            onViewVersions={setSelectedDocForVersions}
          />
        ))}
        {filteredDocs.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <div className="text-4xl mb-4">📭</div>
            <p className="text-slate-500 font-medium">No documents found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Version History Modal */}
      {selectedDocForVersions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Version History</h2>
                <p className="text-sm text-slate-500 truncate max-w-sm">{selectedDocForVersions.name}</p>
              </div>
              <button 
                onClick={() => setSelectedDocForVersions(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {selectedDocForVersions.versions.slice().reverse().map((v, i) => (
                  <div key={v.id} className="flex items-start space-x-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      v{v.version}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-800">{v.changeNote}</span>
                        <span className="text-xs text-slate-400 font-medium">{new Date(v.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-500">Updated by <span className="font-medium text-slate-700">{v.updatedBy}</span> • {(v.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    {i === 0 && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase">Current</span>}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedDocForVersions(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentLibrary;
