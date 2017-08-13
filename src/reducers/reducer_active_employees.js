export default function activeEmployees(state = null, action) {
  console.log("REDUCERS ACTIVATED!", "ActionType:", action.type, "THE PAYLOAD", action.payload, "prevState:", state);
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
