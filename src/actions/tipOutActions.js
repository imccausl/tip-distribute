function populateTipOutList(tipOut) {
  console.log(tipOut);
  return {
    type: 'POPULATE_LIST',
    payload: tipOut,
  }
}

export default populateTipOutList;
