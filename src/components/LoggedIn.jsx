import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ViewArea from './ViewArea';
import BottomBar from './BottomBar';
import TipOutDrawer from './TipOutDrawer';
import initializeMainState from '../helpers/populateStateHelpers';

function mapStateToProps(state) {
  return {
    tipOuts: state.firebase.data.tipOuts,
    people: state.firebase.data.people,
    stores: state.firebase.data.stores,
    users: state.firebase.data.users,
    profile: state.firebase.profile,
  };
}

function mapDispatchToProps(dispatch) {}

@firebaseConnect(['tipOuts', 'people', 'stores', 'users'])
@connect(mapStateToProps)
export default class LoggedIn extends Component {
  constructor(props) {
    super(props);

    this.getTipOutsFromUsersStore = this.getTipOutsFromUsersStore.bind(this);
    this.state = {
      adminAppState: null,
      userAppState: null,
    };

    this.getTipOutsFromUsersStore(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getTipOutsFromUsersStore(newProps);
  }

  getTipOutsFromUsersStore(newState) {
    if (!newState) {
      return null;
    }

    const { tipOuts, people, stores, profile } = newState;

    if (isLoaded(tipOuts, people, stores, profile)) {
      const INIT_TYPE = 'USER_TIPS';
      let adminAppState = null;
      let userAppState = null;

      if (profile.ref) {
        userAppState = initializeMainState(profile, tipOuts, people, stores, INIT_TYPE);
      }

      // is user admin?
      if (profile.role === 'TIP_CREATOR') {
        adminAppState = initializeMainState(profile, tipOuts, people, stores);
      }

      this.setState({ adminAppState, userAppState });
    }
  }

  render() {
    const { adminAppState, userAppState } = this.state;
    const { people, stores, profile, users } = this.props;
    return (
      <div>
        <TipOutDrawer
          adminAppState={adminAppState}
          userAppState={userAppState}
          people={people}
          stores={stores}
          profile={profile}
        />
        <ViewArea
          adminAppState={adminAppState}
          people={people}
          stores={stores}
          profile={profile}
          users={users}
        />
        <BottomBar />
      </div>
    );
  }
}
