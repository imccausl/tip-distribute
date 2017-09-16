/*
 This component talks to EmployeeList and its data is derived from the current tip out.
 You should be able to add new people to the list, populating 'blank' entries with pre-determined
 names of the people who work at the store. This store list is maintained separately by an administrator
 (whoever is in charge of doing tips for the store can maintain this list through the admin functions).

 From a usability perspective, it would be useful to be able to add people to the store list right from this component
 if the person you are trying to add to the tip out does not exist in the store list.
 */

// TODO: Once the tip out has been distributed, it should be locked and no changes should be allowed.
//       So to facilitate this, I need to add and check for a "isDistributed" boolean within the tip out.

// removing a person from a tipOut has to check whether the person is hidden and delete that person
// from people record if it was previously hidden.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentRemove from 'material-ui/svg-icons/navigation/cancel';
import updatePerson from '../actions/updatePerson';
import selectPerson from '../actions/selectPerson';
import showModal from '../actions/modalActions';
import * as tpHelpers from '../helpers/currentTipOutHelpers';
import tipOutShape from '../models/tipOut.model';

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePerson, selectPerson, showModal }, dispatch);
}

@firebaseConnect()
@connect(mapStateToProps, mapDispatchToProps)
export default class SinglePerson extends Component {
  static propTypes = {
    hours: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    personRef: PropTypes.string,
    tipOut: PropTypes.shape(tipOutShape).isRequired,
    firebase: PropTypes.shape({
      pushWithMeta: PropTypes.func.isRequired,
    }).isRequired,
    storePeopleList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })).isRequired,
    // updatePerson: PropTypes.func.isRequired,
    selectPerson: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    hours: '0',
    name: '',
    id: '',
    personRef: null,
  }

  static getWindowDimensions() {
    return (window.innerWidth >= 500) ? 500 : window.innerWidth;
  }

  constructor(props) {
    super(props);

    this.state = {
      hasUpdated: false,
      updateType: '',
      canUpdate: false,
      width: SinglePerson.getWindowDimensions(),
      newHours: this.props.hours,
      nameText: this.props.name,
      personId: this.props.id,
      myKey: this.props.personRef || null,
      people: this.props.allPeople,
    };

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

  viewPersonName(style) {
    const compStyle = {
      ...style,
      cursor: 'arrow',
    };

    return (
      <TextField
        hintText="Name"
        floatingLabelText="Name"
        value={this.state.nameText}
        disabled={true}
        underlineShow={false}
        inputStyle={{ color: 'black' }}
        style={compStyle}
      />
    );
  }

  render() {
    const { update } = this.props.firebase;
    const xSmall = window.matchMedia('(min-width: 320px)');
    const small = window.matchMedia('(max-width: 375px)');
    const medium = window.matchMedia('(min-width: 375px)');
    const large = window.matchMedia('(max-width: 445px)');
    const nameStyle = {
      width: `${(this.state.width / 1.4) - 60}px`,
      margin: '0 10px',
    };

    if (xSmall.matches && small.matches) {
      nameStyle.width = '135px';
    }

    if (medium.matches && large.matches) {
      nameStyle.width = '200px';
    }

    const style = {
      padding: '0',
      margin: '0',
      position: 'relative',
    };

    const hoursStyle = {
      width: '60px',
      margin: '0 10px',
    };

    const NameComponent = this.viewPersonName(nameStyle);
    const { pushWithMeta } = this.props.firebase;

    const deleteButton = () => {
      if (!this.state.myKey) {
        return null;
      }

      return (
        <IconButton
          style={{
            position: 'absolute',
            right: '-10px',
            top: '15px',
            margin: '5px 0',
          }}
          onClick={() => {
            this.props.showModal(true, 'MODAL_CONFIRM_DELETE_PERSON', 'Remove Person', { personKey: this.state.myKey, personId: this.state.personId, tipOutRef: this.props.belongsTo, storeRef: this.props.storeRef });
          }}
        >
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
      );
    };

    return (
      <div style={style}>
        {deleteButton()}
        {NameComponent}
        <TextField
          hintText="Hours"
          floatingLabelText="Hours"
          defaultValue={this.props.hours}
          style={hoursStyle}
          onFocus={() => this.setState({ canUpdate: true })}
          onBlur={
            (e) => {
              const { belongsTo } = this.props;
              if (this.state.canUpdate && this.state.newHours !== e.target.value) {
                this.setState({ canUpdate: false, newHours: e.target.value });
                update(
                  `/tipOuts/${belongsTo}/people/${this.state.myKey}`,
                  {
                    hours: e.target.value,
                  }).then(() => this.setState({ hasUpdated: true, updateType: 'Updated' }));
              }
            }
          }
        />
        <Snackbar
          open={this.state.hasUpdated}
          message={`${this.state.updateType} ${this.state.nameText}`}
          action="undo"
          autoHideDuration={2000}
        />
      </div>
    );
  }
}
