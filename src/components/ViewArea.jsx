import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployeeList from './EmployeeList';
import ConfirmDialog from './ConfirmDialog';
import UserProfile from './UserProfile';
import DistributeTips from './DistributionReport';
import EditStorePeople from './EditStorePeople';
import EditStoreList from './EditStoreList';

class ViewArea extends Component {
  render() {
    const adjustMargin = view => {
      const viewStyle = {
        margin: '60px 0',
        zIndex: '0',
      };

      if (view === 0 || view === 2) {
        viewStyle.margin = '110px 0';
      }

      return viewStyle;
    };

    const viewArea = () => {
      switch (this.props.view.type) {
        case 'SHOW_EDIT_VIEW':
          return (
            <EmployeeList
              viewModel={this.props.adminAppState[this.props.view.payload.key]}
              people={this.props.people}
              stores={this.props.stores}
            />
          );
        case 'SHOW_USER_PROFILE':
          return <UserProfile />;
        case 'SHOW_DISTRIBUTE_TIPS':
          return (
            <DistributeTips
              viewModel={this.props.adminAppState[this.props.view.payload.key]}
              allPeople={this.props.people}
              stores={this.props.stores}
            />
          );
        case 'SHOW_EDIT_PEOPLE':
          return (
            <EditStorePeople
              allPeople={this.props.people}
              stores={this.props.stores}
              profile={this.props.profile}
              users={this.props.users}
            />
          );
        case 'SHOW_EDIT_STORES':
          return (
            <EditStoreList
              stores={this.props.stores}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div>
        <div style={adjustMargin(this.props.view.payload.selection)}>
          {viewArea()}
        </div>
        <ConfirmDialog />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.activeView,
  };
}

export default connect(mapStateToProps)(ViewArea);
