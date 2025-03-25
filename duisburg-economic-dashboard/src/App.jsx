import React from 'react';
import DuisburgDashboard from './components/dashboard/DuisburgDashboard';
import { DashboardProvider } from './contexts/DashboardContext';

function App() {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <DuisburgDashboard />
      </div>
    </DashboardProvider>
  );
}

export default App;
