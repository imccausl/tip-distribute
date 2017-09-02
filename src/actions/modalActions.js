export default function showModal(isOpen, modal, title, data) {
  return {
    type: 'SHOW_MODAL',
    payload: {
      modal,
      title,
      isOpen,
      data,
    },
  };
}