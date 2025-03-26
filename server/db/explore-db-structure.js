const { pool } = require('../config/db');

async function exploreDBStructure() {
    try {
        // Get all schemas
        const schemasQuery = `
            SELECT schema_name 
            FROM information_schema.schemata 
            WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'pg_toast')
            ORDER BY schema_name;
        `;
        const schemasResult = await pool.query(schemasQuery);
        console.log('Available schemas:');
        schemasResult.rows.forEach(row => console.log(`- ${row.schema_name}`));
        console.log('\n');

        // Get all tables in each schema
        for (const schema of schemasResult.rows) {
            const schemaName = schema.schema_name;
            const tablesQuery = `
                SELECT table_name, table_type 
                FROM information_schema.tables 
                WHERE table_schema = $1
                ORDER BY table_name;
            `;
            const tablesResult = await pool.query(tablesQuery, [schemaName]);
            
            if (tablesResult.rows.length > 0) {
                console.log(`Tables and views in ${schemaName} schema:`);
                tablesResult.rows.forEach(row => {
                    const type = row.table_type === 'VIEW' ? 'VIEW' : 'TABLE';
                    console.log(`- ${row.table_name} (${type})`);
                });
                console.log('\n');
            }
        }
        
        // Get sample data from a few tables
        const specificTables = [
            'business_registrations_52311_05i',
            'compensation_of_employees_82711_06i',
            'gdp_sector_matrix_82711-01i',
            'business_registrations_52311_03i',
            'commuters_by_economic_sector_19321-011i'
        ];
        
        for (const tableName of specificTables) {
            try {
                // First try to find which schema contains this table
                const findSchemaQuery = `
                    SELECT table_schema 
                    FROM information_schema.tables 
                    WHERE table_name = $1;
                `;
                const schemaResult = await pool.query(findSchemaQuery, [tableName]);
                
                if (schemaResult.rows.length > 0) {
                    const schemaName = schemaResult.rows[0].table_schema;
                    
                    // Get column information
                    const columnsQuery = `
                        SELECT column_name, data_type 
                        FROM information_schema.columns 
                        WHERE table_schema = $1 AND table_name = $2
                        ORDER BY ordinal_position;
                    `;
                    const columnsResult = await pool.query(columnsQuery, [schemaName, tableName]);
                    
                    console.log(`Columns in ${schemaName}.${tableName}:`);
                    columnsResult.rows.forEach(col => {
                        console.log(`- ${col.column_name} (${col.data_type})`);
                    });
                    
                    // Get sample data
                    const dataQuery = `
                        SELECT * FROM ${schemaName}.${tableName} LIMIT 3;
                    `;
                    const dataResult = await pool.query(dataQuery);
                    
                    console.log(`\nSample data from ${schemaName}.${tableName}:`);
                    console.log(dataResult.rows);
                    console.log('\n');
                } else {
                    console.log(`Table ${tableName} not found in any schema\n`);
                }
            } catch (error) {
                console.error(`Error exploring table ${tableName}:`, error.message);
            }
        }
        
        console.log('Database exploration completed');
    } catch (error) {
        console.error('Error exploring database structure:', error);
    }
}

// Run the exploration
exploreDBStructure()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('Failed to explore database:', error);
        process.exit(1);
    }); 