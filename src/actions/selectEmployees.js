export default function selectPerson(employees) {
  return {
    type: 'EMPLOYEES_SELECTED',
    payload: employees,
  };
}