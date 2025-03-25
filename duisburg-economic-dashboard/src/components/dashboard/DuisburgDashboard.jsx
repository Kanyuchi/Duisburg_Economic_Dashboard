import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, Line, Area, AreaChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Treemap, ReferenceLine } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Briefcase, Users, TrendingUp, Building, Home, AlertCircle, HelpCircle, TrendingDown, BarChart3, Compass } from 'lucide-react';

const DuisburgDashboard = () => {
  // State for scenario modeling
  const [interestRateChange, setInterestRateChange] = useState(0);
  const [populationGrowthRate, setPopulationGrowthRate] = useState(0.5);
  const [digitalInvestment, setDigitalInvestment] = useState(0);
  const [selectedCity, setSelectedCity] = useState('duisburg');
  const [showPredictions, setShowPredictions] = useState(true);
  const [predictionYears, setPredictionYears] = useState(3);

  // City comparison data
  const comparableCities = [
    { id: 'duisburg', name: 'Duisburg' },
    { id: 'dortmund', name: 'Dortmund' },
    { id: 'essen', name: 'Essen' },
    { id: 'bochum', name: 'Bochum' },
    { id: 'muenster', name: 'Münster' }
  ];

  const cityComparisonData = {
    population: [
      { name: 'Duisburg', value: 503707, change: 0.6, trend: 'up' },
      { name: 'Dortmund', value: 588250, change: 0.4, trend: 'up' },
      { name: 'Essen', value: 579432, change: 0.2, trend: 'up' },
      { name: 'Bochum', value: 364628, change: -0.1, trend: 'down' },
      { name: 'Münster', value: 315293, change: 1.2, trend: 'up' },
    ],
    rent: [
      { name: 'Duisburg', value: 9.5, change: 2.2, trend: 'up' },
      { name: 'Dortmund', value: 10.3, change: 3.0, trend: 'up' },
      { name: 'Essen', value: 10.6, change: 2.9, trend: 'up' },
      { name: 'Bochum', value: 9.7, change: 2.1, trend: 'up' },
      { name: 'Münster', value: 12.8, change: 3.4, trend: 'up' },
    ],
    unemployment: [
      { name: 'Duisburg', value: 12.8, change: 0.2, trend: 'up', benchmark: 'above' },
      { name: 'Dortmund', value: 10.9, change: 0.1, trend: 'up', benchmark: 'above' },
      { name: 'Essen', value: 11.2, change: 0.0, trend: 'steady', benchmark: 'above' },
      { name: 'Bochum', value: 9.6, change: -0.3, trend: 'down', benchmark: 'above' },
      { name: 'Münster', value: 5.7, change: -0.2, trend: 'down', benchmark: 'below' },
    ],
    ictAdoption: [
      { name: 'Duisburg', value: 19.6, change: 1.8, trend: 'up', benchmark: 'below' },
      { name: 'Dortmund', value: 24.3, change: 2.1, trend: 'up', benchmark: 'above' },
      { name: 'Essen', value: 22.7, change: 1.9, trend: 'up', benchmark: 'average' },
      { name: 'Bochum', value: 20.5, change: 2.2, trend: 'up', benchmark: 'average' },
      { name: 'Münster', value: 27.8, change: 2.6, trend: 'up', benchmark: 'above' },
    ]
  };

  // Base data
  const populationData = [
    { year: 2016, population: 498500 },
    { year: 2017, population: 496769 },
    { year: 2018, population: 497248 },
    { year: 2019, population: 497343 },
    { year: 2020, population: 494544 },
    { year: 2021, population: 493813 },
    { year: 2022, population: 500857 },
    { year: 2023, population: 503707 }
  ];

  // Sample real estate data
  const realEstatePriceData = [
    { year: 2019, quarter: 'Q1', apartmentRent: 6.9, housePrice: 1850, landPrice: 230 },
    { year: 2019, quarter: 'Q2', apartmentRent: 7.0, housePrice: 1880, landPrice: 235 },
    { year: 2019, quarter: 'Q3', apartmentRent: 7.2, housePrice: 1920, landPrice: 240 },
    { year: 2019, quarter: 'Q4', apartmentRent: 7.3, housePrice: 1950, landPrice: 245 },
    { year: 2020, quarter: 'Q1', apartmentRent: 7.4, housePrice: 1990, landPrice: 250 },
    { year: 2020, quarter: 'Q2', apartmentRent: 7.5, housePrice: 2030, landPrice: 255 },
    { year: 2020, quarter: 'Q3', apartmentRent: 7.6, housePrice: 2070, landPrice: 260 },
    { year: 2020, quarter: 'Q4', apartmentRent: 7.7, housePrice: 2110, landPrice: 265 },
    { year: 2021, quarter: 'Q1', apartmentRent: 7.8, housePrice: 2170, landPrice: 270 },
    { year: 2021, quarter: 'Q2', apartmentRent: 7.9, housePrice: 2230, landPrice: 275 },
    { year: 2021, quarter: 'Q3', apartmentRent: 8.1, housePrice: 2290, landPrice: 280 },
    { year: 2021, quarter: 'Q4', apartmentRent: 8.2, housePrice: 2360, landPrice: 290 },
    { year: 2022, quarter: 'Q1', apartmentRent: 8.3, housePrice: 2450, landPrice: 300 },
    { year: 2022, quarter: 'Q2', apartmentRent: 8.5, housePrice: 2540, landPrice: 310 },
    { year: 2022, quarter: 'Q3', apartmentRent: 8.7, housePrice: 2630, landPrice: 320 },
    { year: 2022, quarter: 'Q4', apartmentRent: 8.9, housePrice: 2720, landPrice: 330 },
    { year: 2023, quarter: 'Q1', apartmentRent: 9.0, housePrice: 2780, landPrice: 340 },
    { year: 2023, quarter: 'Q2', apartmentRent: 9.1, housePrice: 2820, landPrice: 345 },
    { year: 2023, quarter: 'Q3', apartmentRent: 9.2, housePrice: 2840, landPrice: 350 },
    { year: 2023, quarter: 'Q4', apartmentRent: 9.3, housePrice: 2820, landPrice: 350 },
    { year: 2024, quarter: 'Q1', apartmentRent: 9.4, housePrice: 2810, landPrice: 348 },
    { year: 2024, quarter: 'Q2', apartmentRent: 9.5, housePrice: 2820, landPrice: 350 }
  ];

  // ICT Adoption data
  const ictAdoptionData = [
    { technology: 'Internet Access', percentage: 97.7, category: 'Basic' },
    { technology: 'Website', percentage: 67.9, category: 'Basic' },
    { technology: 'Cloud Computing', percentage: 38.0, category: 'Advanced' },
    { technology: 'E-commerce', percentage: 12.5, category: 'Advanced' },
    { technology: 'AI Technology', percentage: 19.6, category: 'Advanced' },
    { technology: 'Big Data Analytics', percentage: 15.3, category: 'Advanced' }
  ];
  
  const ictTrendData = [
    { year: 2020, internet: 95.8, cloud: 30.2, ai: 9.9, ecommerce: 11.5 },
    { year: 2021, internet: 96.2, cloud: 32.5, ai: 12.8, ecommerce: 11.8 },
    { year: 2022, internet: 96.8, cloud: 35.3, ai: 15.7, ecommerce: 12.0 },
    { year: 2023, internet: 97.3, cloud: 36.5, ai: 17.8, ecommerce: 12.2 },
    { year: 2024, internet: 97.7, cloud: 38.0, ai: 19.6, ecommerce: 12.5 }
  ];

  // PREDICTIVE ANALYTICS

  // Function to generate forecast data
  const generateForecast = (baseData, years, adjustmentFactors = {}) => {
    // For simplicity, using linear regression to forecast trends
    const lastDataPoint = baseData[baseData.length - 1];
    const secondLastDataPoint = baseData[baseData.length - 2];
    
    let forecast = [];
    
    // Calculate basic trend from last two data points
    const trendFactor = {};
    Object.keys(lastDataPoint).forEach(key => {
      if (key !== 'year' && key !== 'quarter' && typeof lastDataPoint[key] === 'number') {
        trendFactor[key] = ((lastDataPoint[key] - secondLastDataPoint[key]) / secondLastDataPoint[key]) || 0;
      }
    });
    
    // Apply scenario adjustments
    for (let i = 1; i <= years; i++) {
      const forecastPoint = { forecast: true };
      
      // Handle year/quarter
      if ('year' in lastDataPoint) {
        forecastPoint.year = lastDataPoint.year + i;
      }
      if ('quarter' in lastDataPoint) {
        forecastPoint.quarter = lastDataPoint.quarter;
      }
      
      // Generate values with adjustments
      Object.keys(trendFactor).forEach(key => {
        const baseTrend = trendFactor[key];
        const adjustmentFactor = adjustmentFactors[key] || 0;
        const adjustedTrend = baseTrend + adjustmentFactor;
        
        forecastPoint[key] = lastDataPoint[key] * Math.pow(1 + adjustedTrend, i);
        
        // Round to 1 decimal for better readability
        forecastPoint[key] = Math.round(forecastPoint[key] * 10) / 10;
      });
      
      forecast.push(forecastPoint);
    }
    
    return forecast;
  };

  // Generate forecasts based on scenario inputs
  const populationForecast = generateForecast(
    populationData, 
    predictionYears, 
    { population: populationGrowthRate / 100 }
  );

  const rentForecast = generateForecast(
    realEstatePriceData, 
    predictionYears * 4,  // quarters
    { 
      apartmentRent: interestRateChange * -0.015,  // Interest rates impact rent inversely
      housePrice: interestRateChange * -0.03,      // House prices are more sensitive
      landPrice: interestRateChange * -0.02        // Land prices also affected
    }
  );

  const ictForecast = generateForecast(
    ictTrendData,
    predictionYears,
    {
      ai: digitalInvestment * 0.05,          // AI adoption accelerated by investment
      cloud: digitalInvestment * 0.03,       // Cloud computing also accelerated
      ecommerce: digitalInvestment * 0.04    // E-commerce adoption improved
    }
  );

  // Combined data for charts (original + forecast)
  const combinedPopulationData = showPredictions 
    ? [...populationData, ...populationForecast] 
    : populationData;

  const combinedRentData = showPredictions
    ? [...realEstatePriceData, ...rentForecast]
    : realEstatePriceData;

  const combinedIctData = showPredictions
    ? [...ictTrendData, ...ictForecast]
    : ictTrendData;

  // Format data for charts
  const rentTrendData = combinedRentData.map(item => ({
    name: item.forecast ? `${item.year} ${item.quarter} (F)` : `${item.year} ${item.quarter}`,
    rent: item.apartmentRent,
    forecast: !!item.forecast
  }));

  const housePriceTrendData = combinedRentData.map(item => ({
    name: item.forecast ? `${item.year} ${item.quarter} (F)` : `${item.year} ${item.quarter}`,
    housePrice: item.housePrice,
    forecast: !!item.forecast
  }));

  const populationTrendData = combinedPopulationData.map(item => ({
    name: item.forecast ? `${item.year} (F)` : item.year,
    population: item.population,
    forecast: !!item.forecast
  }));

  const ictAdoptionTrendData = combinedIctData.map(item => ({
    name: item.forecast ? `${item.year} (F)` : item.year,
    ai: item.ai,
    cloud: item.cloud,
    ecommerce: item.ecommerce,
    forecast: !!item.forecast
  }));

  // Format functions
  const formatEuros = value => `${value} €`;
  const formatEurosPerSqm = value => `${value} €/m²`;
  const formatPercentage = value => `${value}%`;

  return (
    <div className="p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 text-center">Duisburg Economic Dashboard</h1>
      <p className="text-center text-gray-600 mb-2">Interactive analysis with predictive modeling and city benchmarking</p>
      
      {/* Dashboard Controls */}
      <Card className="mb-6 bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Dashboard Controls</CardTitle>
          <CardDescription>Adjust parameters to model different scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="interest-rate">Interest Rate Change</Label>
                <span className="text-sm text-gray-500">{interestRateChange > 0 ? '+' : ''}{interestRateChange}%</span>
              </div>
              <Slider 
                id="interest-rate" 
                min={-2} 
                max={5} 
                step={0.5} 
                value={[interestRateChange]} 
                onValueChange={(value) => setInterestRateChange(value[0])} 
              />
              <p className="text-xs text-gray-500">Models impact of interest rate changes on real estate markets</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="population-growth">Population Growth</Label>
                <span className="text-sm text-gray-500">{populationGrowthRate > 0 ? '+' : ''}{populationGrowthRate}%</span>
              </div>
              <Slider 
                id="population-growth" 
                min={-1} 
                max={2} 
                step={0.1} 
                value={[populationGrowthRate]} 
                onValueChange={(value) => setPopulationGrowthRate(value[0])} 
              />
              <p className="text-xs text-gray-500">Adjusts annual population growth rate projection</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="digital-investment">Digital Investment</Label>
                <span className="text-sm text-gray-500">{digitalInvestment > 0 ? '+' : ''}{digitalInvestment}</span>
              </div>
              <Slider 
                id="digital-investment" 
                min={0} 
                max={10} 
                step={1} 
                value={[digitalInvestment]} 
                onValueChange={(value) => setDigitalInvestment(value[0])} 
              />
              <p className="text-xs text-gray-500">Models impact of additional investment in digital transformation</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="city-select">Compare with</Label>
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {comparableCities.map(city => (
                    <SelectItem key={city.id} value={city.id}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">Select a city to compare with Duisburg</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="forecast-years">Forecast Years</Label>
                <span className="text-sm text-gray-500">{predictionYears} years</span>
              </div>
              <Slider 
                id="forecast-years" 
                min={1} 
                max={5} 
                step={1} 
                value={[predictionYears]} 
                onValueChange={(value) => setPredictionYears(value[0])} 
              />
              <p className="text-xs text-gray-500">How many years to forecast into the future</p>
            </div>
            
            <div className="flex items-center space-x-4 justify-between h-full">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="show-predictions" 
                  checked={showPredictions} 
                  onCheckedChange={setShowPredictions}
                />
                <Label htmlFor="show-predictions">Show Predictions</Label>
              </div>
              
              <Button variant="outline" size="sm" onClick={() => {
                setInterestRateChange(0);
                setPopulationGrowthRate(0.5);
                setDigitalInvestment(0);
                setPredictionYears(3);
              }}>
                Reset Parameters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="realestate">Real Estate</TabsTrigger>
          <TabsTrigger value="ict">ICT Adoption</TabsTrigger>
          <TabsTrigger value="comparison">City Comparison</TabsTrigger>
          <TabsTrigger value="predictions">Forecast Summary</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Interactive Forecast Dashboard</h3>
                  <p className="text-sm text-blue-700">
                    This enhanced dashboard includes predictive analytics and scenario modeling. Use the controls at the top to adjust parameters and see how they might affect Duisburg's future trends. Forecasted data is shown with dotted lines and "(F)" labels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Population Forecast</CardTitle>
                <CardDescription>Shows historical population data and forecasted trends based on the selected growth rate ({populationGrowthRate}%).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={populationTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[490000, 520000]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="population" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Population" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      {showPredictions && <ReferenceLine x={`${2024}`} stroke="#ff7300" label="Forecast Start" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    {populationGrowthRate > 1 ? 
                      "High growth scenario would increase infrastructure and housing demands." :
                      populationGrowthRate < 0 ? 
                      "Population decline would require focus on retention strategies and service optimization." :
                      "Moderate growth aligns with current development capacity."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Apartment Rent Forecast</CardTitle>
                <CardDescription>Shows rent trends with forecast adjusting for interest rate changes ({interestRateChange}%).</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={rentTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 7)} />
                      <YAxis domain={[6.5, 12]} tickFormatter={formatEurosPerSqm} />
                      <Tooltip formatter={(value) => [`${value} €/m²`, "Average Rent"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rent" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Average Rent" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      {showPredictions && <ReferenceLine x="2024 Q2" stroke="#ff7300" label="Forecast Start" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    {interestRateChange > 2 ? 
                      "Rising interest rates could slow rent growth as borrowing costs increase." :
                      interestRateChange < 0 ? 
                      "Lower interest rates may accelerate housing market activity and rent increases." :
                      "Current interest rate projections suggest stable rent growth."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>ICT Adoption Forecast</CardTitle>
              <CardDescription>Shows technology adoption trends with forecast adjusting for digital investment level ({digitalInvestment}).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={ictAdoptionTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="ai" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                      name="AI Technology" 
                      strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cloud" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                      name="Cloud Computing" 
                      strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ecommerce" 
                      stroke="#ffc658" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                      name="E-commerce" 
                      strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                    />
                    {showPredictions && <ReferenceLine x="2024" stroke="#ff7300" label="Forecast Start" />}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  {digitalInvestment > 5 ? 
                    "High investment in digital transformation could accelerate AI and e-commerce adoption, potentially creating new economic opportunities." :
                    digitalInvestment > 0 ? 
                    "Moderate investment would help maintain pace with technological trends but may not close the gap with digital leaders." :
                    "Without additional investment, Duisburg may fall behind comparable cities in digital transformation."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Real Estate Tab with Predictive Features */}
        <TabsContent value="realestate" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Real Estate Forecast</h3>
                  <p className="text-sm text-blue-700">
                    This section shows how interest rate changes and population growth could affect Duisburg's real estate market. Adjust the interest rate slider to model different scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Apartment Rent Forecast (€/m²)</CardTitle>
                <CardDescription>
                  Shows historical and projected rental prices with interest rate impact ({interestRateChange}%). 
                  {interestRateChange > 0 ? " Higher rates typically slow rent growth." : 
                   interestRateChange < 0 ? " Lower rates may accelerate rent increases." : 
                   " Current rates suggest stable growth."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={rentTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 7)} />
                      <YAxis domain={[6.5, 12]} tickFormatter={formatEurosPerSqm} />
                      <Tooltip formatter={(value) => [`${value} €/m²`, "Average Rent"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="rent" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Average Rent" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      {showPredictions && <ReferenceLine x="2024 Q2" stroke="#ff7300" label="Forecast Start" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>House Price Forecast (€/m²)</CardTitle>
                <CardDescription>
                  Shows how house prices may evolve based on interest rate changes. Property prices are generally more sensitive to rate changes than rents.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={housePriceTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tickFormatter={(value) => value.substring(0, 7)} />
                      <YAxis domain={[1800, 3400]} tickFormatter={formatEurosPerSqm} />
                      <Tooltip formatter={(value) => [`${value} €/m²`, "House Price"]} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="housePrice" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="House Price" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      {showPredictions && <ReferenceLine x="2024 Q2" stroke="#ff7300" label="Forecast Start" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Market Risk Assessment</CardTitle>
                <CardDescription>Evaluates potential risks in the real estate market based on current forecast parameters.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        interestRateChange > 3 ? "bg-red-500" : 
                        interestRateChange > 1 ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <h4 className="font-medium">Interest Rate Risk</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {interestRateChange > 3 ? "High risk: Sharp increases could cause market correction" : 
                       interestRateChange > 1 ? "Moderate risk: May slow growth but unlikely to cause major disruption" : 
                       "Low risk: Current projections suggest stable financing conditions"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        populationGrowthRate < 0 ? "bg-red-500" : 
                        populationGrowthRate < 0.3 ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <h4 className="font-medium">Demand Risk</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {populationGrowthRate < 0 ? "High risk: Population decline could reduce housing demand" : 
                       populationGrowthRate < 0.3 ? "Moderate risk: Slow growth may create excess supply in some areas" : 
                       "Low risk: Population growth should maintain healthy demand"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        rentTrendData[rentTrendData.length - 1].rent > 11 ? "bg-red-500" : 
                        rentTrendData[rentTrendData.length - 1].rent > 10 ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <h4 className="font-medium">Affordability Risk</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {rentTrendData[rentTrendData.length - 1].rent > 11 ? "High risk: Projected rents may exceed affordability for many residents" : 
                       rentTrendData[rentTrendData.length - 1].rent > 10 ? "Moderate risk: Affordability pressure increasing for lower-income households" : 
                       "Low risk: Rent levels remain relatively affordable compared to regional average"}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        housePriceTrendData[housePriceTrendData.length - 1].housePrice > 3300 ? "bg-red-500" : 
                        housePriceTrendData[housePriceTrendData.length - 1].housePrice > 3000 ? "bg-yellow-500" : "bg-green-500"
                      }`}></div>
                      <h4 className="font-medium">Housing Bubble Risk</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {housePriceTrendData[housePriceTrendData.length - 1].housePrice > 3300 ? "High risk: Rapid price growth may indicate unsustainable market conditions" : 
                       housePriceTrendData[housePriceTrendData.length - 1].housePrice > 3000 ? "Moderate risk: Prices growing faster than fundamentals would suggest" : 
                       "Low risk: Price growth appears aligned with economic fundamentals"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ICT Adoption Tab with Predictive Features */}
        <TabsContent value="ict" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">ICT Adoption Forecast</h3>
                  <p className="text-sm text-blue-700">
                    This section models how different levels of digital investment could affect technology adoption rates in Duisburg. Adjust the digital investment slider to see potential impacts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Technology Adoption Forecast</CardTitle>
                <CardDescription>
                  Shows how digital investment ({digitalInvestment > 0 ? `+${digitalInvestment}` : digitalInvestment}) could affect adoption of key technologies over {predictionYears} years.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={ictAdoptionTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="ai" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="AI Technology" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cloud" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="Cloud Computing" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ecommerce" 
                        stroke="#ffc658" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }} 
                        name="E-commerce" 
                        strokeDasharray={(datum) => datum.forecast ? "5 5" : "0"}
                      />
                      {showPredictions && <ReferenceLine x="2024" stroke="#ff7300" label="Forecast Start" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Technology Adoption Scenarios</CardTitle>
                <CardDescription>Compares potential outcomes based on different investment levels.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-blue-700">AI Technology Adoption Year {2024 + predictionYears}</span>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-700">{Math.round(19.6 + predictionYears * 3 + digitalInvestment * predictionYears * 0.5)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (19.6 + predictionYears * 3 + digitalInvestment * predictionYears * 0.5) * 2)}%` }}></div>
                      </div>
                      <div className="ml-3 text-xs w-12">
                        <div className="text-blue-600">Current: 19.6%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-green-700">E-commerce Adoption Year {2024 + predictionYears}</span>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-green-700">{Math.round(12.5 + predictionYears * 0.3 + digitalInvestment * predictionYears * 0.4)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (12.5 + predictionYears * 0.3 + digitalInvestment * predictionYears * 0.4) * 2)}%` }}></div>
                      </div>
                      <div className="ml-3 text-xs w-12">
                        <div className="text-green-600">Current: 12.5%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-medium text-purple-700">Cloud Computing Adoption Year {2024 + predictionYears}</span>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-purple-700">{Math.round(38.0 + predictionYears * 2 + digitalInvestment * predictionYears * 0.3)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${Math.min(100, (38.0 + predictionYears * 2 + digitalInvestment * predictionYears * 0.3))}%` }}></div>
                      </div>
                      <div className="ml-3 text-xs w-12">
                        <div className="text-purple-600">Current: 38.0%</div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-800 mt-6">Impact Analysis</h4>
                  <p className="text-sm text-gray-700">
                    {digitalInvestment === 0 ? 
                      "Without additional investment, AI adoption would reach ~" + Math.round(19.6 + predictionYears * 3) + "% by " + (2024 + predictionYears) + ", leaving Duisburg behind digital leaders." :
                      "With the current investment settings, Duisburg could reach " + Math.round(19.6 + predictionYears * 3 + digitalInvestment * predictionYears * 0.5) + "% AI adoption by " + (2024 + predictionYears) + ", " + 
                      (digitalInvestment > 5 ? "potentially becoming a regional leader in digital transformation." : 
                       digitalInvestment > 2 ? "showing significant improvement in digital competitiveness." :
                       "making modest progress in digital transformation.")
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* City Comparison Tab */}
        <TabsContent value="comparison" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <Compass className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">City Comparison Dashboard</h3>
                  <p className="text-sm text-blue-700">
                    This section benchmarks Duisburg against comparable cities in the region, showing relative performance across key economic and social indicators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Population Comparison</CardTitle>
                <CardDescription>Compares Duisburg's population size and growth rate with similar cities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cityComparisonData.population}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                      <Bar dataKey="value" name="Population" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Duisburg is the third largest city in this comparison group. Its growth rate of 0.6% is moderate compared to Münster (1.2%), but stronger than Bochum (-0.1%).</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Rental Price Comparison (€/m²)</CardTitle>
                <CardDescription>Compares average rental prices across cities in the region.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cityComparisonData.rent}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={formatEurosPerSqm} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => `${value} €/m²`} />
                      <Legend />
                      <Bar dataKey="value" name="Average Rent" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Duisburg offers the most affordable rental prices among the comparison cities, approximately 26% lower than Münster and 10% lower than Essen.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Unemployment Rate Comparison</CardTitle>
                <CardDescription>Compares unemployment rates and trends across cities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cityComparisonData.unemployment}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="value" name="Unemployment Rate" fill="#ff8042">
                        {cityComparisonData.unemployment.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.value > 10 ? "#ff8042" : "#82ca9d"} />
                        ))}
                      </Bar>
                      <ReferenceLine x={7.5} stroke="red" label="National Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Duisburg has the highest unemployment rate in the comparison group at 12.8%, significantly above the national average of 7.5%. This suggests structural economic challenges requiring targeted interventions.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Technology Adoption</CardTitle>
                <CardDescription>Compares business adoption of AI technologies across cities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cityComparisonData.ictAdoption}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                      <Bar dataKey="value" name="AI Adoption Rate" fill="#8884d8" />
                      <ReferenceLine x={21.4} stroke="blue" label="Regional Average" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Duisburg's AI adoption rate (19.6%) lags behind the regional average (21.4%) and significantly behind digital leaders like Münster (27.8%). This gap could impact future economic competitiveness.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Positioning</CardTitle>
                <CardDescription>Overall assessment of Duisburg's strengths and challenges relative to comparable cities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Competitive Advantages</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Affordability:</strong> Lower housing costs provide an advantage for attracting residents and businesses sensitive to costs.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Population Growth:</strong> Recent positive population trend indicates improving attractiveness and potential for economic growth.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>AI Adoption Momentum:</strong> Strong growth in AI adoption (9.9% to 19.6% in 4 years) shows potential for accelerated digital transformation.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Key Challenges</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>Unemployment:</strong> Highest unemployment rate in the comparison group indicates structural economic challenges.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>Digital Gap:</strong> Below-average technology adoption may impact future economic development and competitiveness.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>E-commerce Lag:</strong> Particularly low e-commerce adoption (12.5% vs. regional average of ~18%) limits market reach for local businesses.</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Strategic Implications</h4>
                  <p className="text-sm text-gray-700">
                    Duisburg could leverage its affordability advantage to attract businesses and residents, particularly if paired with targeted digital transformation initiatives. The combination of lower costs and improved digital infrastructure could create a compelling value proposition compared to more expensive neighboring cities.
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    Based on the {digitalInvestment > 0 ? "proposed" : "current"} digital investment level ({digitalInvestment > 0 ? `+${digitalInvestment}` : "base case"}), Duisburg {digitalInvestment > 5 ? "could close the digital gap with leading cities within 3-4 years" : digitalInvestment > 2 ? "would make progress toward digital competitiveness but still lag behind leaders" : "would likely fall further behind digital leaders in the region"}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Prediction Summary Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <BarChart3 className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">Forecast Summary Dashboard</h3>
                  <p className="text-sm text-blue-700">
                    This consolidated view summarizes key forecasts based on your parameter settings. Use this dashboard to quickly understand potential outcomes across different domains.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Population
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Intl.NumberFormat().format(Math.round(populationForecast[predictionYears-1].population))}
                </div>
                <div className="text-sm text-gray-500 mb-4">Forecast for {2024 + predictionYears}</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current (2023)</span>
                    <span className="font-medium">{new Intl.NumberFormat().format(503707)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Change</span>
                    <span className={`font-medium ${populationForecast[predictionYears-1].population > 503707 ? 'text-green-600' : 'text-red-600'}`}>
                      {populationForecast[predictionYears-1].population > 503707 ? '+' : ''}
                      {new Intl.NumberFormat().format(Math.round(populationForecast[predictionYears-1].population - 503707))} 
                      ({((populationForecast[predictionYears-1].population / 503707 - 1) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Annual Growth Rate</span>
                    <span className="font-medium">{populationGrowthRate}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Housing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {rentForecast[predictionYears*4-1].apartmentRent} €/m²
                </div>
                <div className="text-sm text-gray-500 mb-4">Avg. Rent Forecast for {2024 + predictionYears}</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current (2024)</span>
                    <span className="font-medium">9.5 €/m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Change</span>
                    <span className={`font-medium ${rentForecast[predictionYears*4-1].apartmentRent > 9.5 ? 'text-red-600' : 'text-green-600'}`}>
                      {rentForecast[predictionYears*4-1].apartmentRent > 9.5 ? '+' : ''}
                      {(rentForecast[predictionYears*4-1].apartmentRent - 9.5).toFixed(1)} €/m² 
                      ({((rentForecast[predictionYears*4-1].apartmentRent / 9.5 - 1) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>House Price (forecast)</span>
                    <span className="font-medium">{rentForecast[predictionYears*4-1].housePrice} €/m²</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {ictForecast[predictionYears-1].ai}%
                </div>
                <div className="text-sm text-gray-500 mb-4">AI Adoption Forecast for {2024 + predictionYears}</div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current (2024)</span>
                    <span className="font-medium">19.6%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Change</span>
                    <span className={`font-medium text-green-600`}>
                      +{(ictForecast[predictionYears-1].ai - 19.6).toFixed(1)}% 
                      ({((ictForecast[predictionYears-1].ai / 19.6 - 1) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>E-commerce (forecast)</span>
                    <span className="font-medium">{ictForecast[predictionYears-1].ecommerce}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Combined Impact Analysis</CardTitle>
              <CardDescription>Analyzing the interaction between different forecast domains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Economic Growth Potential</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: `${30 + 
                          (populationGrowthRate > 0 ? populationGrowthRate * 10 : 0) + 
                          (interestRateChange > 2 ? 0 : interestRateChange < 0 ? 10 : 5) + 
                          (digitalInvestment * 3)}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {
                          (populationGrowthRate > 0.5 && digitalInvestment > 3 && interestRateChange < 2) ? "Strong" :
                          (populationGrowthRate > 0 && digitalInvestment > 0) ? "Moderate" : "Limited"
                        }
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Based on population trend, technology adoption, and economic conditions</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Housing Market Outlook</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`${
                          (populationGrowthRate > 1 && interestRateChange < 1) ? "bg-red-600" :
                          (populationGrowthRate > 0.3 && interestRateChange < 3) ? "bg-yellow-600" : "bg-green-600"
                        } h-2.5 rounded-full`} style={{ width: `${40 + 
                          (populationGrowthRate * 15) + 
                          (interestRateChange > 2 ? -10 : interestRateChange < 0 ? 15 : 0)}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {
                          (populationGrowthRate > 1 && interestRateChange < 1) ? "Overheating" :
                          (populationGrowthRate > 0.3 && interestRateChange < 3) ? "Growth" : "Stable"
                        }
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Housing market trajectory based on population and interest rate scenarios</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Competitiveness Position</h4>
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`bg-purple-600 h-2.5 rounded-full`} style={{ width: `${35 + 
                          (digitalInvestment * 5) + 
                          (populationGrowthRate > 0 ? 5 : -5) + 
                          (interestRateChange > 3 ? -10 : interestRateChange < 0 ? 5 : 0)}%` }}></div>
                      </div>
                      <span className="ml-2 text-sm">
                        {
                          (digitalInvestment > 5 && populationGrowthRate > 0) ? "Improving" :
                          (digitalInvestment > 2) ? "Maintaining" : "Declining"
                        }
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Relative position compared to peer cities based on combined factors</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-800 mt-2">Key Forecast Insights</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Population Trajectory:</strong> {
                        populationGrowthRate > 1 ? 
                        "The high growth scenario would put pressure on housing and infrastructure, requiring accelerated development." :
                        populationGrowthRate > 0 ?
                        "Moderate growth provides stability while allowing planned infrastructure development to keep pace." :
                        "Population decline would require focus on retention strategies and service optimization."
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Housing Market:</strong> {
                        interestRateChange > 3 ?
                        "Significant interest rate increases could reduce housing demand and slow price growth, potentially benefiting affordability." :
                        interestRateChange > 0 ?
                        "Moderate interest rate increases would likely stabilize the housing market after recent growth periods." :
                        "Lower interest rates could accelerate property price growth, potentially creating affordability challenges."
                      }
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Digital Transformation:</strong> {
                        digitalInvestment > 5 ?
                        "High investment in digital infrastructure could position Duisburg as a technology leader, attracting innovative businesses and skilled workers." :
                        digitalInvestment > 2 ?
                        "Moderate digital investment would help maintain competitiveness without closing the gap with digital leaders." :
                        "Limited digital investment risks widening the technology gap with neighboring cities, potentially affecting economic development."
                      }
                    </span>
                  </li>
                </ul>
                
                <div className="mt-2 p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Strategic Recommendation</h4>
                  <p className="text-sm text-gray-700">
                    {
                      (digitalInvestment > 3 && populationGrowthRate > 0.3 && interestRateChange < 3) ?
                      "The combination of positive population growth, manageable interest rates, and strong digital investment creates favorable conditions for economic development. Focus on leveraging technology to address employment challenges while ensuring housing development keeps pace with population growth." :
                      
                      (digitalInvestment > 3 && populationGrowthRate < 0.3) ?
                      "With limited population growth but strong digital investment, focus on quality over quantity - attracting high-skilled workers and innovative businesses through digital leadership, while addressing structural economic challenges." :
                      
                      (digitalInvestment < 3 && populationGrowthRate > 0.5) ?
                      "Population growth without corresponding digital investment risks creating a growth imbalance. Consider reallocating resources to improve digital infrastructure and workforce skills to maximize the benefits of population growth." :
                      
                      "Based on current parameter settings, Duisburg faces challenges in maintaining competitive position. Consider a more balanced approach with moderate investments in both physical infrastructure and digital transformation to create sustainable growth conditions."
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DuisburgDashboard;
