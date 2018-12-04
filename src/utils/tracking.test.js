const cheerio = require('cheerio');

const trackingUtils = require('./tracking');

const SINGLE_LEVEL_TEXT  = 'Single level text';
const LEVEL_1_TEXT = 'Level 1';
const LEVEL_2_TEXT = 'Level 2';

describe('Tracking utils', () => {
  describe('extractText', () => {
    const html = `
      <div class="root">
        <div class="level-1">
        </div>
        <span class="single-level">
          ${SINGLE_LEVEL_TEXT}
        </span>
        <div class="multi-level">
          ${LEVEL_1_TEXT}
          <span>${LEVEL_2_TEXT}</span>
        </div>
      </div>
    `;

    const $ = cheerio.load(html);

    it('should return the node text when it is a single level node', () => {
      const node = $('.single-level');
      const singleLevelText = trackingUtils.extractText(node[0]);;
      expect(singleLevelText).toBe(SINGLE_LEVEL_TEXT);
    });

    it('should return the text from all children concatenated if it is a multi level node', () => {
      const multiLevelText = trackingUtils.extractText($('.multi-level')[0]);
      expect(multiLevelText).toBe(`${LEVEL_1_TEXT} ${LEVEL_2_TEXT}`);
    });
  });
});