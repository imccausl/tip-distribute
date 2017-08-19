function populateTipOutList(newState) {
  return {
    type: 'DISPLAY_TIPOUT',
    payload: newState,
  };
}

function populateState(obj) {
  return {
    type: 'POPULATE_STATE',
    payload: {
      profile: obj.profile,
      tipOuts: obj.tipOuts,
    },
  };
}

export {
  populateTipOutList,
  populateState,
};
