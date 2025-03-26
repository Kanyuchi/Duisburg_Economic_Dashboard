const { pool } = require('../config/db');

async function insertTestData() {
    try {
        console.log('Inserting test data into the database...');
        
        // Insert test data into economic_indicators
        await pool.query(`
            INSERT INTO economic_indicators (indicator_name, value, unit, year, quarter)
            VALUES 
                ('GDP Growth', 2.3, '%', 2023, 1),
                ('Inflation Rate', 1.8, '%', 2023, 1),
                ('Unemployment Rate', 5.2, '%', 2023, 1),
                ('GDP Growth', 2.5, '%', 2023, 2),
                ('Inflation Rate', 1.7, '%', 2023, 2),
                ('Unemployment Rate', 5.0, '%', 2023, 2)
            ON CONFLICT DO NOTHING
        `);
        console.log('Inserted test data into economic_indicators');
        
        // Insert test data into employment_stats
        await pool.query(`
            INSERT INTO employment_stats (sector, employment_count, year, quarter)
            VALUES 
                ('Manufacturing', 12500, 2023, 1),
                ('Services', 25600, 2023, 1),
                ('Technology', 8700, 2023, 1),
                ('Manufacturing', 12700, 2023, 2),
                ('Services', 25900, 2023, 2),
                ('Technology', 9100, 2023, 2)
            ON CONFLICT DO NOTHING
        `);
        console.log('Inserted test data into employment_stats');
        
        // Insert test data into industrial_production
        await pool.query(`
            INSERT INTO industrial_production (industry_sector, production_value, year, quarter)
            VALUES 
                ('Automotive', 1250000, 2023, 1),
                ('Steel', 890000, 2023, 1),
                ('Chemical', 675000, 2023, 1),
                ('Automotive', 1280000, 2023, 2),
                ('Steel', 905000, 2023, 2),
                ('Chemical', 692000, 2023, 2)
            ON CONFLICT DO NOTHING
        `);
        console.log('Inserted test data into industrial_production');
        
        // Insert test data into trade_stats
        await pool.query(`
            INSERT INTO trade_stats (trade_type, value, year, quarter)
            VALUES 
                ('Exports', 45000000, 2023, 1),
                ('Imports', 38000000, 2023, 1),
                ('Exports', 46500000, 2023, 2),
                ('Imports', 39200000, 2023, 2)
            ON CONFLICT DO NOTHING
        `);
        console.log('Inserted test data into trade_stats');
        
        console.log('All test data inserted successfully');
    } catch (error) {
        console.error('Error inserting test data:', error);
        throw error;
    }
}

// Run the insertion
insertTestData()
    .then(() => {
        console.log('Test data inserted, checking counts...');
        return checkTableCounts();
    })
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed to insert test data:', error);
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