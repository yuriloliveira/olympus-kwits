'use strict';
const express = require('express');

const trackingRouter = require('./tracking/router');
const { PORT } = require('./config');

const app = express();

app.use('/rastrear', trackingRouter);
console.log('Route added /rastrear');

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);