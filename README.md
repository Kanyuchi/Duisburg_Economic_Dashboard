# Duisburg Economic Dashboard

## Project Overview
A data visualization dashboard for economic indicators in Duisburg, featuring interactive charts and statistics on employment, industrial production, and trade data.

## Project Structure
- `duisburg-economic-dashboard/` - React frontend application
- `server/` - Node.js/Express backend API

## Environment Setup
- **Frontend**: React application
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
  - Database Name: `DBI_Strategy_DB`
  - Default User: `postgres`
  - Default Port: `5432`

### Environment Variables
This project uses environment variables for configuration. To set up your environment:

1. Copy the example environment files:
   ```
   cp server/.env.example server/.env
   cp duisburg-economic-dashboard/server/.env.example duisburg-economic-dashboard/server/.env
   ```
2. Update the `.env` files with your actual configuration values.

**Note**: Never commit `.env` files containing actual credentials to Git.

## Current Status
- ✅ Project structure created
- ✅ React frontend components set up
- ✅ Backend server structure created
- ✅ Node.js and npm installed
- ✅ Database schema created
- ✅ Data import completed
- ✅ API endpoints implemented
- ⬜ Frontend-API connection refinement in progress

## API Endpoints
The following endpoints are available:
- `http://localhost:3003/api/gdp` - GDP data
- `http://localhost:3003/api/business-registrations` - Business registrations
- `http://localhost:3003/api/commuters` - Commuter data

## Development Setup
1. Install dependencies:
   ```
   # In the root server directory
   cd server
   npm install
   
   # In the frontend directory
   cd duisburg-economic-dashboard
   npm install
   ```

2. Set up environment variables (see above)

3. Start the backend server:
   ```
   cd server
   npm start
   ```

4. Start the frontend development server:
   ```
   cd duisburg-economic-dashboard
   npm start
   ```

## Collaboration Guidelines
- Always check the project structure before making changes
- Verify existing files before creating new configurations
- Never commit sensitive information (passwords, API keys, etc.)
- Run database initialization scripts if working with a fresh clone
- Follow existing code style and conventions 