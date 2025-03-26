import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../contexts/DashboardContext';
import { AlertCircle } from 'lucide-react';

const GdpDataComponent = () => {
  const { gdpData, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>GDP Data</CardTitle>
          <CardDescription>Loading GDP data from database...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-72">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !gdpData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-500">
            <AlertCircle className="w-5 h-5 mr-2" />
            Error Loading GDP Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            {error || "Could not load GDP data. Please try again later."}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform API data for the chart
  const chartData = gdpData.map(item => ({
    year: item.year.toString(),
    gdp: parseFloat(item.value),
    forecast: item.is_forecast
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Duisburg GDP Trend</CardTitle>
        <CardDescription>Historical GDP data with forecast based on current economic parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis 
                tickFormatter={(value) => `€${value}B`}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip 
                formatter={(value) => [`€${value}B`, 'GDP']}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="gdp" 
                name="GDP (billions €)" 
                fill="#8884d8"
                fillOpacity={(entry) => entry.forecast ? 0.6 : 1}
                stroke="#8884d8"
                strokeWidth={(entry) => entry.forecast ? 2 : 0}
                strokeDasharray={(entry) => entry.forecast ? "5 5" : "0"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Duisburg has been experiencing {getGdpTrend(chartData)} economic growth over recent years.
            As one of Germany's important industrial and logistics hubs, Duisburg benefits from its 
            strategic location and role as a crucial node in trade networks.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to analyze GDP trend
const getGdpTrend = (data) => {
  if (!data || data.length < 2) return "steady";
  
  // Filter out forecast data
  const historicalData = data.filter(item => !item.forecast);
  
  if (historicalData.length < 2) return "steady";
  
  // Calculate average growth
  let totalGrowth = 0;
  for (let i = 1; i < historicalData.length; i++) {
    const growthRate = (historicalData[i].gdp / historicalData[i-1].gdp) - 1;
    totalGrowth += growthRate;
  }
  
  const avgGrowth = totalGrowth / (historicalData.length - 1);
  
  if (avgGrowth > 0.02) return "strong";
  if (avgGrowth > 0) return "moderate";
  if (avgGrowth > -0.01) return "steady";
  return "declining";
};

export default GdpDataComponent; 