export default function activeEmployees(state = null, action) {
  switch (action.type) {
    case 'EMPLOYEES_SELECTED':
      return action.payload;
    case 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          hours: action.payload.hours,
        },
      ];
    default:
      return state;
  }
}
