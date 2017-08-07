let personId = 0;

function addNewPersonToCurrentTipOut(person) {
  return {
    type: 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT',
    id: personId += 1,
    name: person.name,
    hours: person.hours,
  };
}

export default addNewPersonToCurrentTipOut;
