import { getTipOutsBelongingToUser } from '../helpers/populateStateHelpers';

export default function tipsBelongingToUser(state = {}, action) {
  switch(action.type) {
    case 'TIP_OUTS_BELONGING_TO':
      return getTipOutsBelongingToUser(action.payload.profile, action.payload.tipOuts);
    default:
      return state;
  }
}