export default function activeEmployees(state = null, action) {
  switch (action.type) {
    case 'EMPLOYEES_SELECTED':
      return action.payload;
    case 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT':
      return [
        ...action.payload,
      ];
    default:
      return state;
  }
}
