import { combineReducers } from 'redux';
import TipOutsReducer from './reducer_employees';
import ActiveEmployee from './reducer_active_employee';
import ActiveTipOut from './reducer_active_tipout';
import ShowModal from './reducer_show_modal';
import ShowDrawer from './reducer_show_drawer';
import ShowTipOutDialog from './reducer_show_new_tip_out_dialog';
import ToggleAddPeopleDialog from './reducer_toggle_add_people_dialog';

const rootReducer = combineReducers({
  tipOuts: TipOutsReducer,
  activeTipOut: ActiveTipOut,
  activeEmployee: ActiveEmployee,
  showModal: ShowModal,
  showDrawer: ShowDrawer,
  showTipOutDialog: ShowTipOutDialog,
  toggleAddPeopleDialog: ToggleAddPeopleDialog,
});

export default rootReducer;
