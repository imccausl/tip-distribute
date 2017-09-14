export default function viewAction(type, selection, key) {
  return {
    type,
    payload: { selection, key },
  };
}
