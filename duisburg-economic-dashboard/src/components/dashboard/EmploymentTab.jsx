import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { dashboardData } from '../../data/dashboardData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function EmploymentTab() {
  const { employment } = dashboardData;
  
  // Unemployment trend chart data
  const unemploymentChartData = {
    labels: employment.years,
    datasets: [
      {
        label: 'Unemployment Rate (%)',
        data: employment.unemploymentRates,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
      },
      {
        label: 'National Average (%)',
        data: employment.nationalUnemploymentRates,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.2,
      },
    ],
  };
  
  // Employment by sector doughnut chart
  const sectorChartData = {
    labels: Object.keys(employment.sectorDistribution),
    datasets: [
      {
        data: Object.values(employment.sectorDistribution),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Employment Statistics
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current Employment Statistics */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Current Employment" sx={{ bgcolor: 'primary.light', color: 'white' }} />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                <strong>Labor Force:</strong> {employment.laborForce.toLocaleString()} people
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Employed:</strong> {employment.employed.toLocaleString()} people
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Unemployed:</strong> {employment.unemployed.toLocaleString()} people
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Current Unemployment Rate:</strong> {employment.currentUnemploymentRate}%
              </Typography>
              <Typography variant="body2">
                <strong>Youth Unemployment Rate:</strong> {employment.youthUnemploymentRate}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Employment by Sector Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom align="center">
              Employment by Sector
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut 
                data={sectorChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* Unemployment Trend Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Unemployment Rate Trend vs. National Average
            </Typography>
            <Line 
              data={unemploymentChartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'Unemployment Rate (%)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Year'
                    }
                  }
                }
              }}
            />
          </Paper>
        </Grid>
        
        {/* Top Employers Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Employers in Duisburg
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Company</strong></TableCell>
                    <TableCell><strong>Sector</strong></TableCell>
                    <TableCell align="right"><strong>Employees</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employment.topEmployers.map((employer) => (
                    <TableRow key={employer.name}>
                      <TableCell>{employer.name}</TableCell>
                      <TableCell>{employer.sector}</TableCell>
                      <TableCell align="right">{employer.employees.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmploymentTab;
