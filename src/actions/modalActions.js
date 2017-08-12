export default function showModal(modal, isOpen) {
  return {
    type: 'SHOW_MODAL',
    payload: {
      modal,
      isOpen,
    },
  };
}