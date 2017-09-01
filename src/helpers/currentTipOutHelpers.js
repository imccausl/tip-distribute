export function getPeopleFromTipOut(tipOut) {
  return Object.keys(tipOut.people).map(key => tipOut.people[key]);
}

export function getIndexOfPerson(list, name) {
  return list.map(person => person.name.toLowerCase()).indexOf(name.toLowerCase());
}

export function getPeopleFromStore(storeNum, stores, people) {
  return stores[storeNum].people.map((id) => {
    return {
      id,
      name: people[id].displayName,
    };
  });
}

export function sortByLastName(tipOut) {
  
}

export function filterUsersAddedToTipOut(allUsers, usersAdded) {
  const compareTo = usersAdded.map(user => user.id);

  return allUsers.filter(user => compareTo.indexOf(user.id) === -1);
}
