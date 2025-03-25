/**
 * Utility functions for economic data analysis
 */

/**
 * Calculate Compound Annual Growth Rate (CAGR)
 * @param {number} startValue - Initial value
 * @param {number} endValue - Final value
 * @param {number} years - Number of years between measurements
 * @returns {number} CAGR as a decimal (multiply by 100 for percentage)
 */
export const calculateCAGR = (startValue, endValue, years) => {
  if (startValue <= 0 || years === 0) return 0;
  return Math.pow(endValue / startValue, 1 / years) - 1;
};

/**
 * Calculate year-over-year growth rate
 * @param {number} previousValue - Previous year's value
 * @param {number} currentValue - Current year's value
 * @returns {number} Growth rate as a decimal (multiply by 100 for percentage)
 */
export const calculateYoYGrowth = (previousValue, currentValue) => {
  if (previousValue === 0) return 0;
  return (currentValue - previousValue) / previousValue;
};

/**
 * Calculate a simple moving average
 * @param {Array<number>} data - Array of numeric values
 * @param {number} period - Period for the moving average
 * @returns {Array<number>} Array of moving averages
 */
export const calculateMovingAverage = (data, period) => {
  const result = [];
  
  if (!data || period <= 0 || data.length < period) {
    return result;
  }
  
  // Calculate the first average
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i];
  }
  
  result.push(sum / period);
  
  // Calculate the rest using the sliding window technique
  for (let i = period; i < data.length; i++) {
    sum = sum - data[i - period] + data[i];
    result.push(sum / period);
  }
  
  return result;
};

/**
 * Perform linear regression on data
 * @param {Array<{x: number, y: number}>} data - Array of data points with x and y values
 * @returns {Object} Object containing slope, intercept, and r-squared values
 */
export const linearRegression = (data) => {
  if (!data || data.length < 2) {
    return { slope: 0, intercept: 0, rSquared: 0 };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;
  let sumYY = 0;
  const n = data.length;

  for (let i = 0; i < n; i++) {
    sumX += data[i].x;
    sumY += data[i].y;
    sumXY += data[i].x * data[i].y;
    sumXX += data[i].x * data[i].x;
    sumYY += data[i].y * data[i].y;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate R-squared
  const yMean = sumY / n;
  let totalVariation = 0;
  let explainedVariation = 0;

  for (let i = 0; i < n; i++) {
    totalVariation += Math.pow(data[i].y - yMean, 2);
    explainedVariation += Math.pow(slope * data[i].x + intercept - yMean, 2);
  }

  const rSquared = explainedVariation / totalVariation;

  return { slope, intercept, rSquared };
};

/**
 * Format currency values for display
 * @param {number} value - Numeric value to format
 * @param {string} currencyCode - ISO currency code (default: EUR)
 * @param {string} locale - Locale for formatting (default: de-DE)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currencyCode = 'EUR', locale = 'de-DE') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format percentage values for display
 * @param {number} value - Decimal value to format as percentage
 * @param {number} digits - Number of decimal digits (default: 1)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, digits = 1) => {
  return `${(value * 100).toFixed(digits)}%`;
};

/**
 * Calculate the correlation coefficient between two data series
 * @param {Array<number>} seriesA - First data series
 * @param {Array<number>} seriesB - Second data series
 * @returns {number} Correlation coefficient (-1 to 1)
 */
export const calculateCorrelation = (seriesA, seriesB) => {
  if (!seriesA || !seriesB || seriesA.length !== seriesB.length || seriesA.length < 2) {
    return 0;
  }

  const n = seriesA.length;
  let sumA = 0;
  let sumB = 0;
  let sumAB = 0;
  let sumAA = 0;
  let sumBB = 0;

  for (let i = 0; i < n; i++) {
    sumA += seriesA[i];
    sumB += seriesB[i];
    sumAB += seriesA[i] * seriesB[i];
    sumAA += seriesA[i] * seriesA[i];
    sumBB += seriesB[i] * seriesB[i];
  }

  const numerator = n * sumAB - sumA * sumB;
  const denominator = Math.sqrt((n * sumAA - sumA * sumA) * (n * sumBB - sumB * sumB));

  if (denominator === 0) return 0;
  return numerator / denominator;
}; 