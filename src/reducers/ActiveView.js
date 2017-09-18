export default function activeView(state = { type: null, payload: { selection: null, key: null } }, action) {
  switch (action.type) {
    case 'SHOW_EDIT_VIEW':
    case 'SHOW_USER_PROFILE':
    case 'SHOW_DISTRIBUTE_TIPS':
    case 'SHOW_EDIT_PEOPLE':
    case 'SHOW_EDIT_STORES':
      return action;
    default:
      return state;
  }
}
