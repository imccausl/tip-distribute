import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { showDrawer } from '../actions/drawerActions';
import { showModal } from '../actions/modalActions';
import DistributionReport from './DistributionReport.jsx';
import selectTipOut from '../actions/tipOutActions';
import selectPeople from '../actions/selectEmployees';
import updateTipOuts from '../actions/updateTipOuts';
import makeNewId from '../helpers/makeNewId';

class TipAppBar extends Component {
  MainMenu() {
    return (
      <div>
        <MenuItem primaryText="Edit Date and Cash..." />
        <Divider />
        <MenuItem primaryText="Distribute Tips"
          onTouchTap={this.props.showModal}
        />
      </div>
    );
  }

  OpenDrawer() {
    return (
      <SvgIcon>
        <MenuIcon />
      </SvgIcon>
    );
  }

  render() {
    let headerText = '';

    if (!this.props.tipOut) {
      headerText = 'No Tipout Selected';
    } else {
      headerText = this.props.tipOut.weekEnding.concat(' | $', this.props.tipOut.totalCash);
    }

    return (
      <div style={{ position: 'relative' }}>
        <Toolbar>
          <ToolbarGroup
            firstChild={true}
          >
            <IconButton
              onTouchTap={this.props.showDrawer}
            >
              {this.OpenDrawer()}
            </IconButton>
            <ToolbarTitle text={headerText} />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              tooltip="Add person to tipout"
              onTouchTap={() => {

                const newPerson = {
                  belongsTo: this.props.tipOut.id,
                  id: makeNewId(),
                  name: 'New Person',
                  hours: '0',
                };

                const newEmployees = [
                  ...this.props.tipOut.employees,
                  newPerson,
                ];

                console.log("Making new tipOut with", newPerson);
                this.props.updateTipOuts(this.props.tipOut.id, newEmployees);
              }}
            >
              <SvgIcon><ContentAdd /></SvgIcon>
            </IconButton>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {this.MainMenu()}
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
    open: state.showModal,
    people: state.activePeople,
    tipOut: state.currentTipOut,
    tipOuts: state.dataTree,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    showDrawer,
    showModal,
    updateTipOuts,
    selectPeople,
    selectTipOut,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipAppBar);
