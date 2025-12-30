
import React from 'react';
import { Document, UserRole } from '../types';
import { CATEGORIES } from '../constants';

interface DocumentCardProps {
  doc: Document;
  onViewVersions: (doc: Document) => void;
  onDelete: (id: string) => void;
  userRole: UserRole;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc, onViewVersions, onDelete, userRole }) => {
  const category = CATEGORIES.find(c => c.id === doc.category) || CATEGORIES[0];
  
  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  const canEdit = userRole !== UserRole.VIEWER;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${category.color}`}>
          <span className="text-xl">{category.icon}</span>
        </div>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onViewVersions(doc)}
            title="Version History"
            className="p-1.5 hover:bg-slate-100 rounded text-slate-500"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
          {canEdit && (
            <button 
              onClick={() => onDelete(doc.id)}
              className="p-1.5 hover:bg-red-50 rounded text-red-500"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-slate-800 truncate mb-1" title={doc.name}>{doc.name}</h3>
      <div className="flex flex-wrap gap-1 mb-3">
        {doc.tags.map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-3">
        <span className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {new Date(doc.updatedAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          {formatSize(doc.fileSize)}
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
