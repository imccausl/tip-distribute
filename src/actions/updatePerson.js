export default function updatePerson(person) {
  return {
    type: 'UPDATE_PERSON',
    payload: {
      fromIndex: person.fromIndex,
      id: person.id,
      name: person.name,
      hours: person.hours,
    },
  };
}
