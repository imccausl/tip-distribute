export function getPeopleFromTipOut(tipOut) {
  return Object.keys(tipOut.people).map(key => tipOut.people[key]);
}

export function getIndexOfPerson(list, name) {
  return list.map(person => person.name.toLowerCase()).indexOf(name.toLowerCase());
}

export function sortByLastName(tipOut) {
  
}