import initializeTipsState from '../helpers/populateStateHelpers';

export default function tipsBelongingToUser(state = {}, action) {
  switch(action.type) {
    case 'TIPS_BELONGING_TO':
      return initializeTipsState(
        action.payload.profile,
        action.payload.tipOuts,
        action.payload.people,
        action.payload.stores,
        action.type,
      );
    default:
      return state;
  }
}