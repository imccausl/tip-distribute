import { combineReducers } from 'redux';
import DataTree from './DataTree';
import CurrentTipOut from './CurrentTipOut';
import CurrentPerson from './CurrentPerson';
import ModalAction from './reducer_show_modal';
import ShowDrawer from './reducer_show_drawer';
import ActivePeople from './reducer_active_employees';

const rootReducer = combineReducers({
  dataTree: DataTree,
  currentTipOut: CurrentTipOut,
  currentPerson: CurrentPerson,
  activePeople: ActivePeople,
  modalAction: ModalAction,
  showDrawer: ShowDrawer,
});

export default rootReducer;