function combinePeopleAndUsers(people, users) {
  const combinedObj = people.concat(users);
  return combinedObj;
}

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

function getTipOutsCreatedByUser(profile, tipOuts) {
  console.log("getTipOuts",profile);
  return profile.tipOuts.created.map(key => tipOuts[key]);
}

function getTipsBelongingToUser(tipOuts, users, id) {
  return Object.keys(tipOuts).map((key, index) => {
    if (users[id].tipOuts.belongsTo[index].id === key) {
      const usersTips = Object.assign({}, tipOuts[key]);
      usersTips.people = usersTips.people.filter(person => person.id === id);

      return usersTips;
    }
    return null;
  });
}

export {
  combinePeopleAndUsers,
  matchPeopleToTipOuts,
  getTipOutsCreatedByUser,
  getTipsBelongingToUser,
};
