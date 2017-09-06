import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeList from './EmployeeList.jsx';
import UserProfile from './UserProfile.jsx';
import DistributeTips from './DistributionReport.jsx';

class ViewArea extends Component {
  render() {
    const adjustMargin = (view) => {
      const viewStyle = {
        margin: '60px 0',
        zIndex: '0',
      };

      if (view === 0) {
        viewStyle.margin = '110px 0';
      }

      return viewStyle;
    }

    const viewArea = () => {
      switch (this.props.view.type) {
        case 'SHOW_EDIT_VIEW':
          return <EmployeeList />;
        case 'SHOW_USER_PROFILE':
          return <UserProfile />;
        case 'SHOW_DISTRIBUTE_TIPS':
          return <DistributeTips />
        default:
          return null;
      }
    } 

    return (
      <div style={adjustMargin(this.props.view.payload)}>
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
