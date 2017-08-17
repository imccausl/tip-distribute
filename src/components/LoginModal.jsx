import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect, bindActionCreators } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class LoginBox extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: true, email: '', password: '' };
  }

  render() {
    console.log(this.props.auth);
    if (this.props.auth.isLoaded && !this.props.auth.isEmpty) {
      return null;
    }

    const actions = [
      <FlatButton label="Cancel"
        onTouchTap={() => this.setState({ isOpen: false })}
      />,
      <FlatButton
        disabled={!this.state.email && !this.state.password}
        onTouchTap={() => {
          console.log("Attempting to sign in with:", this.state.email, this.state.password);
          return this.props.firebase.login({email: this.state.email, password: this.state.password })
            .then(() => this.setState({ isOpen: false }))
            .catch((error) => {
              this.setState({ email: '', password: '' });
              console.log("Error!!!!", error, this.props.authError)
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

function mapStateToProps(state) {
  return {
    auth: state.firebase.auth,
    authError: state.firebase.authError,
    profile: state.firebase.profile,
  };
}

export default firebaseConnect()(connect(mapStateToProps)(LoginBox));
