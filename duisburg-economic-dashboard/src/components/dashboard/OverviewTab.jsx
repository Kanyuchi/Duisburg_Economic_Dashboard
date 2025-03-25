import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  CardHeader 
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { dashboardData } from '../../data/dashboardData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function OverviewTab() {
  const { overview } = dashboardData;
  
  const gdpChartData = {
    labels: overview.gdpYears,
    datasets: [
      {
        label: 'GDP (in billions €)',
        data: overview.gdpValues,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const gdpChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Duisburg GDP Trend',
      },
    },
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Economic Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Key Indicators */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Key Indicators" sx={{ bgcolor: 'primary.light', color: 'white' }} />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                <strong>Population:</strong> {overview.population.toLocaleString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>GDP:</strong> €{overview.currentGDP} billion
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Unemployment Rate:</strong> {overview.unemploymentRate}%
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Inflation Rate:</strong> {overview.inflationRate}%
              </Typography>
              <Typography variant="body2">
                <strong>Average Income:</strong> €{overview.averageIncome.toLocaleString()} per year
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* GDP Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Bar data={gdpChartData} options={gdpChartOptions} />
          </Paper>
        </Grid>
        
        {/* Economic Summary */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Economic Summary
            </Typography>
            <Typography variant="body2" paragraph>
              Duisburg has been experiencing steady economic growth over the past several years, with its GDP 
              increasing by approximately {overview.gdpGrowthRate}% annually. As one of Germany's important 
              industrial and logistics hubs, Duisburg benefits from its strategic location at the confluence 
              of the Rhine and Ruhr rivers.
            </Typography>
            <Typography variant="body2" paragraph>
              The city is home to Europe's largest inland port and serves as a crucial node in the 
              New Silk Road initiative connecting Europe to Asia. This has attracted significant 
              international investment, particularly from Chinese companies.
            </Typography>
            <Typography variant="body2">
              Key sectors driving Duisburg's economy include logistics, steel production, and increasingly, 
              digital services and technology. The unemployment rate has been steadily decreasing, 
              though it remains slightly above the national average.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OverviewTab;
