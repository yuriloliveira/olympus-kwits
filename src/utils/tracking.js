const extractText = (node) => {
  if (!node) {
    return '';
  }
  
  const { data: nodeData } = node;
  const nodeStr = parseText(nodeData);
  
  const { children } = node;
  const childrenStr = children ? children.map(extractText).join(' ') : '';
  return `${nodeStr ? nodeStr + ' ' : ''}${childrenStr || ''}`.trim();
};

 const parseText = (text) => {
  // removes new lines and trimes
  return (text || '').replace(/\r?\n|\r/g, '').trim();
};

module.exports = Object.freeze({
  extractText
});