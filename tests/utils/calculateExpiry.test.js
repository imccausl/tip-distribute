import chai from 'chai';
import { calculateExpiry } from '../../src/helpers/currentTipOutHelpers';

const expect = chai.expect;
const dateCreated = new Date('OCTOBER 1 2017');
const diff = Math.floor((Date.now() - Date.parse(dateCreated)) / 1000 / 60 / 60 / 24);
const result = ((90 - diff) >= 0) ? 90 - diff : 0;

describe('calculateExpiry', () => {
  it('should return number of days until tip out is expired or 0 if greater than days till tip out expired', () => {
    const daysToExpire = calculateExpiry(dateCreated, 90);
    expect(daysToExpire).to.equal(result);
  });
});
