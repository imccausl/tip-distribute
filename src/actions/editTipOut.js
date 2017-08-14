export default function editTipOut(tipOutId, newData) {
  return {
    type: 'EDIT_TIP_OUT',
    payload: {
      tipOutId,
      newData,
    },
  };
}
