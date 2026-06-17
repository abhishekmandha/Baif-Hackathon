# Frontend React Project

This is a manually configured React project using Webpack and Babel.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── index.css
│   └── App.js
├── package.json
├── webpack.config.js
├── .babelrc
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode with hot reload
- `npm run dev` - Alternative command to run development server
- `npm run build` - Builds the app for production to the `dist/` folder

## Technologies Used

- **React 18.2.0**: JavaScript library for building user interfaces
- **Webpack 5**: Module bundler
- **Babel 7**: JavaScript transpiler
- **Webpack Dev Server**: Development server with hot reload support
- **CSS Loader**: CSS support for webpack

## Project Features

- ✓ ES6+ JavaScript support via Babel
- ✓ React JSX transformation
- ✓ CSS import and styling
- ✓ Hot Module Replacement (HMR)
- ✓ Development and production builds
- ✓ HTML template generation

## Next Steps

1. Edit `src/App.js` to modify your component
2. Add more components to the `src/` directory
3. Import and use them in your app
4. Styles can be added via CSS files or CSS-in-JS solutions

Enjoy building with React! 🚀
