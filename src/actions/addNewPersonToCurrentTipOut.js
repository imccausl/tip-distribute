import makeNewId from '../helpers/makeNewId';

export default function addNewPersonToCurrentTipOut(person) {
  return {
    type: 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT',
    payload: {
      index: person.index,
      id: makeNewId(),
      name: person.name,
      hours: person.hours,
    },
  };
}
