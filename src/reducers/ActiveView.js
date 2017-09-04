export default function activeView(state = { type: null, payload: null }, action) {
  switch (action.type) {
    case 'SHOW_EDIT_VIEW':
    case 'SHOW_USER_PROFILE':
    case 'SHOW_DISTRIBUTE_TIPS':
      return action;
    default:
      return state;
  }
}
