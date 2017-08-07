function addPersonToCurrentTipOut(state = null, action) {
  switch (action.type) {
    case 'ADD_NEW_PERSON_TO_CURRENT_TIP_OUT':
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          hours: action.hours,
        },
      ];
    default:
      return state;
  }
}

export default addPersonToCurrentTipOut;
