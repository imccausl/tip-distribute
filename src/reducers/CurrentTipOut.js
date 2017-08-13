function activeTipOut(state = null, action) {
  switch (action.type) {
    case 'DISPLAY_TIPOUT':
      return action.payload;
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      const newState = Object.assign({}, state);
      newState.employees = action.payload.employees;
      return newState;
    default:
      return state;
  }
}

export default activeTipOut;
