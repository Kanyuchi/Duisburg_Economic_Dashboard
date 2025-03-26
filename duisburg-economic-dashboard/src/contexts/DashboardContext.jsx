import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

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
  
  // Data state from API
  const [gdpData, setGdpData] = useState(null);
  const [businessRegistrationsData, setBusinessRegistrationsData] = useState(null);
  const [commutersBySectorData, setCommutersBySectorData] = useState(null);
  const [businessRegisterEmployeesData, setBusinessRegisterEmployeesData] = useState(null);

  // Reset parameters function
  const resetParameters = () => {
    setInterestRateChange(0);
    setPopulationGrowthRate(0.5);
    setDigitalInvestment(0);
    setPredictionYears(3);
  };

  // Fetch data from API
  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch data in parallel
      const [
        gdpResponse,
        businessRegistrationsResponse,
        commutersBySectorResponse,
        businessRegisterEmployeesResponse
      ] = await Promise.all([
        apiService.economicData.getGDP(),
        apiService.businessRegistrations.getAll(),
        apiService.commuters.getBySector(),
        apiService.businessRegister.getEmployees()
      ]);
      
      // Update state with fetched data
      setGdpData(gdpResponse);
      setBusinessRegistrationsData(businessRegistrationsResponse);
      setCommutersBySectorData(commutersBySectorResponse);
      setBusinessRegisterEmployeesData(businessRegisterEmployeesResponse);
      
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to fetch dashboard data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
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
    
    // API data
    gdpData,
    businessRegistrationsData,
    commutersBySectorData,
    businessRegisterEmployeesData,
    
    // Actions
    resetParameters,
    refreshData: fetchDashboardData
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext; 