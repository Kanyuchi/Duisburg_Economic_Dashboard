const XLSX = require('xlsx');
const path = require('path');
const { pool } = require('../config/db');

const importData = async () => {
    try {
        // Read the Excel file
        const workbook = XLSX.readFile(path.join(__dirname, '../../React_App_Data.xlsx'));
        
        // Process each sheet
        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(sheet);

            // Map sheet names to table names
            const tableMapping = {
                'Economic Indicators': 'economic_indicators',
                'Employment': 'employment_stats',
                'Industrial Production': 'industrial_production',
                'Trade': 'trade_stats'
            };

            const tableName = tableMapping[sheetName];
            if (!tableName) {
                console.log(`Skipping sheet ${sheetName} - no matching table found`);
                continue;
            }

            // Insert data into appropriate table
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
            }

            console.log(`Imported data from sheet ${sheetName} to table ${tableName}`);
        }

        console.log('Data import completed successfully');
    } catch (error) {
        console.error('Error importing data:', error);
        throw error;
    }
};

// Run the import
importData()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed to import data:', error);
        process.exit(1);
    }); 