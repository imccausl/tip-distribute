import chai from 'chai';
import { roundTipOutToNearest } from '../../src/helpers/populateStateHelpers';

const expect = chai.expect;

describe('roundTipOutToNearest', () => {
  it('should return wage given # of hours and total money, rounded to nearest value', () => {
    const wage = 0.62;
    const hours = 24;
    const quarter = parseFloat(roundTipOutToNearest(wage, hours, 'QUARTER'));
    const dollar = parseFloat(roundTipOutToNearest(wage, hours, 'DOLLAR'));
    const nickel = parseFloat(roundTipOutToNearest(wage, hours, 'NICKEL'));
    const dime = parseFloat(roundTipOutToNearest(wage, hours, 'DIME'));

    expect(quarter).to.equal(14.75);
    expect(dollar).to.equal(14);
    expect(nickel).to.equal(14.85);
    expect(dime).to.equal(14.80);
  });

  it('should return 0 (eg. rather than infinity) if input is invalid', () => {

  });
});
