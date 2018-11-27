const cheerio = require('cheerio');

const extractText = (node) => {
  if (!node) {
    return '';
  }

  const { data: nodeData } = node;
  const nodeStr = parseText(nodeData);
  
  const { children } = node;
  const { nextSibling } = node;

  const childrenStr = children ? children.map(extractText).join(' ') : '';
  const nextSiblingStr = nextSibling ? extractText(nextSibling) : '';

  return `${nodeStr ? nodeStr + ' ' : ''}${childrenStr ? childrenStr + ' ' : ''}${nextSiblingStr}`.trim();
};

const parseText = (text) => {
  // removes new lines and trimes
  return (text || '').replace(/\r?\n|\r/g, '').trim();
};

module.exports = Object.freeze({
  extractText
});