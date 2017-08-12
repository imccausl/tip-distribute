
export default function showModal(state = null, action = {}) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return action.payload;
    default:
      return state;
  }
}
