function activeTipOut(state = null, action) {
  console.log("ActiveTipOut:", state, action);
  switch (action.type) {
    case 'TIPOUT_SELECTED':
      return action.payload;
    case 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT':
      return Object.assign({}, state, {
        index: state.index,
        tipOut: {
          weekEnding: state.tipOut.weekEnding,
          totalCash: state.tipOut.totalCash,
          employees: [...state.tipOut.employees,
            {
              id: action.payload.id,
              name: action.payload.name,
              hours: action.payload.hours,
            },
          ],
        }
      });
    default:
      return state;
  }
}

export default activeTipOut;
