import initializeTipOutData from '../helpers/populateStateHelpers';

const initialState = {};

export default function tipOutsReducer(state = initialState, action) {
  switch (action.type) {
    case 'TIP_OUTS_CREATED':
      return initializeTipOutData(
        action.payload.profile,
        action.payload.tipOuts,
        action.payload.people,
        action.payload.stores,
      );
    case 'ADD_NEW_TIP_OUT':
      return [
        ...state,
        {
          id: action.payload.ref,
          createdBy: action.payload.createdBy,
          timestamp: action.payload.timestamp,
          weekEnding: action.payload.weekEnding,
          totalCash: action.payload.totalCash,
          hourlyWage: 0,
          totalHours: 0,
          store: action.payload.store,
          people: action.payload.people,
        },
      ];
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT': // FYI: people added here (to the full tipOutsCreated list) get
                                          // immediately deleted because the list is then re-populated with
                                          // the firebase source data.
      return state.map((tipOut) => {
        if (tipOut.ref === action.payload.belongsTo) {
          const appendedTipOut = Object.assign({}, tipOut);
          appendedTipOut.people = {
            ...appendedTipOut.people,
            ...action.payload.people,
          };

          return appendedTipOut;
        }
        return tipOut;
      });
    case 'UPDATE_PERSON':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.belongsTo) {
          return {
            ref: tipOut.ref,
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
