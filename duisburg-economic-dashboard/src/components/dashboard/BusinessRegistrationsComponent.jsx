import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../contexts/DashboardContext';
import { AlertCircle } from 'lucide-react';

const BusinessRegistrationsComponent = () => {
  const { businessRegistrationsData, isLoading, error } = useDashboard();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Business Registrations</CardTitle>
          <CardDescription>Loading business data from database...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-72">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !businessRegistrationsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-500">
            <AlertCircle className="w-5 h-5 mr-2" />
            Error Loading Business Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600">
            {error || "Could not load business registrations data. Please try again later."}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Transform API data for the chart
  const chartData = businessRegistrationsData.map(item => ({
    year: item.year.toString(),
    registrations: parseInt(item.registrations),
    deregistrations: parseInt(item.deregistrations),
    netChange: parseInt(item.registrations) - parseInt(item.deregistrations)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Registration Trends</CardTitle>
        <CardDescription>Annual business registrations and deregistrations in Duisburg</CardDescription>
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" name="New Registrations" fill="#82ca9d" />
              <Bar dataKey="deregistrations" name="Deregistrations" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p className="mb-2">
            The data shows {getBusinessTrend(chartData)} in Duisburg over the analyzed period.
          </p>
          {getLatestBusinessStats(chartData)}
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to analyze business registration trends
const getBusinessTrend = (data) => {
  if (!data || data.length < 2) return "a stable business environment";
  
  // Calculate net changes
  const netChanges = data.map(item => item.netChange);
  
  // Count positive and negative net changes
  const positiveChanges = netChanges.filter(change => change > 0).length;
  const negativeChanges = netChanges.filter(change => change < 0).length;
  
  // Calculate the overall trend
  const positiveRatio = positiveChanges / netChanges.length;
  
  if (positiveRatio > 0.75) return "a strongly growing business environment";
  if (positiveRatio > 0.5) return "a moderately growing business environment";
  if (positiveRatio > 0.4) return "a relatively stable business environment";
  return "challenging conditions for business growth";
};

// Get latest stats from the data
const getLatestBusinessStats = (data) => {
  if (!data || data.length === 0) return null;
  
  // Get the latest year's data
  const latestData = data[data.length - 1];
  
  // Compare with previous year if available
  let yearOverYearChange = null;
  if (data.length > 1) {
    const previousYear = data[data.length - 2];
    yearOverYearChange = latestData.netChange - previousYear.netChange;
  }
  
  return (
    <>
      <p className="mb-2">
        <strong>Latest statistics ({latestData.year}):</strong>
      </p>
      <ul className="list-disc list-inside">
        <li>New business registrations: {latestData.registrations}</li>
        <li>Business deregistrations: {latestData.deregistrations}</li>
        <li>Net change: {latestData.netChange > 0 ? "+" : ""}{latestData.netChange}</li>
        {yearOverYearChange !== null && (
          <li>
            Year-over-year change in net registrations: {yearOverYearChange > 0 ? "+" : ""}{yearOverYearChange} 
            ({yearOverYearChange > 0 ? "improvement" : "decline"})
          </li>
        )}
      </ul>
    </>
  );
};

export default BusinessRegistrationsComponent; 