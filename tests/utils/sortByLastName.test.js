import chai from 'chai';
import { sortByLastName } from '../../src/helpers/currentTipOutHelpers';

const expect = chai.expect;

describe("sortByLastName(takes an array of people's names)", () => {
  it("should locate the last name from a string containing the person's full name", () => {
    const people = {
      z1p: {
        name: 'Jerry Paul Neusserman',
        belongsTo: '1z',
        id: '2u',
        hours: '31.6',
      },
      z2p: {
        name: 'Veynab Immervan',
        belongsTo: '1z',
        id: '3u',
        hours: '39.47',
      },
      z3p: {
        name: 'Ian McCausland',

        belongsTo: '1z',
        id: '4u',
        hours: '14.25',
      },
      z4p: {
        name: 'John Price',
        belongsTo: '1z',
        id: '5u',
        hours: '38.97',
      },
      z5p: {
        name: 'Glenn Alderson',
        belongsTo: '1z',
        id: '6u',
        hours: '19.58',
      },
      z6p: {
        name: 'Chang soek Lee',
        belongsTo: '1z',
        id: '7u',
        hours: '37.19',
      },
    };

    const sorted = [
      'Glenn Alderson',
      'Veynab Immervan',
      'Chang soek Lee',
      'Ian McCausland',
      'Jerry Paul Neusserman',
      'John Price',
    ];

    const sortedPeople = sortByLastName(people);
    const sortedNames = Object.keys(sortedPeople).map(key => sortedPeople[key].name);

    expect(sortedNames).to.have.ordered.members(sorted);
  });

  it("should find the last name even with names ending in 'Sr.', 'Jr.' or 'I', 'II', etc.", () => {
    const people = {
      z1p: {
        name: 'Jerry Paul Neusserman, Jr.',
        belongsTo: '1z',
        id: '2u',
        hours: '31.6',
      },
      z2p: {
        name: 'Zeynab Zimmerman II',
        belongsTo: '1z',
        id: '3u',
        hours: '39.47',
      },
      z3p: {
        name: 'Ian McCausland V',
        belongsTo: '1z',
        id: '4u',
        hours: '14.25',
      },
      z4p: {
        name: 'John Price Jr. III',
        belongsTo: '1z',
        id: '5u',
        hours: '38.97',
      },
      z5p: {
        name: 'Glenn Alderson, Sr.',
        belongsTo: '1z',
        id: '6u',
        hours: '19.58',
      },
      z6p: {
        name: 'Chang soek Lee Sr.',
        belongsTo: '1z',
        id: '7u',
        hours: '37.19',
      },
      z7p: {
        name: 'Paul Vi',
        belongsTo: '1z',
        id: '8u',
        hours: '37.19',
      },
      z8p: {
        name: 'Sherry Iv',
        belongsTo: '1z',
        id: '8u',
        hours: '37.19',
      },
    };

    const sorted = [
      'Glenn Alderson, Sr.',
      'Sherry Iv',
      'Chang soek Lee Sr.',
      'Ian McCausland V',
      'Jerry Paul Neusserman, Jr.',
      'John Price Jr. III',
      'Paul Vi',
      'Zeynab Zimmerman II',
    ];

    const sortedPeople = sortByLastName(people);
    const sortedNames = Object.keys(sortedPeople).map(key => sortedPeople[key].name);
    expect(sortedNames).to.have.ordered.members(sorted);
  });

  it("should put 'phantoms' (i.e. replacement/substitute workers) at the bottom of the list, ordering by employee number", () => {});

  it('should return an intelligable error if an object is not passed to it', () => {
    const people = [
      'Glenn Alderson, Sr.',
      'Sherry Iv',
      'Chang soek Lee Sr.',
      'Ian McCausland V',
      'Jerry Paul Neusserman, Jr.',
      'John Price Jr. III',
      'Paul Vi',
      'Zeynab Zimmerman II',
    ];

    expect(() => {
      const sortedPeople = sortByLastName(people);
    }).to.throw('Invalid argument: must be an object.');
  });
});
