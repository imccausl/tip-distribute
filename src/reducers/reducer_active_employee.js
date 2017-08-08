export default function activePerson(state = null, action) {
  switch (action.type) {
    case 'PERSON_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
