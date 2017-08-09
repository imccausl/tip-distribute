import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentAdd from 'material-ui/svg-icons/content/add-circle-outline';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import updatePerson from '../actions/updatePerson';
import addNewPerson from '../actions/addNewPersonToCurrentTipOut';
import selectTipOut from '../actions/tipOutActions';

class SinglePerson extends Component {
  constructor(props) {
    super(props);

    this.state = { canUpdate: false };
  }

  render() {
    const style = {
      padding: '0 10px',
      margin: '5px 0',
    };

    return (
      <Paper style={style} zDepth={1}>
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          defaultValue={this.props.personName}
          onFocus={() => {
            this.setState({ canUpdate: true })
          }}
          onBlur={
            (e) => {
              if (this.state.canUpdate) {
                this.setState({ canUpdate: false });
                this.props.updatePerson({
                  fromIndex: this.props.tipOut.index,
                  name: e.target.value,
                  id: this.props.id,
                  hours: this.props.hours,
                });
              }
            }}
        />
        <TextField
          hintText="Hours Worked"
          floatingLabelText="Hours Worked"
          defaultValue={this.props.hours}
        />
        <IconButton tooltip="Remove this person">
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    tipOuts: state.tipOuts,
    tipOut: state.activeTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePerson, addNewPerson, selectTipOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson);
