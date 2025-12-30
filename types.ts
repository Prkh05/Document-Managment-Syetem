
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface DocumentVersion {
  id: string;
  version: number;
  timestamp: string;
  updatedBy: string;
  fileSize: number;
  changeNote: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  tags: string[];
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  mimeType: string;
  currentVersion: number;
  versions: DocumentVersion[];
  permissions: {
    userId: string;
    level: 'read' | 'write' | 'admin';
  }[];
  contentSnippet?: string; // Used for AI search simulation
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
