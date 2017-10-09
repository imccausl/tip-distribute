import chai from 'chai';
import { calculateExpiry } from '../../src/helpers/currentTipOutHelpers';

const expect = chai.expect;
const dateCreated = new Date('OCTOBER 1 2017');
const diff = Math.floor((Date.now() - Date.parse(dateCreated)) / 1000 / 60 / 60 / 24);

describe('calculateExpiry', () => {
  it('should return number of days until tip out is expired', () => {
    const daysToExpire = calculateExpiry(dateCreated, 90);
    expect(daysToExpire).to.equal(90 - diff);
  });
});
