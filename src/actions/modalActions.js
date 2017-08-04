function showModal() {
  return {
    type: 'SHOW_MODAL',
    payload: true,
  }
}

function hideModal() {
  return {
    type: 'HIDE_MODAL',
    payload: false,
  }
}

export { showModal, hideModal };
