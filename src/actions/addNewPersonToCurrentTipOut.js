export default function addNewPersonToCurrentTipOut(person) {
  return {
    type: 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT',
    payload: {
      id: person.id,
      name: person.name,
      hours: person.hours,
    },
  };
}
