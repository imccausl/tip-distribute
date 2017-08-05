function populateTipOutList(tipOut) {
  return {
    type: 'TIPOUT_SELECTED',
    payload: tipOut,
  }
}

export default populateTipOutList;
