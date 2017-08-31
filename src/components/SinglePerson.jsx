/*
 This component talks to EmployeeList and its data is derived from the current tip out.
 You should be able to add new people to the list, populating 'blank' entries with pre-determined
 names of the people who work at the store. This store list is maintained separately by an administrator
 (whoever is in charge of doing tips for the store can maintain this list through the admin functions).

 From a usability perspective, it would be useful to be able to add people to the store list right from this component
 if the person you are trying to add to the tip out does not exist in the store list.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import ContentRemove from 'material-ui/svg-icons/navigation/cancel';
import updatePerson from '../actions/updatePerson';
import updateTipOuts from '../actions/updateTipOuts';
import selectPerson from '../actions/selectPerson';
import showModal from '../actions/modalActions';
import * as tpHelpers from '../helpers/currentTipOutHelpers';

@firebaseConnect(['/tipOuts', '/people'])
class SinglePerson extends Component {
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
      peopleList: tpHelpers.getPeopleFromTipOut(this.props.tipOut),
      nameText: this.props.name,
      personId: this.props.id,
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

    return (
      <AutoComplete
        style={style}
        hintText="Name"
        dataSource={this.state.peopleList}
        dataSourceConfig={autoCompleteConfig}
        filter={AutoComplete.fuzzyFilter}
        floatingLabelText="Name"
        searchText={this.state.nameText}
        openOnFocus={true}
        maxSearchResults={5}
        onNewRequest={
          (e, arr, params) => {
            if (arr === -1) {
              const personIndex = tpHelpers.getIndexOfPerson(this.state.peopleList, e);
              if (personIndex > -1) {
                console.log("Personexists!");
                this.setState({ nameText: this.state.peopleList[personIndex].name })
              } else {
                // person does not exist, create a new person for store
              }
            } else {
              this.setState({ nameText: e.name, personId: e.id });
            }

            console.log(e, arr, params);
          }
        }
        onUpdateInput={
          (e, arr, params) => {

            console.log("Update input:", e, arr, params);
          }
        }
        // onFocus={() => {
        //   this.setState({ canUpdate: true })
        // }}
        // onBlur={
        //   (e) => {
        //     if (this.state.canUpdate && this.props.name !== e.target.value) {
        //       this.setState({ canUpdate: false });
        //       update(`/people/${this.props.id}`, {
        //         displayName: e.target.value,
        //       }, () => this.setState({ hasUpdated: true, updateType: 'Name' }));
        //     }
        //   }
        // }
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

    if (this.state.personId) {
      NameComponent = this.viewPersonName(nameStyle);
    } else {
      NameComponent = this.editPersonName(nameStyle, update);
    }

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
        {NameComponent}
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
  return bindActionCreators({ updatePerson, selectPerson, showModal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SinglePerson);
