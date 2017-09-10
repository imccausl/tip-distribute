const stateType = {
  TIP_OUTS_CREATED: 'TIP_OUTS_CREATED',
  TIPS_BELONGING_TO: 'TIPS_BELONGING_TO',
};

function populateTipOutList(newState) {
  return {
    type: 'DISPLAY_TIPOUT',
    payload: { tipOut: newState.tipOut, users: newState.users, people: newState.people },
  };
}

function populateState(obj, stateType = 'TIP_OUTS_CREATED') {
  return {
    type: stateType,
    payload: {
      profile: obj.profile,
      tipOuts: obj.fbTipOuts,
      stores: obj.stores,
      people: obj.people,
    },
  };
}

function deletePersonFromTipOut(personKey) {
  return {
    type: 'DELETE_PERSON',
    payload: {
      personKey,
    },
  };
}

export {
  populateTipOutList,
  populateState,
  deletePersonFromTipOut,
};
