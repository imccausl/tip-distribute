import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { populateState } from '../actions/tipOutActions';
/*
 WHAT NEEDS TO BE DONE IMMEDIATELY AFTER A USER LOGS IN:
  - Once a user logs in, we have to check for tip outs that were created for the store, and/or belongs to.
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
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      populateState,
    },
    dispatch,
  );
}

@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true, user: '', password: '' };
  }

  handlePostLogin(arg) {
    // const {
    //   tipOuts,
    // } = this.props.data;
    // const {
    //   populateState,
    //   profile,
    //   auth,
    // } = this.props;
  }

  render() {
    const { profile, authError, auth } = this.props;
    const loginStyle = {
      margin: '80px 5px 5px 5px',
    };
    const actions = () => (
      <div>
        <RaisedButton
          style={{ display: 'block', marginTop: '20px' }}
          disabled={!this.state.user && !this.state.password}
          onClick={() => this.props.firebase
            .login({
              email: this.state.user,
              password: this.state.password,
            })
            .catch(error => {
              this.setState({ user: '', password: '' });
              console.log('Error!!!!', error, authError);
            })}
          label="Log in"
          primary
        />
        <FlatButton
          style={{ display: 'block', marginTop: '10px', width: '100%' }}
          label="Sign Up"
          secondary
        />
      </div>
    );

    return (
      <Paper style={loginStyle} zDepth={0}>
        <div style={{ position: 'relative', minWidth: '250px', maxWidth: '320px', margin: '0 auto' }}>
          <TextField
            style={{ display: 'block', width: '100%' }}
            hintText="User Name"
            floatingLabelText="User Name"
            type="text"
            onChange={e => this.setState({ user: e.target.value })}
          />
          <TextField
            style={{ display: 'block', width: '100%' }}
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          {actions()}
        </div>
      </Paper>

    );
  }
}
