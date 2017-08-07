function activeTipOut(state = null, action) {
  console.log("ActiveTipOut:", state, action);  
  switch (action.type) {
    case 'TIPOUT_SELECTED':
      return action.payload;
    case 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT':
      console.log("state.employees", ...state.employees);
      return {
        weekEnding: state.weekEnding,
        totalCash: state.totalCash,
        employees: [
          ...state.employees,
          {
            id: action.payload.id,
            name: action.payload.name,
            hours: action.payload.hours,
          },
        ] };
    default:
      return state;
  }
}

export default activeTipOut;
