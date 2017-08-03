import { combineReducers } from 'redux';
import EmployeesReducer from './reducer_employees';

const rootReducer = combineReducers({
  employees: EmployeesReducer,
});

export default rootReducer;
