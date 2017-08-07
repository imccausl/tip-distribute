export default function addNewTipOut(tipOuts) {
  console.log("in action:", tipOuts);
  return {
    type: 'ADD_NEW_TIP_OUT',
    payload: {
      weekEnding: tipOuts.weekEnding,
      totalCash: tipOuts.totalCash,
      employees: [{ id: 0, name: 'New Person', hours: '0' }],
    },
  };
}
