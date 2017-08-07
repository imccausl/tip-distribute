function showAddPeopleDialog() {
  return {
    type: 'SHOW_ADD_PEOPLE_DIALOG',
    payload: true,
  }
}

function hideAddPeopleDialog() {
  return {
    type: 'HIDE_ADD_PEOPLE_DIALOG',
    payload: false,
  }
}

export { showAddPeopleDialog, hideAddPeopleDialog };
