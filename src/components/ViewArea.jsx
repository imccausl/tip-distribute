import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeList from './EmployeeList.jsx';
import UserProfile from './UserProfile.jsx';

class ViewArea extends Component {
  render() {
    const viewArea = () => {
      switch (this.props.view.type) {
        case 'SHOW_EDIT_VIEW':
          return <EmployeeList />;
        case 'SHOW_USER_PROFILE':
          return <UserProfile />;
        case 'SHOW_DISTRIBUTE_TIPS':
        default:
          return null;
      }
    }
    return (
      <div style={{ margin: '110px 0', zIndex: '0' }}>
        {viewArea()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.activeView,
  }
}

export default connect(mapStateToProps)(ViewArea);
