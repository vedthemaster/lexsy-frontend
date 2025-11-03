# Lexsy Frontend

A modern React-based frontend for the Lexsy legal document assistant application.

## Features

- **Document Upload**: Drag-and-drop or click to upload .docx legal document templates
- **AI-Powered Parsing**: Automatically identifies dynamic placeholders in documents
- **Conversational Interface**: Chat-based experience to fill in document placeholders
- **Real-time Progress**: Visual indicators showing completion status
- **Document Generation**: Download completed documents as .docx files

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend server running on `http://localhost:8000`

### Installation

```bash
cd Frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
Frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.tsx      # Main app layout
│   │   └── FileUpload.tsx  # File upload component
│   ├── pages/              # Page components
│   │   ├── UploadPage.tsx        # Document upload page
│   │   └── ConversationPage.tsx  # Chat interface page
│   ├── services/           # API services
│   │   └── api.ts          # API client
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

## API Integration

The frontend communicates with the backend API through:

- `POST /api/documents/upload` - Upload a document
- `POST /api/placeholders/start` - Start a filling session
- `POST /api/placeholders/continue` - Continue the conversation
- `POST /api/documents/generate` - Generate the filled document

All requests are proxied through Vite's dev server to `http://localhost:8000`

## Key Components

### UploadPage

The initial page where users upload their .docx document template. Features:

- Drag-and-drop interface
- File validation
- Loading states
- Error handling

### ConversationPage

The main chat interface where users fill in placeholders:

- Message display area
- Input field with send button
- Progress indicators
- Download button when all placeholders are filled
- Keyboard shortcuts (Enter to send)

### FileUpload

Reusable component for file selection:

- Drag-and-drop support
- Click to browse
- Visual feedback during interactions
- Loading states

## Styling

The app uses Tailwind CSS for styling with:

- Responsive design
- Dark mode support
- Modern gradient backgrounds
- Smooth transitions and animations
- Accessible color schemes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Document preview before download
- Placeholder editing history
- Multiple document templates
- User authentication
- Document templates library
- PDF export option
