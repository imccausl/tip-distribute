import PropTypes from 'prop-types';

const tipOutModel = {
  createdAt: PropTypes.number,
  createdBy: PropTypes.string,
  hourlyWage: PropTypes.number,
  people: PropTypes.shape({
    belongsTo: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    hours: PropTypes.string,
  }),
  ref: PropTypes.string,
  storeRef: PropTypes.string,
  totalCash: PropTypes.string,
  totalHours: PropTypes.number,
  weekEnding: PropTypes.string,
};

export default tipOutModel;
