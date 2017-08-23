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

  newTipOutState.totalHours = totalHours || 0;

  return newTipOutState;
}

function calculateWage(tipOut) {
  let newTipOutState = Object.assign({}, tipOut);
  let wage = 0;
  let totalHours = tipOut.totalHours;
  let totalCash = tipOut.totalCash;

  if (tipOut.people && tipOut.totalHours === 0) {
    newTipOutState = calculateTotalHours(tipOut);
    totalHours = newTipOutState.totalHours;
  }

  if (typeof totalHours !== 'number') {
    totalHours = parseFloat(totalHours);
  }

  wage = parseFloat(totalCash) / parseFloat(totalHours);
  newTipOutState.hourlyWage = wage || 0;

  return newTipOutState;
}


function getTipOutsCreatedByUser(profile, tipOuts) {
  return profile.tipOutsCreated.map(key => tipOuts[key]);
}

function getTipsBelongingToUser(profile, tipOuts) {
  let newState = [];

  newState = profile.belongsTo.map((key) => {    
    let newTipOutState = Object.assign(tipOuts[key.id]);

    newTipOutState = calculateTotalHours(newTipOutState);
    newTipOutState = calculateWage(newTipOutState);
    newTipOutState.people = tipOuts[key.id].people.filter(person => person.id === profile.id);
    newTipOutState.people = newTipOutState.people.pop();
    newTipOutState.people.name = profile.displayName;
    newTipOutState.people.belongsTo = key;
    return newTipOutState;
  });

  return newState;
}

export default function initializeMainState(profile, tipOuts, allPeople, stores, type = 'TIP_OUTS') {
  let newState = {};

  if (type === 'TIP_OUTS') {
    newState = getTipOutsCreatedByUser(profile, tipOuts);
    newState = newState.map(tipOut => matchPeopleToTipOuts(tipOut, allPeople));
    newState = mapObj(tipOuts, calculateTotalHours);
    newState = mapObj(newState, calculateWage);
  } else {
    newState = getTipsBelongingToUser(profile, tipOuts);
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
