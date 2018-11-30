'use strict';
const express = require('express');
const cheerio = require('cheerio');
const request = require('request-promise');

const trackingRouter = require('./tracking/router');

const extractText = require('./utils/tracking').extractText;

const { PORT } = require('./config');

const app = express();

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);

app.use('/tracking', trackingRouter);
console.log('Route added /tracking');

(async function parseCorreiosTrackingPage() {
  const correiosHTML = await request('https://www2.correios.com.br/sistemas/rastreamento/resultado_semcontent.cfm', {
      method: 'POST',
      formData: {
        Objetos: 'OG226572624BR'
      }
    });

    const $ = cheerio.load(correiosHTML);

    const EVT_LIST_TBL_CLSNAME = 'listEvent';
    const EVT_TIME_CLSNAME = 'sroDtEvent';
    const EVT_DESC_CLSNAME = 'sroLbEvent';
    const eventTimeNodes = $(`table.${EVT_LIST_TBL_CLSNAME} tr td.${EVT_TIME_CLSNAME}`);
    const eventDescNodes = $(`table.${EVT_LIST_TBL_CLSNAME} tr td.${EVT_DESC_CLSNAME}`);
    const eventsTimes = eventTimeNodes.map((i, el) => extractText(el));
    const eventsDescs = eventDescNodes.map((i, el) => extractText(el));
})();