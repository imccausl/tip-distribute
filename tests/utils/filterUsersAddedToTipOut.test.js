import chai from 'chai';
import { filterUsersAddedToTipOut } from '../../src/helpers/currentTipOutHelpers';

const expect = chai.expect;

describe('filterUsersAddedToTipOut', () => {
  const allUsersStub = {
    '11u': { belongsTo: '1z', id: '11u', name: 'Jeanyoung', hours: '3' },
    '12u': { belongsTo: '1z', id: '12u', name: 'Giselle', hours: '3' },
    '13u': { belongsTo: '1z', id: '13u', name: 'Jihyn', hours: '3' },
    '14u': { belongsTo: '1z', id: '14u', name: 'Kjavy', hours: '3' },
    '15u': { belongsTo: '1z', id: '15u', name: 'Kathleen', hours: '3' },
    '16u': { belongsTo: '1z', id: '16u', name: 'Trevor', hours: '3' },
    '17u': { belongsTo: '1z', id: '17u', name: 'John', hours: '3' },
  };

  const result = ['11u', '13u', '16u'];

  const usersAddedStub = [
    { belongsTo: '1z', id: '12u', name: 'Giselle', hours: '3' },
    { belongsTo: '1z', id: '14u', name: 'Kjavy', hours: '3' },
    { belongsTo: '1z', id: '15u', name: 'Kathleen', hours: '3' },
    { belongsTo: '1z', id: '17u', name: 'John', hours: '3' },
  ];

  it('should not show users already added to the current tip out', () => {
    const newArray = filterUsersAddedToTipOut(allUsersStub, usersAddedStub);
    expect(newArray).to.deep.equal(result);
  });
});
