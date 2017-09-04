import chai from 'chai';
import { filterUsersAddedToTipOut } from '../src/helpers/currentTipOutHelpers';

const expect = chai.expect;

describe('filterUsersAddedToTipOut', () => {
  const allUsersStub = [
    { belongsTo: '1z', id: '11u', name: 'Jeanyoung', hours: '3' },
    { belongsTo: '1z', id: '12u', name: 'Giselle', hours: '3' },
    { belongsTo: '1z', id: '13u', name: 'Jihyn', hours: '3' },
    { belongsTo: '1z', id: '14u', name: 'Kjavy', hours: '3' },
    { belongsTo: '1z', id: '15u', name: 'Kathleen', hours: '3' },
    { belongsTo: '1z', id: '16u', name: 'Trevor', hours: '3' },
    { belongsTo: '1z', id: '17u', name: 'John', hours: '3' },
  ];

  const result = [
    { belongsTo: '1z', id: '11u', name: 'Jeanyoung', hours: '3' },
    { belongsTo: '1z', id: '13u', name: 'Jihyn', hours: '3' },
    { belongsTo: '1z', id: '16u', name: 'Trevor', hours: '3' },
  ];

  const usersAddedStub = [
    { belongsTo: '1z', id: '12u', name: 'Giselle', hours: '3' },
    { belongsTo: '1z', id: '14u', name: 'Kjavy', hours: '3' },
    { belongsTo: '1z', id: '15u', name: 'Kathleen', hours: '3' },
    { belongsTo: '1z', id: '17u', name: 'John', hours: '3' },
  ];

  it('should not show users already added to the current tip out', () => {
    let newArray = filterUsersAddedToTipOut(allUsersStub, usersAddedStub);
    expect(newArray).to.deep.equal(result);
  });
});
