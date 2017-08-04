
function showModal(state = true, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.payload;
    case 'HIDE_MODAL':
      return action.payload;
    default:
      return state;
  }
}

export default showModal;
