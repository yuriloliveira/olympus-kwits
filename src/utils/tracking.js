const cheerio = require('cheerio');

const extractText = node => {
  if (!node || typeof node !== "object") {
    return "";
  }

  const { _, $, ..._node } = node;
  const str = _ ? parseText(_) + " " : "";
  const children = Object.values(_node);
  const strs = children
    .filter(child => typeof child === "string")
    .join(" ")
    .trim();
  const childrenStr = Object.values(_node)
    .filter(child => typeof child !== "string")
    .map(extractText)
    .join(" ")
    .trim();

  return `${str}${strs}${childrenStr}`;
};

const parseText = (text) => {
  // removes new lines and trimes
  return (text || '').replace(/\r?\n|\r/g, '').trim();
};

module.exports = Object.freeze({
  extractText
});