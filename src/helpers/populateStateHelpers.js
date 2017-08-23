function combinePeopleAndUsers(people, users) {
  return {
    ...people,
    ...users,
  };
}

function mapObj(obj, callback) {
  return Object.keys(obj).map(key => callback(key));
}

function matchPeopleToTipOuts(tipOut, allPeople, stores) {
  const newTipOutState = Object.assign(tipOut);

  newTipOutState.people = tipOut.people.map((person) => {
    return {
      belongsTo: person.belongsTo,
      id: person.id,
      name: allPeople[person.id].displayName,
      hours: person.hours,
    };
  });

  return newTipOutState;
}

function matchStoreToTipOuts(tipOut, stores) {
  const newTipOutState = Object.assign(tipOut);

  newTipOutState.store = stores[tipOut.store];

  return newTipOutState;
}

function calculateTotalHours(tipOut) {
  const newTipOutState = Object.assign(tipOut);
  const strippedHours = tipOut.people.map(person => parseFloat(person.hours));
  const totalHours = Math.round(strippedHours.reduce((curr, prev) => curr + prev, 0));

  newTipOutState.totalHours = totalHours;

  return newTipOutState;
}

function calculateWage(tipOut) {
  let newTipOutState = Object.assign(tipOut);
  let wage = 0;
  let totalHours = tipOut.totalHours;
  let totalCash = tipOut.totalCash

  if (tipOut.people && tipOut.totalHours === 0) {
    newTipOutState = calculateTotalHours(tipOut);
    totalHours = newTipOutState.totalHours;
  }

  if (typeof totalHours !== 'number') {
    totalHours = parseFloat(totalHours);
  }

  wage = parseFloat(tipOut.totalCash) / parseFloat(newTipOutState.totalHours);
  newTipOutState.hourlyWage = wage;

  return newTipOutState;
}


function getTipOutsCreatedByUser(profile, tipOuts) {
  return profile.tipOutsCreated.map(key => tipOuts[key]);
}

function getTipsBelongingToUser(profile, id, tipOuts) {
  return profile.belongsTo.map((key) => {    
    const newTipOutState = Object.assign(tipOuts[key]);
    newTipOutState.people = tipOuts[key].people.filter(person => person.id === id);

    return newTipOutState;
  });
}

export {
  combinePeopleAndUsers,
  matchPeopleToTipOuts,
  matchStoreToTipOuts,
  getTipOutsCreatedByUser,
  getTipsBelongingToUser,
  calculateTotalHours,
  calculateWage,
  mapObj,
};
