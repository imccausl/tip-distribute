const initialState = [
  //{
  //   weekEnding: 'July 20',
  //   totalCash: 228,
  //   employees: [
  //     { id: '1', name: 'Ian McCausland', hours: '40' },
  //     { id: '2', name: 'Kathleen James', hours: '40' },
  //     { id: '3', name: 'Khavy Tran', hours: '35' },
  //     { id: '4', name: 'John Reyes', hours: '30' },
  //     { id: '5', name: 'Kyle Lee', hours: '24' },
  //   ],
  // },
  // {
  //   id:
  //   weekEnding: 'July 27',
  //   totalCash: 200,
  //   employees: [
  //     { id: '6',name: 'Ian McCausland', hours: '40', belongsTo: },
  //     { id: '7',name: 'Kathleen James', hours: '40' },
  //     { id: '8',name: 'Khavy Tran', hours: '35' },
  //     { id: '9',name: 'John Reyes', hours: '30' },
  //     { id: '10',name: 'Kyle Lee', hours: '24' },
  //     { id: '11',name: 'Johnny Lee Miller', hours: '24' },
  //     { id: '12',name: 'Drishti Thakar', hours: '10' },
  //     { id: '13',name: 'Paul Sheffield', hours: '28' },
  //   ],
  // },
  // {
  //   weekEnding: 'August 2',
  //   totalCash: 189,
  //   employees: [
  //     { id: '14',name: 'Ian McCausland', hours: '40' },
  //     { id: '24',name: 'Kathleen James', hours: '40' },
  //     { id: '34',name: 'Khavy Tran', hours: '35' },
  //     { id: '44',name: 'John Reyes', hours: '30' },
  //     { id: '54',name: 'Kyle Lee', hours: '24' },
  //     { id: '64',name: 'Johnny Lee Miller', hours: '24' },
  //     { id: '74',name: 'Drishti Thakar', hours: '10' },
  //     { id: '84',name: 'Paul Sheffield', hours: '28' },
  //   ],
  // },
  // {
  //   weekEnding: 'August 9',
  //   totalCash: 205,
  //   employees: [
  //     { id: '18',name: 'Ian McCausland', hours: '40' },
  //     { id: '28',name: 'Kathleen James', hours: '40' },
  //     { id: '38',name: 'Khavy Tran', hours: '35' },
  //     { id: '48',name: 'John Reyes', hours: '30' },
  //     { id: '58',name: 'Kyle Lee', hours: '24' },
  //     { id: '68',name: 'Johnny Lee Miller', hours: '24' },
  //     { id: '78',name: 'Drishti Thakar', hours: '10' },
  //     { id: '88',name: 'Paul Sheffield', hours: '28' },
  //   ],
 // },
];

export default function tipOutsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NEW_TIP_OUT':
      return [
        ...state,
        {
          id: action.payload.id,
          exactDate: action.payload.exactDate,
          weekEnding: action.payload.weekEnding,
          totalCash: action.payload.totalCash,
          employees: [action.payload.employees],
        },
      ];
    case 'ADD_PEOPLE_TO_CURRENT_TIP_OUT':
      return state.map((tipOut) => {
        if (tipOut.id === action.payload.belongsTo) {
          let appendedTipOut = Object.assign({}, tipOut);
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
    default:
      return state;
  }
}
