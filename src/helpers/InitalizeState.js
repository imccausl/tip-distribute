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

function getTipOutsCreatedByUser(tipOuts, userId) {
  return Object.keys(tipOuts).map((key) => {
    if (tipOuts[key].created === userId) {
      return tipOuts[key];
    }

    return null;
  });
}

export {
  matchPeopleToTipOuts,
  getTipOutsCreatedByUser,
};
