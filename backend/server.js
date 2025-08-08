// server.js
'use strict';

import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import tutorialRoutes from "./routes/tutorialRoutes.js"


import { sequelize, authenticate, sync } from './config/dbConfig.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
// parse requests of content-type - application/json
app.use(json());

// Import all routes 
app.use('/api/tutorials', tutorialRoutes);

// index route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Tutorial API." });
});

async function runServer() {
  try {
    await authenticate();

    await sync();

    return app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server boot error:', error);
    process.exit(1);
  }
}

let server;
// if (require.main === module) {
server = runServer();
// }

// shutdown server
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  if (server) {
    server.then(s => {
      s.close(() => {
        console.log('Server shutdown');
        process.exit(0);
      });
    }).catch(e => {
      console.error('Error during server shutdown:', e);
      process.exit(1);
    });
  }
});

// Export app as the default export
export default app;

// Export named exports to support testing
export { runServer, sequelize };