function mapObj(obj, callback) {
  return Object.keys(obj).map(key => callback(obj[key]));
}

function matchPeopleToTipOuts(tipOut, allPeople) {
  const newTipOutState = Object.assign({}, tipOut);
  let tipOutPeopleWithNames = {};

  Object.keys(tipOut.people).forEach((person) => {
    const personObj = tipOut.people[person];
    const personId = personObj.id;
    const displayName = (!personId) ? '' : allPeople[personId].displayName;

    tipOutPeopleWithNames = {
      ...tipOutPeopleWithNames,
      [person]: {
        belongsTo: personObj.belongsTo,
        id: personId,
        name: displayName,
        hours: personObj.hours,
      }
    };
  });

  newTipOutState.people = tipOutPeopleWithNames;

  return newTipOutState;
}

function matchStoreToTipOuts(tipOuts, stores) {
  const newTipOutState = Object.assign({}, tipOuts);
  const tipOutKeys = Object.keys(tipOuts);

  tipOutKeys.forEach((key) => {
    const storeKey = newTipOutState[key].storeRef;    
    const storeNum = stores[storeKey].storeNum;
    const address = stores[storeKey].address;


    newTipOutState[key].storeInfo = {
      storeNum,
      address,
    };
  });

  return newTipOutState;
}

function calculateTotalHours(tipOut) {
  if (!tipOut.people) return 0;

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

  wage = (parseFloat(totalCash) / parseFloat(totalHours)).toFixed(2);

  return (wage === Infinity) ? 0 : wage;
}


function getTipOutsBelongingToStore(storeRef, stores, tipOuts) {
  const tipOutsBelongingToStore = stores[storeRef].tipOuts;
  const storeTipOuts = {};

  Object.keys(tipOutsBelongingToStore).forEach((key) => {
    const tipOutRef = tipOutsBelongingToStore[key].id;
    const tipOut = Object.assign({}, tipOuts[tipOutRef]);

    tipOut.ref = key;
    storeTipOuts[tipOutRef] = tipOut;
  });

  return storeTipOuts;
}

function getTipsBelongingToUser(profile, people, tipOuts) {
  let newState = [];
  const tips = people[profile.ref].belongsTo || [];

  newState = tips.map((key) => {
    const newTipOutState = Object.assign({}, tipOuts[key.id]);

    const entryId = Object.keys(newTipOutState.people)
      .filter(person => tipOuts[key.id].people[person].id === profile.ref).pop();
    const singlePerson = tipOuts[key.id].people[entryId];

    newTipOutState.ref = key.id;
    newTipOutState.people = { ref: entryId, ...singlePerson };

    return newTipOutState;
  });

  return newState;
}

function addHoursAndWageToTipOuts(tipOuts) {
  const newState = Object.assign({}, tipOuts);
  const Objkeys = Object.keys(newState);

  Objkeys.forEach((key) => {
    newState[key].totalHours = calculateTotalHours(newState[key]);
    newState[key].hourlyWage = calculateWage(newState[key]);
  });

  return newState;
}

function getUsersStore(profile, people) {
  return people[profile.ref].storeRef;
}
// Object as param instead of a million variables in a specific order?
export default function initializeMainState(profile, tipOuts, allPeople, stores, type = 'TIP_OUTS') {
  let newState = {};
  const userStore = getUsersStore(profile, allPeople);

  newState = addHoursAndWageToTipOuts(tipOuts);
  newState = matchStoreToTipOuts(newState, stores);

  if (type === 'TIP_OUTS') {
    newState = getTipOutsBelongingToStore(userStore, stores, newState);
    
    Object.keys(newState).forEach((tipOut) => {
      const matchedPeopleTipOut = matchPeopleToTipOuts(newState[tipOut], allPeople);
      newState[tipOut].people = matchedPeopleTipOut.people;
    });
  } else {
    newState = getTipsBelongingToUser(profile, allPeople, newState);
  }

  return newState;
}

export {
  matchPeopleToTipOuts,
  matchStoreToTipOuts,
  getTipOutsBelongingToStore,
  getTipsBelongingToUser,
  calculateTotalHours,
  calculateWage,
  mapObj,
};
