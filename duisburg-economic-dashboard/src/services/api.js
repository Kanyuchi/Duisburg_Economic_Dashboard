import axios from 'axios';

// Base URL for API - will be our local server
const API_BASE_URL = 'http://localhost:3001/api';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  }
});

// Add a request interceptor to add timestamp for cache busting
apiClient.interceptors.request.use((config) => {
  // Add a timestamp to GET requests to prevent caching
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
  }
  return config;
});

// API service object with methods for each endpoint
const apiService = {
  // Economic data endpoints
  economicData: {
    getGDP: async () => {
      try {
        const response = await apiClient.get('/economic-data/gdp');
        return response.data;
      } catch (error) {
        console.error('Error fetching GDP data:', error);
        throw error;
      }
    },
    
    getInflationRates: async () => {
      try {
        const response = await apiClient.get('/economic-data/inflation');
        return response.data;
      } catch (error) {
        console.error('Error fetching inflation data:', error);
        throw error;
      }
    }
  },
  
  // Business registrations endpoints
  businessRegistrations: {
    getAll: async () => {
      try {
        const response = await apiClient.get('/business-registrations');
        return response.data;
      } catch (error) {
        console.error('Error fetching business registrations:', error);
        throw error;
      }
    },
    
    getByYear: async (year) => {
      try {
        const response = await apiClient.get(`/business-registrations/year/${year}`);
        return response.data;
      } catch (error) {
        console.error(`Error fetching business registrations for year ${year}:`, error);
        throw error;
      }
    }
  },
  
  // Commuters endpoints
  commuters: {
    getBySector: async () => {
      try {
        const response = await apiClient.get('/commuters/by-sector');
        return response.data;
      } catch (error) {
        console.error('Error fetching commuters by sector:', error);
        throw error;
      }
    },
    
    getByDirection: async () => {
      try {
        const response = await apiClient.get('/commuters/by-direction');
        return response.data;
      } catch (error) {
        console.error('Error fetching commuters by direction:', error);
        throw error;
      }
    }
  },
  
  // Business register endpoints
  businessRegister: {
    getEmployees: async () => {
      try {
        const response = await apiClient.get('/business-register/employees');
        return response.data;
      } catch (error) {
        console.error('Error fetching business register employees:', error);
        throw error;
      }
    },
    
    getByIndustry: async () => {
      try {
        const response = await apiClient.get('/business-register/by-industry');
        return response.data;
      } catch (error) {
        console.error('Error fetching business register by industry:', error);
        throw error;
      }
    }
  }
};

export default apiService; 