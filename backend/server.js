const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load routes from ./routes/*
const routesDir = path.join(__dirname, 'routes');
if (fs.existsSync(routesDir)) {
  const routeFiles = fs.readdirSync(routesDir).filter(file => file.endsWith('.js'));
  
  routeFiles.forEach(file => {
    const routePath = path.join(routesDir, file);
    const route = require(routePath);
    
    // Use route with base path from filename (e.g., auth.js -> /api/auth)
    const basePath = `/api/${file.replace('.js', '')}`;
    app.use(basePath, route);
  });
}

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('Server running');
});

module.exports = app;

