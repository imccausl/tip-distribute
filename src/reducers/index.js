import { combineReducers } from 'redux';
import TipOutsReducer from './reducer_employees';
import ActiveEmployee from './reducer_active_employee';
import ActiveTipOut from './reducer_active_tipout';
import ShowModal from './reducer_show_modal';
import ShowDrawer from './reducer_show_drawer';

const rootReducer = combineReducers({
  tipOuts: TipOutsReducer,
  activeTipOut: ActiveTipOut,
  activeEmployee: ActiveEmployee,
  showModal: ShowModal,
  showDrawer: ShowDrawer,
});

export default rootReducer;
