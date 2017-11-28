export function getPeopleFromTipOut(tipOut) {
  return Object.keys(tipOut.people).map(key => tipOut.people[key]);
}

export function doesPersonExist(list, name) {
  const personExists = list
    .map(person => person.displayName.toLowerCase().indexOf(name.toLowerCase()))
    .filter(value => value !== -1);
  if (!personExists.toString()) {
    return false;
  }

  return true;
}

export function getIdOfStorePersonFromName(name, storeRef, stores, people) {
  const storePeople = stores[storeRef].people;
  let allStorePeople = {};

  // make a people object from the storePeople array
  storePeople.forEach(personId => {
    allStorePeople = {
      ...allStorePeople,
      [personId]: people[personId],
    };
  });

  // get the key -- there should only be one, since we are searching by store people,
  // otherwise we're grabbing the first one. This *could* be potentially problematic,
  // but this problem is an extreme edge case.
  const personKey = Object.keys(allStorePeople)
    .filter(key => allStorePeople[key].displayName.toLowerCase() === name.toLowerCase())
    .shift();

  return personKey || null;
}

export function getAllPeopleBelongingToTipOut(tipOut) {
  const { people } = tipOut;

  return Object.keys(people).map(person => people[person].id);
}

export function getPeopleFromStore(storeNum, stores, people) {
  return stores[storeNum].people.map(id => ({
    id,
    name: people[id].displayName,
  }));
}

export function sortByLastName(people) {
  if (!Object.prototype.toString.call()) {
    throw new Error('Invalid argument: must be an object');
  }

  function getLastName(name) {
    // TODO: Get the last word in a name to use as last name, identify and flag phantoms for separate sorting
    const nameParts = name.split(' ');
    let lastName = nameParts.pop();

    if (lastName.search(/(Jr\.?|Sr\.?|\bI{1,3}\b|\bIV\b|\bV\b)/) !== -1) {
      lastName = nameParts.pop();
    }

    return lastName;
  }

  const sortedKeys = Object.keys(people).sort((a, b) => {
    const lastName1 = getLastName(people[a].name);
    const lastName2 = getLastName(people[b].name);

    if (lastName1 > lastName2) return 1;
    if (lastName1 < lastName2) return -1;
    return 0;
  });

  const sortedPeople = {};

  sortedKeys.forEach(key => {
    sortedPeople[key] = people[key];
  });

  return sortedPeople;
}

export function filterUsersAddedToTipOut(allUsers, usersAdded) {
  const compareTo = usersAdded.map(user => user.id);
  // allUsers should be an array of people ids belonging to a store
  // I switched this to get the ids of all users in the system for now
  // because the end goal is to be able to add anyone to a tip out
  // since anyone is a potential 'phantom' (sbux word for fill-in barista from another store)...
  // .. maybe it's the ALS software's name for it. Whatever.
  return Object.keys(allUsers).filter(user => compareTo.indexOf(user) === -1);
}

export function calculateExpiry(dateFinalized, daysTillExpired) {
  // get current date, subtract from expiry date and return how many days until tip out expires.
  let whenExpires = daysTillExpired;
  let startDate = dateFinalized;

  if (typeof daysTillExpired === 'string') {
    whenExpires = parseInt(daysTillExpired, 10);
  }

  if (typeof dateFinalized !== 'number') {
    startDate = Date.parse(dateFinalized);
  }

  const today = Date.now();
  const timePassed = today - startDate;
  // TODO: account for daylight savings time and other oddities.
  // milliseconds / seconds / minutes / hours-in-a-day
  const daysPassed = timePassed / 1000 / 60 / 60 / 24;
  const expiresIn = Math.ceil(whenExpires - daysPassed);

  return (expiresIn >= 0) ? expiresIn : 0;
}
