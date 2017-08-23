import initializeTipOutData from '../helpers/populateStateHelpers';

const initialState = {};

export default function tipOutsReducer(state = initialState, action) {
  switch (action.type) {
    case 'TIP_OUTS_CREATED':
      return initializeTipOutData(
        action.payload.profile,
        action.payload.tipOuts,
        action.payload.allPeople,
        action.payload.stores,
      );
    case 'ADD_NEW_TIP_OUT':
      return [
        ...state,
        {
          id: action.payload.id,
          creator: action.payload.creator,
          timestamp: action.payload.exactDate,
          weekEnding: action.payload.weekEnding,
          totalCash: action.payload.totalCash,
          hourlyWage: 0,
          totalHours: 0,
          store: action.payload.store,
          employees: [action.payload.employees],
        },
      ];
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.belongsTo) {
          const appendedTipOut = Object.assign({}, tipOut);
          appendedTipOut.employees = action.payload.employees;
          return appendedTipOut;
        }
        return tipOut;
      });
    case 'UPDATE_PERSON':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.belongsTo) {
          return {
            id: tipOut.id,
            exactDate: tipOut.exactDate,
            weekEnding: tipOut.weekEnding,
            totalCash: tipOut.totalCash,
            employees: tipOut.employees.map(
              employee => (employee.id === action.payload.id) ? { id: action.payload.id, name: action.payload.name, hours: action.payload.hours } : employee,
            ),
          };
        }

        return tipOut;
      });
    case 'EDIT_TIP_OUT':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.tipOutId) {
          return {
            id: tipOut.id,
            exactDate: action.payload.newData.exactDate,
            weekEnding: action.payload.newData.weekEnding,
            totalCash: action.payload.newData.totalCash,
            employees: tipOut.employees,
          };
        }

        return tipOut;
      });
    case 'DELETE_TIP_OUT':
      return state.filter(tipOut => tipOut.id !== action.payload);
    case 'DELETE_PERSON':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.belongsTo) {
          return {
            id: tipOut.id,
            exactDate: tipOut.exactDate,
            weekEnding: tipOut.weekEnding,
            totalCash: tipOut.totalCash,
            employees: tipOut.employees.filter(employee => employee.id !== action.payload.id),
          };
        }

        return tipOut;
      });
    default:
      return state;
  }
}
