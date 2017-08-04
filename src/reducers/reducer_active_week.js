function activeWeek(state = null, action) {
  switch (action.type) {
    case 'WEEK_SELECTED':
      return action.payload;
    default:
      return state;
  }
}

export default activeWeek;
