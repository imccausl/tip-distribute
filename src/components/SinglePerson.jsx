import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentRemove from 'material-ui/svg-icons/navigation/cancel';
import updatePerson from '../actions/updatePerson';
import updateTipOuts from '../actions/updateTipOuts';
import selectTipOut from '../actions/tipOutActions';
import selectPerson from '../actions/selectPerson';
import showModal from '../actions/modalActions';

@firebaseConnect(['/tipOuts', '/people'])
class SinglePerson extends Component {
  static getWindowDimensions() {
    return (window.innerWidth >= 500) ? 500 : window.innerWidth;
  }

  constructor(props) {
    super(props);

    this.state = { hasUpdated: false, updateType: '', canUpdate: false, width: SinglePerson.getWindowDimensions() };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: SinglePerson.getWindowDimensions() });
  }

  render() {
    const { update } = this.props.firebase;
    const xSmall = window.matchMedia('(min-width: 320px)');
    const small = window.matchMedia('(max-width: 375px)');
    const medium = window.matchMedia('(min-width: 375px)');
    const large = window.matchMedia('(max-width: 445px)');

    const style = {
      padding: '0',
      margin: '0',
      position: 'relative',
    };

    const hoursStyle = {
      width: '60px',
      margin: '0 10px',
    };

    let nameStyle = {
      width: `${(this.state.width / 1.4) - 60}px`,
      margin: '0 10px',
    };

    if (xSmall.matches && small.matches) {
      nameStyle.width = '135px';
    }

    if (medium.matches && large.matches) {
      nameStyle.width = '200px';
    }

    console.log("Refs loaded:", this.props.personRef);

    return (
      <div style={style}>
        <IconButton
          style={{
            position: 'absolute',
            right: '-10px',
            top: '15px',
            margin: '5px 0',
          }}
          onTouchTap={() => {
            this.props.selectPerson({ belongsTo: this.props.tipOut.id, name: this.props.name, id: this.props.id, hours: this.props.hours });
            this.props.showModal(true, 'MODAL_CONFIRM_DELETE_PERSON', 'Delete Person');
          }}
        >
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
        <TextField
          style={nameStyle}
          hintText="Name"
          floatingLabelText="Name"
          defaultValue={this.props.name}
          onFocus={() => {
            this.setState({ canUpdate: true })
          }}
          onBlur={
            (e) => {
              if (this.state.canUpdate && this.props.name !== e.target.value) {
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
          style={hoursStyle}
          onFocus={() => this.setState({ canUpdate: true })}
          onBlur={
            (e) => {
              if (this.state.canUpdate && this.props.hours !== e.target.value) {
                this.setState({ canUpdate: false });
                console.log('updating:', this.props.personRef);
                update(
                  `/tipOuts/${this.props.tipOut.ref}/people/${this.props.personRef}`,
                  {
                    hours: e.target.value,
                  },
                  () => this.setState({ hasUpdated: true, updateType: 'Hours' })
                );
              }
            }
          }
        />
        <Snackbar
          open={this.state.hasUpdated}
          message={`Changed ${this.props.name}'s ${this.state.updateType}`}
          action="undo"
          autoHideDuration={2000}
        />
      </div>
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
  return bindActionCreators({ updatePerson, selectTipOut, selectPerson, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson);
