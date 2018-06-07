import express from 'express'
import http from 'http'
import config from './config/express'

require('dotenv').config()

const app = express()

config(app)

// app.use('/', routes);
// Routes(app);

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3001';
app.set('port', port);

/** Listen on provided port, on all network interfaces. */
const server = http.createServer(app);

server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Server Running on port http://localhost:${port}`)
});

export default app;
