function matchPeopleToTipOuts(tipOut, allPeople) {
  const tipOutState = Object.assign({}, tipOut);

  tipOutState.people = tipOutState.people.map(person => [{
    belongsTo: person.belongsTo,
    id: person.person,
    name: allPeople[person.person].displayName,
    hours: person.hours,
  }]);

  return tipOutState;
}

function getTipOutsCreatedByUser(tipOut, userId) {
  return Object.keys(tipOut).map(key => 
  )
}

export {
  matchPeopleToTipOuts,
  getTipOutsCreatedByUser,
};
