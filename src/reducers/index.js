import { combineReducers } from 'redux';
import TipOutsReducer from './reducer_employees';
import ActivePerson from './reducer_active_employee';
import ActiveTipOut from './reducer_active_tipout';
import ShowModal from './reducer_show_modal';
import ShowDrawer from './reducer_show_drawer';
import ShowTipOutDialog from './reducer_show_new_tip_out_dialog';
import ActivePeople from './reducer_active_employees';

const rootReducer = combineReducers({
  tipOuts: TipOutsReducer,
  activeTipOut: ActiveTipOut,
  activePeople: ActivePeople,
  activePerson: ActivePerson,
  showModal: ShowModal,
  showDrawer: ShowDrawer,
  showTipOutDialog: ShowTipOutDialog,
});

export default rootReducer;
