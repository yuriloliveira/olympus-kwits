'use strict';
const express = require('express');
const cheerio = require('cheerio');
const request = require('request-promise');

const trackingRouter = require('./tracking/router');

const trackingUtils = require('./utils/tracking');

const { PORT } = require('./config');

const app = express();

app.use('/rastrear', trackingRouter);
console.log('Route added /rastrear');

app.listen(PORT);
console.log(`Listening on port ${PORT}...`);

const nodeToString = (node) => {
  if (!node) {
    return '';
  }

  const { data: nodeData } = node;

  const { children } = node;
  const { nextSibling } = node;

  const childrenStr = children.map(nodeToString);
  const nextSiblingStr = nodeToString(nextSibling);

  return `${nodeData} ${childrenStr} ${nextSiblingStr}`;
};

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
    const xml = parseString(eventTimeNodes[0].html());
    const str = trackingUtils.extractText(eventTimeNodes[0]);
})();