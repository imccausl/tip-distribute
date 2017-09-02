/*
 This component talks to EmployeeList and its data is derived from the current tip out.
 You should be able to add new people to the list, populating 'blank' entries with pre-determined
 names of the people who work at the store. This store list is maintained separately by an administrator
 (whoever is in charge of doing tips for the store can maintain this list through the admin functions).

 From a usability perspective, it would be useful to be able to add people to the store list right from this component
 if the person you are trying to add to the tip out does not exist in the store list.
 */

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
    tipOuts: state.dataTree,
    people: state.activePeople,
    tipOut: state.currentTipOut,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updatePerson, selectPerson, showModal }, dispatch);
}

@firebaseConnect(['/tipOuts', '/people'])
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
    peopleList: PropTypes.arrayOf(PropTypes.shape({
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

  editPersonName(style, fbSet) {
    const autoCompleteConfig = {
      text: 'name',
      value: 'id',
    };

    const { tipOut, peopleList } = this.props;

    const currentlyAddedUsers = tpHelpers.getPeopleFromTipOut(tipOut);
    const allowedUsers = tpHelpers.filterUsersAddedToTipOut(peopleList, currentlyAddedUsers);

    const addPersonToTipOut = (id, name) => {
      const addPerson = {
        id,
        name,
        belongsTo: this.props.tipOut.ref,
        hours: this.state.newHours || '0',
      };

      this.setState({ nameText: name, personId: id });

      fbSet(`/tipOuts/${addPerson.belongsTo}/people`, addPerson).then((snapshot) => {
        this.setState({ hasUpdated: true, updateType: 'Added', myKey: snapshot.key });
      });
    };

    return (
      <AutoComplete
        style={style}
        hintText="Name"
        dataSource={allowedUsers}
        dataSourceConfig={autoCompleteConfig}
        filter={AutoComplete.fuzzyFilter}
        floatingLabelText="Name"
        searchText={this.state.nameText}
        openOnFocus={true}
        maxSearchResults={5}
        onNewRequest={
          (e, arr) => {
            if (arr === -1) {
              const personIndex = tpHelpers.getIndexOfPerson(peopleList, e);
              if (personIndex > -1) {
                console.log("Personexists!");
                this.setState({ nameText: peopleList[personIndex].name });
              } else {
                // person does not exist, create a new person record and add to current store
                // TODO: Another case: person exists, but is not from the store (phantom case)
              }
            } else {
              // Add user who already has a people record
              addPersonToTipOut(e.id, e.name);
            }
          }
        }
      />
    );
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

    let NameComponent = null;
    const { pushWithMeta } = this.props.firebase;

    if (this.state.personId) {
      NameComponent = this.viewPersonName(nameStyle);
    } else {
      NameComponent = this.editPersonName(nameStyle, pushWithMeta);
    }

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
          onTouchTap={() => {
            this.props.selectPerson({ belongsTo: this.props.tipOut.id, name: this.props.name, id: this.props.id, hours: this.props.hours });
            this.props.showModal(true, 'MODAL_CONFIRM_DELETE_PERSON', 'Remove Person', { personKey: this.state.myKey, tipOutRef: this.props.tipOut.ref });
          }}
        >
          <SvgIcon><ContentRemove /></SvgIcon>
        </IconButton>
      );
    }

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
              if (this.state.canUpdate && this.state.newHours !== e.target.value) {
                this.setState({ canUpdate: false, newHours: e.target.value });
                update(
                  `/tipOuts/${this.props.tipOut.ref}/people/${this.state.myKey}`,
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
