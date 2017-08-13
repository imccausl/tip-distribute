// import makeNewId from '../helpers/makeNewId';

export default function addNewTipOut(tipOut) {
  // const tipOutId = makeNewId();

  return {
    type: 'ADD_NEW_TIP_OUT',
    payload: tipOut,
  };
}
