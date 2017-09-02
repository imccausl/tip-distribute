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

export function sortByLastName(people) {
  const getLastName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.pop();
  };

  const sortedKeys = Object.keys(people).sort((a, b) => {
    const lastName1 = getLastName(people[a].name);
    const lastName2 = getLastName(people[b].name);

    if (lastName1 > lastName2) return 1;
    if (lastName1 < lastName2) return -1;
    return 0;
  });

  let sortedPeople = {};

  sortedKeys.forEach((key) => {
    sortedPeople[key] = people[key];
  });

  return sortedPeople;
}

export function filterUsersAddedToTipOut(allUsers, usersAdded) {
  const compareTo = usersAdded.map(user => user.id);

  return allUsers.filter(user => compareTo.indexOf(user.id) === -1);
}
