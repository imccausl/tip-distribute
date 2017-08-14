
export default function showModal(state = null, action = {}) {
  switch (action.type) {
    case 'SHOW_MODAL':
    case 'CONFIRM_DIALOG_SHOW':
      return action.payload;
    default:
      return state;
  }
}
