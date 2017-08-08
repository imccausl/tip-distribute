export default function selectPerson(person) {
  return {
    type: 'PERSON_SELECTED',
    payload: person,
  };
}
