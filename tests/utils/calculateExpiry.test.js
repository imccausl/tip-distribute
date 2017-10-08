import chai from 'chai';
import { calculateExpiry } from '../../src/helpers/currentTipOutHelpers';

const expect = chai.expect;
const dateCreated = new Date('OCTOBER 1 2017');
console.log(dateCreated);

describe('calculateExpiry', () => {
  it('should return number of days until tip out is expired', () => {
    const daysToExpire = calculateExpiry(dateCreated, 90);
    expect(daysToExpire).to.equal('83');
  });
});
