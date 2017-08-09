export default function makeNewId() {
  const tempId = new Date();
  const parsedDate = Date.parse(tempId);

  // prevent unique key errors if button is clicked more than once a second
  const randomizer = Math.floor(Math.random() * parsedDate);
  return parsedDate + randomizer;
}