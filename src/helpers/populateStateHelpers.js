function combinePeopleAndUsers(people, users) {
  return {
    ...people,
    ...users,
  };
}

function mapObj(obj, callback) {
  return Object.keys(obj).map(key => callback(obj[key]));
}

function matchPeopleToTipOuts(tipOut, allPeople) {
  const newTipOutState = Object.assign({}, tipOut);
  const tipOutPeopleWithNames = Object.keys(tipOut.people).map((person) => {
    const personObj = tipOut.people[person];
    const personId = personObj.id;
    const displayName = (!personId) ? '' : allPeople[personId].displayName;

    return {
      belongsTo: personObj.belongsTo,
      id: personId,
      name: displayName,
      hours: personObj.hours,
    };
  });

  newTipOutState.people = tipOutPeopleWithNames;

  return newTipOutState;
}

function matchStoreToTipOuts(tipOut, stores) {
  const newTipOutState = Object.assign({}, tipOut);

  newTipOutState.store = stores[tipOut.store];

  return newTipOutState;
}

function calculateTotalHours(tipOut) {
  const strippedHours = Object.keys(tipOut.people)
    .map(person => parseFloat(tipOut.people[person].hours));
  const totalHours = Math.round(strippedHours.reduce((curr, prev) => curr + prev, 0));

  return totalHours || 0;
}

function calculateWage(tipOut) {
  let wage = 0;
  let totalHours = tipOut.totalHours;
  const totalCash = tipOut.totalCash;

  if (typeof totalHours !== 'number') {
    totalHours = parseFloat(totalHours);
  }

  wage = parseFloat(totalCash) / parseFloat(totalHours);

  return wage || 0;
}


function getTipOutsCreatedByUser(profile, tipOuts) {
  return profile.tipOutsCreated.map(key => tipOuts[key]);
}

function getTipsBelongingToUser(profile, tipOuts) {
  let newState = [];

  newState = profile.belongsTo.map((key) => {
    let newTipOutState = Object.assign({}, tipOuts[key.id]);

    const entryId = Object.keys(newTipOutState.people)
      .filter(person => tipOuts[key.id].people[person].id === profile.id).pop();
    const singlePerson = tipOuts[key.id].people[entryId];
    newTipOutState.people = singlePerson;

    return newTipOutState;
  });

  return newState;
}

function addHoursAndWageToTipOuts(tipOuts) {
  const newState = Object.assign({}, tipOuts);
  const Objkeys = Object.keys(newState);

  Objkeys.forEach((key) => {
    newState[key].totalHours = calculateTotalHours(newState[key]);
    newState[key].hourlyWage = calculateWage(newState[key])
  });

  return newState;
}

export default function initializeMainState(profile, tipOuts, allPeople, stores, type = 'TIP_OUTS') {
  let newState = {};

  newState = addHoursAndWageToTipOuts(tipOuts);

  if (type === 'TIP_OUTS') {
    newState = getTipOutsCreatedByUser(profile, newState);
    newState = newState.map(tipOut => matchPeopleToTipOuts(tipOut, allPeople));
  } else {
    newState = getTipsBelongingToUser(profile, newState);
  }

  return newState;
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
