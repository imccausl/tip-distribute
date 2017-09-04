import PropTypes from 'prop-types';

const personShape = {
  belongsTo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  hours: PropTypes.string.isRequired,
};

export default personShape;
