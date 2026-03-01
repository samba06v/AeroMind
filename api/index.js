// Vercel Serverless Function Entry Point
const path = require('path');

// This will serve the built application
module.exports = async (req, res) => {
  // For API routes, we need to handle them separately
  if (req.url.startsWith('/api/')) {
    // Import and use your Express app
    const app = require('../dist/index.cjs');
    return app(req, res);
  }
  
  // For all other routes, serve the static files
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('AeroMind Nexus is running!');
};
