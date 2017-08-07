
function toggleAddPeopleDialog(state = false, action) {
  switch (action.type) {
    case 'SHOW_ADD_PEOPLE_DIALOG':
      return action.payload;
    case 'HIDE_ADD_PEOPLE_DIALOG':
      return action.payload;
    default:
      return state;
  }
}

export default toggleAddPeopleDialog;
