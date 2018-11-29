const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

const extractText = require('../utils/tracking').extractText;
module.exports = (function() {
  const router = express.Router();

  router.get('/:company/:trackingCode', async (req, res, next) => {
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
    // const eventsTimes = eventTimeNodes.map((i, el) => extractText(el));

    const eventsTimes = (() => {
      const result = new Array(eventTimeNodes.length);
      for (i = 0; i < eventTimeNodes.length; i++) {
        result[i] = extractText(eventTimeNodes[i]);
      }
      return result;
    })();

    const eventsDescs = (() => {
      const result = new Array(eventDescNodes.length);
      for (i = 0; i < eventDescNodes.length; i++) {
        result[i] = extractText(eventDescNodes[i]);
      }
      return result;
    })();

    // const eventsDescs = eventDescNodes.map((i, el) => extractText(el));
    const events = eventsTimes.map((i, el) => ({
      time: eventsTimes[i],
      desc: eventsDescs[i]
    }));
    
    return res.status(200).json(events);
  });

  return router;
})();