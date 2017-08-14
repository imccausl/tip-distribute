import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle';
import updatePerson from '../actions/updatePerson';
import updateTipOuts from '../actions/updateTipOuts';
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
          defaultValue={this.props.name}
          onFocus={() => {
            this.setState({ canUpdate: true })
          }}
          onBlur={
            (e) => {
              if (this.state.canUpdate) {
                this.setState({ canUpdate: false });
                this.props.updatePerson({
                  belongsTo: this.props.tipOut.id,
                  name: e.target.value,
                  id: this.props.id,
                  hours: this.props.hours,
                });
              }
            }}
        />
        <TextField
          hintText="Hours"
          floatingLabelText="Hours"
          defaultValue={this.props.hours}
          onFocus={() => this.setState({ canUpdate: true })}
          onBlur={
            (e) => {
              if (this.state.canUpdate) {
                this.setState({ canUpdate: false });
                this.props.updatePerson({
                  belongsTo: this.props.tipOut.id,
                  name: this.props.name,
                  id: this.props.id,
                  hours: e.target.value,
                });
              }
            }
          }
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
    tipOuts: state.dataTree,
    people: state.activePeople,
    tipOut: state.currentTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePerson, selectTipOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson);
