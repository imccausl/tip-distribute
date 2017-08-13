function populateTipOutList(newState) {
  return {
    type: 'DISPLAY_TIPOUT',
    payload: newState,
  };
}

export default populateTipOutList;
