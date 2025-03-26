const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/db');

// Import routes
const economicDataRoutes = require('./routes/economic-data');
const businessRegistrationsRoutes = require('./routes/business-registrations');
const commutersRoutes = require('./routes/commuters');
const businessRegisterRoutes = require('./routes/business-register');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
testConnection();

// Define Routes
app.use('/api/economic-data', economicDataRoutes);
app.use('/api/business-registrations', businessRegistrationsRoutes);
app.use('/api/commuters', commutersRoutes);
app.use('/api/business-register', businessRegisterRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Duisburg Economic Dashboard API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Set port and start server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at:`);
  console.log(`- Economic Data: http://localhost:${PORT}/api/economic-data`);
  console.log(`- Business Registrations: http://localhost:${PORT}/api/business-registrations`);
  console.log(`- Commuters: http://localhost:${PORT}/api/commuters`);
  console.log(`- Business Register: http://localhost:${PORT}/api/business-register`);
});

module.exports = app; 