function activeWeek(state = null, action) {
  console.log(state, action);
  switch (action.type) {
    case 'WEEK_SELECTED':
      return action.payload;
    case 'ADD_NEW_TIP_OUT':
      return [
        ...state.tipOuts,
        {
          weekEnding: action.payload.weekEnding,
          totalCash: action.payload.totalCash,
          employees: action.payload.employees,
        },
      ];
    default:
      return state;
  }
}

export default activeWeek;
