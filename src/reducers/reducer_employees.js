
const initialState = [{weekEnding: 'July 20',
    totalCash: 228,
    employees: [
      { id: 1, name: 'Ian McCausland', hours: '40' },
      { id: 2, name: 'Kathleen James', hours: '40' },
      { id: 3, name: 'Khavy Tran', hours: '35' },
      { id: 4, name: 'John Reyes', hours: '30' },
      { id: 5, name: 'Kyle Lee', hours: '24' },
    ],
  },
  {
    weekEnding: 'July 27',
    totalCash: 200,
    employees: [
      { id: 1,name: 'Ian McCausland', hours: '40' },
      { id: 2,name: 'Kathleen James', hours: '40' },
      { id: 3,name: 'Khavy Tran', hours: '35' },
      { id: 4,name: 'John Reyes', hours: '30' },
      { id: 5,name: 'Kyle Lee', hours: '24' },
      { id: 6,name: 'Johnny Lee Miller', hours: '24' },
      { id: 7,name: 'Drishti Thakar', hours: '10' },
      { id: 8,name: 'Paul Sheffield', hours: '28' },
    ],
  },
  {
    weekEnding: 'August 2',
    totalCash: 189,
    employees: [
      { id: 1,name: 'Ian McCausland', hours: '40' },
      { id: 2,name: 'Kathleen James', hours: '40' },
      { id: 3,name: 'Khavy Tran', hours: '35' },
      { id: 4,name: 'John Reyes', hours: '30' },
      { id: 5,name: 'Kyle Lee', hours: '24' },
      { id: 6,name: 'Johnny Lee Miller', hours: '24' },
      { id: 7,name: 'Drishti Thakar', hours: '10' },
      { id: 8,name: 'Paul Sheffield', hours: '28' },
    ],
  },
  {
    weekEnding: 'August 9',
    totalCash: 205,
    employees: [
      { id: 1,name: 'Ian McCausland', hours: '40' },
      { id: 2,name: 'Kathleen James', hours: '40' },
      { id: 3,name: 'Khavy Tran', hours: '35' },
      { id: 4,name: 'John Reyes', hours: '30' },
      { id: 5,name: 'Kyle Lee', hours: '24' },
      { id: 6,name: 'Johnny Lee Miller', hours: '24' },
      { id: 7,name: 'Drishti Thakar', hours: '10' },
      { id: 8,name: 'Paul Sheffield', hours: '28' },
    ],
  }
];

export default function tipOutsReducer(state = initialState, action){
  switch (action.type) {
    case 'ADD_NEW_TIP_OUT':
      return [
        ...state,
        {
          weekEnding: action.payload.weekEnding,
          totalCash: action.payload.totalCash,
          employees: action.payload.employees,
        },
      ];
    default:
      return state;
  }
}
