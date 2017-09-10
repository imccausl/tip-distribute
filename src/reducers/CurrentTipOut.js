import { matchPeopleToTipOuts } from '../helpers/populateStateHelpers';

function activeTipOut(state = null, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'DISPLAY_TIPOUT':
      return matchPeopleToTipOuts(action.payload.tipOut, action.payload.people);
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      newState.people = {
        ...newState.people,
        ...action.payload.people,
      };

      return newState;
    case 'EDIT_TIP_OUT':
      return {
        id: state.id,
        exactDate: action.payload.newData.exactDate,
        weekEnding: action.payload.newData.weekEnding,
        totalCash: action.payload.newData.totalCash,
        people: state.people,
      };
    case 'UPDATE_PERSON':
      return {
        id: state.id,
        exactDate: state.exactDate,
        weekEnding: state.weekEnding,
        totalCash: state.totalCash,
        people: state.people.map(
          employee => (employee.id === action.payload.id) ? { id: action.payload.id, name: action.payload.name, hours: action.payload.hours } : employee,
        ),
      };
    case 'DELETE_TIP_OUT':
      return null;
    case 'DELETE_PERSON':
      console.log(action.payload.personKey)
      const newPeople = Object.keys(state.people)
        .filter(key => key !== action.payload.personKey)
        .reduce((result, current) => {
          const newObj = result;
          newObj[current] = state.people[current];
          return newObj;
        }, {});
        newState.people = newPeople;
      return newState;
    default:
      return state;
  }
}

export default activeTipOut;
