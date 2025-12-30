# AI-Enhanced Document Management System (DMS)

A high-performance, intelligent Document Management System featuring AI-assisted tagging, semantic search, version control, and robust Role-Based Access Control (RBAC).

## 🚀 Project Overview

This system is designed to streamline organizational workflows by providing a secure and smart vault for digital assets. Leveraging the Google Gemini 2.0/3.0 models, the system automatically categorizes uploads and provides intelligent insights into document content.

### Core Features
- **Smart Upload**: Automatic AI-generated tags and metadata extraction.
- **Advanced Dashboard**: Real-time analytics of storage usage and document distribution.
- **Version Control**: Full audit trail with the ability to track changes and timestamps.
- **RBAC Security**: Granular permissions for Admin, Editor, and Viewer roles.
- **Responsive UI**: Fluid experience across mobile, tablet, and desktop.
- **AI Semantic Search**: Find documents based on meaning, not just filenames.

## 🛠 Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Routing**: React Router 7
- **Charts**: Recharts (D3-based data visualization)
- **AI Engine**: Google Gemini API (@google/genai)
- **Storage**: Browser LocalStorage (Persistence simulation)

## 📋 Prerequisites

To run this project locally, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **Browser**: Modern browser with ES6 module support (Chrome, Firefox, Edge, Safari)
- **API Key**: A valid Google Gemini API Key 
## ⚙️ Step-by-Step Setup

1. **Clone the Repository** (or download the source):
   ```bash
   git clone <repository-url>
   cd dms-project
   ```

2. **Environment Configuration**:
   Create a `.env` file in the root directory (or ensure the environment variable is available in your shell):
   ```env
   API_KEY=your_google_gemini_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## 🏃 How to Run

### Development Mode
Runs the app with hot-reloading:
```bash
npm run dev
```

### Production Build
Builds the app for production:
```bash
npm run build
```

## 🔐 Default Login Credentials

The system uses a simulation-based authentication system. Use the following corporate emails to access different permission levels:

| Role | Email | Permissions |
| :--- | :--- | :--- |
| **Admin** | `alex@org.com` | Full access: Upload, Delete, Share, System Settings |
| **Editor** | `jordan@org.com` | Document Management: Upload, Edit metadata, View |
| **Viewer** | `taylor@org.com` | Read-only access: View documents and versions |

*Note: Any password will work as the system is currently integrated with a Mock SSO provider.*

## 📂 Database Schema (Simulation)

The system manages data using the following structured interfaces:

- **Document**: Stores core metadata, tags, and category references.
- **Version**: A linked list of document states with timestamps and uploader IDs.
- **User**: Identity object containing role assignments and profile info.

## 🤖 AI Features Documentation

### Smart Tagging
When a file is uploaded, the system sends the filename and content snippet to `gemini-3-flash-preview`. The model returns a set of relevant tags to improve searchability.

### Semantic Search
The search bar uses the `semanticSearch` service to interpret user intent. Instead of simple string matching, it evaluates the relevance of the query against the entire document library's metadata.

---
