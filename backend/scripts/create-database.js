import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Assuming the script is in `scripts/` and .env is in the project root

import { Sequelize } from 'sequelize';

async function createDatabase() {
    const {
        DB_HOST,
        DB_USER,
        DB_PASSWORD,
        DB_NAME,
        DB_PORT,
        DB_DIALECT
    } = process.env;

    // 2. Temporarily connect to db
    const sequelize = new Sequelize({
        dialect: DB_DIALECT,
        host: DB_HOST,
        username: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        logging: false,
        database: 'postgres' 
    });

    try {
        await sequelize.authenticate();
        console.log('Successfully connected to the PostgreSQL server.');

     
        const query = `CREATE DATABASE "${DB_NAME}"`;
        await sequelize.query(query);
        console.log(`Database "${DB_NAME}" created successfully.`);

    } catch (error) {
    
        if (error.parent && error.parent.code === '42P04') {
            console.log(`Database "${DB_NAME}" already exists.`);
        } else {
            console.error('Error creating database:', error);
            throw error;
        }
    } finally {
        // 5. Always close the connection.
        await sequelize.close();
    }
}

// 6. Run the function and handle any top-level errors.
createDatabase().catch(e => {
    console.error('An error occurred during database creation:', e);
    process.exit(1);
});