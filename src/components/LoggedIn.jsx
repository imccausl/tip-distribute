import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ViewArea from './ViewArea.jsx';
import BottomBar from './BottomBar.jsx';
import TipOutDrawer from './TipOutDrawer.jsx';
import initializeMainState from '../helpers/populateStateHelpers';

function mapStateToProps(state) {
  return {
    tipOuts: state.firebase.data.tipOuts,
    people: state.firebase.data.people,
    stores: state.firebase.data.stores,
    profile: state.firebase.profile,
  };
}

function mapDispatchToProps(dispatch) {

}

@firebaseConnect(['tipOuts', 'people', 'stores'])
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

    const {
      tipOuts,
      people,
      stores,
      profile,
    } = newState;

    if (isLoaded(tipOuts, people, stores, profile)) {
      const INIT_TYPE = 'USER_TIPS';

      const userAppState = initializeMainState(profile, tipOuts, people, stores, INIT_TYPE);
      let adminAppState = null;

      // is user admin?
      if (profile.role === '1r') {
        adminAppState = initializeMainState(profile, tipOuts, people, stores);
      }

      this.setState({ adminAppState, userAppState });
    }
  }

  render() {
    const { adminAppState, userAppState } = this.state;
    const { people, stores } = this.props;
    return (
      <div>
          <TipOutDrawer
            adminAppState={adminAppState}
            userAppState={userAppState}
            people={people}
            stores={stores}
          />
          <ViewArea 
            adminAppState={adminAppState}
            people={people}
            stores={stores}
          />
          <BottomBar />
      </div>
    );
  }
}
