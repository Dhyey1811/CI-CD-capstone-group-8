// backend/config/dbConfig.js
'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Use .env.test for the 'test' environment, otherwise use .env
const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '../.env';
dotenv.config({ path: envPath });

const {
    DB_DIALECT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} = process.env;

// Add a check to ensure the required variables are present
if (!DB_DIALECT || !DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
    throw new Error('Database configuration error: DB_DIALECT, DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME must be defined in your .env file.');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT, // DB_PORT is optional but recommended
    logging: false,
    dialectOptions: {
       
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    }
});
// A wrapper for database authentication
async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; 
  }
}

// A wrapper for model synchronization
async function sync() {
  try {
    await sequelize.sync(); 
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
    throw error; 
  }
}

// Export the sequelize instance and the utility functions
export { sequelize, authenticate, sync };