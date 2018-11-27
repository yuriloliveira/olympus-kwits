'use strict';
const express = require('express');
const cheerio = require('cheerio');
const request = require('request-promise');

const trackingRouter = require('./tracking/router');
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
    // console.log(`table.${EVT_LIST_TBL_CLSNAME} tr ${EVT_TIME_CLSNAME}`);
    const eventTimeNodes = $(`table.${EVT_LIST_TBL_CLSNAME} tr td.${EVT_TIME_CLSNAME}`);
    // const eventTimeTexts = eventTimeNodes.map(children => children.filter(child => child.type === 'text'));
    // const test = eventTimeNodes[0].children().map(function(i, el) {
    //   return el.tagName === 'label' ? el.firstChild.data : el.tagName;
    // })
    const test = eventTimeNodes.contents();
    console.log(test);
    const eventDescNodes = $(`table.${EVT_LIST_TBL_CLSNAME} tr td.${EVT_DESC_CLSNAME}`);
    // console.log("TIME: ", eventTimeNodes);
    // console.log("DESC: ", eventDescNodes);

    const $2 = cheerio.load('<span>olá!</span>');
    const span = $2('span');
    console.log(span);
    return res.status(200).send(correiosHTML);
})();