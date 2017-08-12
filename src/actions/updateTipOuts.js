export default function updateTipOuts(belongsTo, employees) {
  return {
    type: 'ADD_PEOPLE_TO_CURRENT_TIP_OUT',
    payload: {
      belongsTo,
      employees,
    },
  };
}
