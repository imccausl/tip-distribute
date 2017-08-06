function showNewTipOutDialog() {
  return {
    type: 'SHOW_NEW_TIP_OUT_DIALOG',
    payload: true,
  }
}

function hideNewTipOutDialog() {
  return {
    type: 'HIDE_NEW_TIP_OUT_DIALOG',
    payload: false,
  }
}

export { showNewTipOutDialog, hideNewTipOutDialog };
