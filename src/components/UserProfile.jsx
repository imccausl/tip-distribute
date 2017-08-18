import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

class UserProfile extends Component {
  render() {
    console.log(this.props.profile, this.props.tipOuts);
    return (
      <Paper zDepth={0}>
        <div style={{ margin: '0 auto' }}>
          <Avatar
            style={{ margin: '10px auto' }}
            size={80}
            icon={this.props.profile.photoURL}
          />
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.firebase.profile,
    tipOuts: state.firebase.data.tipOuts,
  };
}

function mapDispatchToProps(dispatch) {

}

export default compose(
  firebaseConnect([
    '/tipOuts#orderByKey',
  ]),
  connect(mapStateToProps),
)(UserProfile);
