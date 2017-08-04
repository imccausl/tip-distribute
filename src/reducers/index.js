import { combineReducers } from 'redux';
import EmployeesReducer from './reducer_employees';
import ActiveEmployee from './reducer_active_employee';
import ShowModal from './reducer_show_modal';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
  activeEmployee: ActiveEmployee,
  showModal: ShowModal,
});

export default rootReducer;
