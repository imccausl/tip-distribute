function activeTipOut(state = null, action) {
  console.log("ActiveTipOut:", state, action);
  switch (action.type) {
    case 'TIPOUT_SELECTED':
      return action.payload;
    default:
      return state;
  }
}

export default activeTipOut;
