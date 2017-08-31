export default function updateTipOuts(belongsTo, people) {
  return {
    type: 'ADD_PEOPLE_TO_CURRENT_TIP_OUT',
    payload: {
      belongsTo,
      people,
    },
  };
}
