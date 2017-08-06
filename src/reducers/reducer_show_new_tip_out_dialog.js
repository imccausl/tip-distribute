
function showNewTipOutDialog(state = false, action) {
  switch (action.type) {
    case 'SHOW_NEW_TIP_OUT_DIALOG':
      return action.payload;
    case 'HIDE_NEW_TIP_OUT_DIALOG':
      return action.payload;
    default:
      return state;
  }
}

export default showNewTipOutDialog;
