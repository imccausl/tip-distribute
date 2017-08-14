export default function showModal(isOpen, modal, title) {
  return {
    type: 'SHOW_MODAL',
    payload: {
      modal,
      title,
      isOpen,
    },
  };
}