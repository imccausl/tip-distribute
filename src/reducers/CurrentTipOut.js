function activeTipOut(state = null, action) {
  switch (action.type) {
    case 'DISPLAY_TIPOUT':
      return action.payload;
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      const newState = Object.assign({}, state);
      newState.employees = action.payload.employees;
      return newState;
    case 'EDIT_TIP_OUT':
      return {
        id: state.id,
        exactDate: action.payload.newData.exactDate,
        weekEnding: action.payload.newData.weekEnding,
        totalCash: action.payload.newData.totalCash,
        employees: state.employees,
      };
    case 'UPDATE_PERSON':
      return {
        id: state.id,
        exactDate: state.exactDate,
        weekEnding: state.weekEnding,
        totalCash: state.totalCash,
        employees: state.employees.map(
          employee => (employee.id === action.payload.id) ? { id: action.payload.id, name: action.payload.name, hours: action.payload.hours } : employee,
        ),
      };
    case 'DELETE_TIP_OUT':
      return null;
    case 'DELETE_PERSON':
      return {
        id: state.id,
        exactDate: state.exactDate,
        weekEnding: state.weekEnding,
        totalCash: state.totalCash,
        employees: state.employees.filter(employee => employee.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export default activeTipOut;
