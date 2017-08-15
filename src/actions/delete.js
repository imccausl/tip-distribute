function deletePerson(id, belongsTo) {
  return {
    type: 'DELETE_PERSON',
    payload: {
      id,
      belongsTo,
    },
  };
}

function deleteTipOut(id) {
  return {
    type: 'DELETE_TIP_OUT',
    payload: id,
  };
}

export { deletePerson, deleteTipOut };
