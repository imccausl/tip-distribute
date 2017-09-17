export default function parseDate(date) {
  const dateObj = new Date(date);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const tipOutMonth = months[dateObj.getMonth()] || [];
  return tipOutMonth.concat(' ', dateObj.getDate());
}