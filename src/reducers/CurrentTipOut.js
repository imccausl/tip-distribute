import { matchPeopleToTipOuts } from '../helpers/populateStateHelpers';
import makeNewId from '../helpers/makeNewId';

function activeTipOut(state = null, action) {
  switch (action.type) {
    case 'DISPLAY_TIPOUT':
      return matchPeopleToTipOuts(action.payload.tipOut, action.payload.people);
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      const newState = Object.assign({}, state);

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
      return {
        id: state.id,
        exactDate: state.exactDate,
        weekEnding: state.weekEnding,
        totalCash: state.totalCash,
        people: state.people.filter(person => person.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export default activeTipOut;
