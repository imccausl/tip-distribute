export default function viewAction(type, selection) {
  return {
    type,
    payload: selection,
  };
}
