function populateTipOutList(newState) {
  return {
    type: 'TIPOUT_SELECTED',
    payload: {
      index: newState.index,
      tipOut: newState.tipOut,
    },
  };
}

export default populateTipOutList;
