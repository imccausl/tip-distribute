
function showDrawer(state = true, action) {
  switch (action.type) {
    case 'SHOW_DRAWER':
      return action.payload;
    case 'HIDE_DRAWER':
      return action.payload;
    default:
      return state;
  }
}

export default showDrawer;
