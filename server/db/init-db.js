const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

const initializeDatabase = async () => {
    try {
        // Read the schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute the schema
        await pool.query(schema);
        console.log('Database schema created successfully');

        // Test the connection and tables
        const tables = ['economic_indicators', 'employment_stats', 'industrial_production', 'trade_stats'];
        for (const table of tables) {
            const result = await pool.query(`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)`, [table]);
            console.log(`Table ${table} exists:`, result.rows[0].exists);
        }

        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
};

// Run the initialization
initializeDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }); 