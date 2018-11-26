const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = (function() {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
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
    console.log(eventTimeNodes.children().map(function(i, el) {
      return $(this).text();
    }));
    const eventDescNodes = $(`table.${EVT_LIST_TBL_CLSNAME} tr td.${EVT_DESC_CLSNAME}`);
    // console.log("TIME: ", eventTimeNodes);
    // console.log("DESC: ", eventDescNodes);
    return res.status(200).send(correiosHTML);
  });

  return router;
})();