const XLSX = require('xlsx');
const path = require('path');
const { pool } = require('../config/db');

const importData = async () => {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile(path.join(__dirname, '../../React_App_Data.xlsx'));
        
        console.log('Available sheets in Excel file:', workbook.SheetNames);
        
        // Process each sheet
        for (const sheetName of workbook.SheetNames) {
            console.log(`Reading sheet: ${sheetName}`);
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);
            
            if (data.length === 0) {
                console.log(`No data found in sheet ${sheetName}`);
                continue;
            }
            
            console.log(`Sample data from sheet ${sheetName}:`, data[0]);
            
            // Table to import into - we'll use our existing tables regardless of sheet name
            // We'll determine the appropriate table based on the columns in the data
            let tableName = null;
            
            if (data[0].hasOwnProperty('indicator_name')) {
                tableName = 'economic_indicators';
            } else if (data[0].hasOwnProperty('sector')) {
                tableName = 'employment_stats';
            } else if (data[0].hasOwnProperty('industry_sector')) {
                tableName = 'industrial_production';
            } else if (data[0].hasOwnProperty('trade_type')) {
                tableName = 'trade_stats';
            }
            
            if (!tableName) {
                console.log(`Skipping sheet ${sheetName} - could not determine appropriate table`);
                console.log('Available columns:', Object.keys(data[0]).join(', '));
                continue;
            }
            
            console.log(`Importing data from sheet ${sheetName} to table ${tableName}`);
            
            // Insert data into appropriate table
            let insertedCount = 0;
            for (const row of data) {
                const columns = Object.keys(row);
                const values = Object.values(row);
                const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                
                const query = `
                    INSERT INTO ${tableName} (${columns.join(', ')})
                    VALUES (${placeholders})
                    ON CONFLICT DO NOTHING
                `;

                await pool.query(query, values);
                insertedCount++;
            }

            console.log(`Imported ${insertedCount} rows from sheet ${sheetName} to table ${tableName}`);
        }

        console.log('Data import completed successfully');
    } catch (error) {
        console.error('Error importing data:', error);
        throw error;
    }
};

// Run the import
importData()
    .then(() => {
        console.log('Import completed, checking table counts...');
        return checkTableCounts();
    })
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed to import data:', error);
        process.exit(1);
    });

// Function to check if tables have data
async function checkTableCounts() {
    const tables = ['economic_indicators', 'employment_stats', 'industrial_production', 'trade_stats'];
    
    for (const table of tables) {
        try {
            const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
            console.log(`Table ${table} has ${result.rows[0].count} rows`);
        } catch (error) {
            console.error(`Error checking count for table ${table}:`, error);
        }
    }
} 