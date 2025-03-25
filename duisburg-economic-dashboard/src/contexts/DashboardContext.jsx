import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const DashboardContext = createContext();

// Custom hook for using the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  // State for scenario modeling
  const [interestRateChange, setInterestRateChange] = useState(0);
  const [populationGrowthRate, setPopulationGrowthRate] = useState(0.5);
  const [digitalInvestment, setDigitalInvestment] = useState(0);
  const [selectedCity, setSelectedCity] = useState('duisburg');
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictionYears, setPredictionYears] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for dashboard data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Reset parameters function
  const resetParameters = () => {
    setInterestRateChange(0);
    setPopulationGrowthRate(0.5);
    setDigitalInvestment(0);
    setPredictionYears(3);
  };

  // Simulate data loading on initial render
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  }, []);

  // Calculate dashboard state when parameters change
  useEffect(() => {
    // This would typically contain logic to recalculate forecasts
    // or fetch new data based on parameter changes
    
    // For now, we'll just update the lastUpdated timestamp
    setLastUpdated(new Date());
  }, [interestRateChange, populationGrowthRate, digitalInvestment, predictionYears]);

  // Export the context values
  const value = {
    // Control parameters
    interestRateChange,
    setInterestRateChange,
    populationGrowthRate,
    setPopulationGrowthRate,
    digitalInvestment,
    setDigitalInvestment,
    selectedCity,
    setSelectedCity,
    showPredictions,
    setShowPredictions,
    predictionYears,
    setPredictionYears,
    
    // UI state
    activeTab,
    setActiveTab,
    isLoading,
    error,
    lastUpdated,
    
    // Actions
    resetParameters,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext; 