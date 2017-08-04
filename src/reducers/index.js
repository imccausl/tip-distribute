import { combineReducers } from 'redux';
import TipOutsReducer from './reducer_employees';
import ActiveEmployee from './reducer_active_employee';
import ActiveTipOut from './reducer_active_tipout';
import ShowModal from './reducer_show_modal';

const rootReducer = combineReducers({
  tipOuts: TipOutsReducer,
  activeTipOut: ActiveTipOut,
  activeEmployee: ActiveEmployee,
  showModal: ShowModal,
});

export default rootReducer;
