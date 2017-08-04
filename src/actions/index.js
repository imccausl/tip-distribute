function selectEmployee(employee) {
  return {
    type: 'EMPLOYEE_SELECTED',
    payload: employee,
  };
}

export default selectEmployee;
