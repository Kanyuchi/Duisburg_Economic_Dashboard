/**
 * Data Conversion Script
 * 
 * This script converts raw data files (Excel, CSV) to JSON format for use in the dashboard.
 * 
 * To use this script:
 * 1. Install dependencies: npm install xlsx csv-parser fs path
 * 2. Place your data files in src/data/raw/
 * 3. Run: node scripts/convert_data.js
 * 4. Processed JSON files will be saved to src/data/static/
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx'); // You'll need to install this: npm install xlsx
const csv = require('csv-parser'); // You'll need to install this: npm install csv-parser

// Paths
const RAW_DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'raw');
const STATIC_DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'static');
const PROCESSED_DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'processed');

// Ensure directories exist
[STATIC_DATA_DIR, PROCESSED_DATA_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

/**
 * Convert Excel file to JSON
 */
function convertExcelToJson(filePath, outputName) {
  try {
    console.log(`Converting Excel file: ${filePath}`);
    
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    
    // Process each sheet
    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      
      // Create output filename based on the sheet name
      const cleanSheetName = sheetName.replace(/\s+/g, '_').toLowerCase();
      const outputFileName = outputName || `${path.basename(filePath, path.extname(filePath))}_${cleanSheetName}.json`;
      const outputPath = path.join(STATIC_DATA_DIR, outputFileName);
      
      // Save to JSON file
      fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
      console.log(`✓ Saved to ${outputPath}`);
    });
    
    return true;
  } catch (error) {
    console.error(`Error converting Excel file ${filePath}:`, error);
    return false;
  }
}

/**
 * Convert CSV file to JSON
 */
function convertCsvToJson(filePath, outputName) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`Converting CSV file: ${filePath}`);
      
      const results = [];
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          // Create output filename
          const outputFileName = outputName || `${path.basename(filePath, path.extname(filePath))}.json`;
          const outputPath = path.join(STATIC_DATA_DIR, outputFileName);
          
          // Save to JSON file
          fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
          console.log(`✓ Saved to ${outputPath}`);
          resolve(true);
        })
        .on('error', (error) => {
          console.error(`Error converting CSV file ${filePath}:`, error);
          reject(error);
        });
    } catch (error) {
      console.error(`Error setting up CSV conversion for ${filePath}:`, error);
      reject(error);
    }
  });
}

/**
 * Process all files in the raw data directory
 */
async function processAllFiles() {
  try {
    // Get all files in the raw data directory
    const files = fs.readdirSync(RAW_DATA_DIR);
    
    for (const file of files) {
      const filePath = path.join(RAW_DATA_DIR, file);
      const fileStats = fs.statSync(filePath);
      
      // Skip directories and hidden files
      if (fileStats.isDirectory() || file.startsWith('.')) {
        continue;
      }
      
      // Process based on file extension
      const ext = path.extname(file).toLowerCase();
      
      if (ext === '.xlsx' || ext === '.xls') {
        convertExcelToJson(filePath);
      } else if (ext === '.csv') {
        await convertCsvToJson(filePath);
      } else {
        console.log(`Skipping unsupported file: ${file}`);
      }
    }
    
    console.log('All files processed successfully!');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

// Run the processing
processAllFiles();

/**
 * Example usage:
 * 
 * // Convert specific Excel file
 * convertExcelToJson('src/data/raw/economic_indicators.xlsx', 'economic_data.json');
 * 
 * // Convert specific CSV file
 * convertCsvToJson('src/data/raw/city_comparison.csv', 'city_data.json');
 * 
 * // Process all files in the raw directory
 * processAllFiles();
 */
