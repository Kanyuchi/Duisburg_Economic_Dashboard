// Sample economic data for Duisburg
// In a real application, this would be fetched from an API

export const dashboardData = {
  // Overview data
  overview: {
    population: 498,590,
    currentGDP: 17.3,
    unemploymentRate: 9.8,
    inflationRate: 2.4,
    averageIncome: 42350,
    gdpGrowthRate: 1.8,
    gdpYears: [2018, 2019, 2020, 2021, 2022, 2023],
    gdpValues: [15.2, 15.9, 15.3, 16.2, 16.8, 17.3],
  },
  
  // Employment data
  employment: {
    laborForce: 243500,
    employed: 219637,
    unemployed: 23863,
    currentUnemploymentRate: 9.8,
    youthUnemploymentRate: 12.5,
    years: [2018, 2019, 2020, 2021, 2022, 2023],
    unemploymentRates: [11.9, 11.2, 11.8, 10.9, 10.3, 9.8],
    nationalUnemploymentRates: [5.2, 5.0, 5.9, 5.7, 5.3, 5.0],
    sectorDistribution: {
      'Industrial & Manufacturing': 28,
      'Logistics & Transportation': 23,
      'Retail & Services': 25,
      'Public Administration': 16,
      'Others': 8
    },
    topEmployers: [
      { name: 'ThyssenKrupp Steel Europe', sector: 'Steel Manufacturing', employees: 13000 },
      { name: 'Duisburger Hafen AG (Duisport)', sector: 'Logistics', employees: 7000 },
      { name: 'Hüttenwerke Krupp Mannesmann', sector: 'Steel Manufacturing', employees: 3000 },
      { name: 'Franz Haniel & Cie. GmbH', sector: 'Logistics & Trading', employees: 2800 },
      { name: 'City of Duisburg', sector: 'Public Administration', employees: 5500 }
    ]
  },
  
  // This could be expanded with additional data for other tabs
  // Industry data
  industry: {
    // To be implemented
  },
  
  // Trade data
  trade: {
    // To be implemented
  },
  
  // Infrastructure data
  infrastructure: {
    // To be implemented
  }
};
