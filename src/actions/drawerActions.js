function showDrawer() {
  return {
    type: 'SHOW_DRAWER',
    payload: true,
  }
}

function hideDrawer() {
  return {
    type: 'HIDE_DRAWER',
    payload: false,
  }
}

export { showDrawer, hideDrawer };
