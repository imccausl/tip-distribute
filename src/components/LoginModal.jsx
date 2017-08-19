import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { populateState } from '../actions/tipOutActions';

/* 
 WHAT NEEDS TO BE DONE IMMEDIATELY AFTER A USER LOGS IN:
  - Once a user logs in, we have to check for tip outs the user created, and/or belongs to.
  - We have to check the user's type
  - If the user is type 1, supervisor, the user has access to all tip outs from his/her store,
    so they should be added to the list.
  - because the sole purpose of this app is no longer to just make tip outs,
    we no longer have to show the create tip out dialog on start up if the drawer is empty...
  All these things should be added to the redux store, changes will be made to the redux store
  which will then be pushed to firebase.

 */

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth,
    authError: state.firebase.authError,
    profile: state.firebase.profile,
    data: state.firebase.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    populateState,
  }, dispatch);
}

@firebaseConnect([
  '/tipOuts',
  '/people',
  '/users',
  '/stores',
  '/roles',
])
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true, email: '', password: '' };

  }

  handlePostLogin(arg) {
    const {
      tipOuts,
    } = this.props.data;

    const {
      populateState,
      profile,
      auth,
    } = this.props;

    if (arg !== 'NO_SET_STATE') {
      this.setState({ isOpen: false });
    }

    populateState({ profile, tipOuts });
  }

  render() {
    const {
      profile,
      authError,
      auth,
    } = this.props;

    console.log(auth);
    if (auth.isLoaded && !auth.isEmpty) {
      this.handlePostLogin('NO_SET_STATE');
      return null;
    }

    const actions = [
      <FlatButton label="Cancel"
        onTouchTap={() => this.setState({ isOpen: false })}
      />,
      <FlatButton
        disabled={!this.state.email && !this.state.password}
        onTouchTap={() => {
          return this.props.firebase.login(
            {
              email: this.state.email,
              password: this.state.password,
            })
            .then(() => this.handlePostLogin())
            .catch((error) => {
              this.setState({ email: '', password: '' });
              console.log("Error!!!!", error, authError)
            });
        }}
        label="Login"
        primary={true}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        open={this.state.isOpen}
        modal={true}
      >
        <TextField 
          hintText="Email"
          floatingLabelText="Email"
          type="text"
          onChange={e => this.setState({ email: e.target.value })}
        />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
      </Dialog>
    );
  }
}
