import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import AllTipOuts from './TipOuts';
import CurrentTipOut from './CurrentTipOut';
import CurrentPerson from './CurrentPerson';
import ModalAction from './reducer_show_modal';
import ShowDrawer from './reducer_show_drawer';
import Tips from './Tips';
import ActiveView from './ActiveView';
import TipsBelongingToUser from './TipsBelongingToUser';

const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  activeView: ActiveView,
  modalAction: ModalAction,
  showDrawer: ShowDrawer,
});

export default rootReducer;
