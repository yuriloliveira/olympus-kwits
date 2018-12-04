'use strict';
const express = require('express');

const trackingRouter = require('./tracking/router');

const { PORT } = require('./config');

const app = express();

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);

app.use('/tracking', trackingRouter);
console.log('Route added /tracking');