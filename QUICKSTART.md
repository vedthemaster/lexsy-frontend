# Quick Start Guide

## Installation & Setup

1. **Install dependencies:**
   ```bash
   cd Frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Make sure your backend is running:**
   ```bash
   # In the Backend directory
   python main.py
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## How to Use

1. **Upload a Document:**
   - On the home page, drag and drop a `.docx` file or click to browse
   - Wait for the document to be processed

2. **Fill Placeholders:**
   - You'll be redirected to the conversation page
   - The AI will ask you questions about the placeholders in your document
   - Answer each question naturally

3. **Download Completed Document:**
   - Once all placeholders are filled, click "Download Completed Document"
   - Your filled `.docx` file will be saved to your computer

## Troubleshooting

### Port already in use
If port 3000 is taken, Vite will automatically try the next available port (3001, 3002, etc.)

### Backend connection error
- Ensure the backend is running on `http://localhost:8000`
- Check that CORS is configured correctly in the backend
- Try restarting both frontend and backend servers

### Module not found errors
- Delete `node_modules` folder
- Run `npm install` again

## Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory. You can serve these with any static file server.

