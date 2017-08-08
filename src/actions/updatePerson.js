export default function updatePerson(person) {
  return {
    type: 'UPDATE_PERSON',
    payload: {
      name: person.name,
      hours: person.hours,
    },
  };
}
