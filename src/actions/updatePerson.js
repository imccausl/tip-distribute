export default function updatePerson(person) {
  return {
    type: 'UPDATE_PERSON',
    payload: {
      belongsTo: person.belongsTo,
      id: person.id,
      name: person.name,
      hours: person.hours,
    },
  };
}
