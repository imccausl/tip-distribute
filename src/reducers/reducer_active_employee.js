function activeEmployee(state = null, action) {
  switch (action.type) {
    case 'EMPLOYEE_SELECTED':
      return action.payload;
    default:
      return state;
  }
}

export default activeEmployee;
