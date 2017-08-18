import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import SvgIcon from 'material-ui/SvgIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import ContentAdd from 'material-ui/svg-icons/social/person-add';
import { showDrawer } from '../actions/drawerActions';
import showModal from '../actions/modalActions';
import DistributionReport from './DistributionReport.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import selectTipOut from '../actions/tipOutActions';
import selectPeople from '../actions/selectEmployees';
import updateTipOuts from '../actions/updateTipOuts';
import makeNewId from '../helpers/makeNewId';

class TipAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = { distributionOpen: false };
  }

  MainMenu() {
    return (
      <div>
        <MenuItem
          disabled={!(this.props.tipOut)}
          primaryText="Distribute Tips"
          leftIcon={<MoneyIcon />}
          onTouchTap={() => this.setState({ distributionOpen: true })}
        />
        <Divider />
        <MenuItem
          disabled={!(this.props.tipOut)}
          primaryText="Edit..."
          leftIcon={<EditIcon />}
          onTouchTap={
            () => {
              this.props.showModal(true, 'EDIT_TIP_OUT_MODAL', 'Edit Tip Out');
            }
          }
        />
        <MenuItem
          disabled={!(this.props.tipOut)}        
          primaryText="Delete..."
          leftIcon={<DeleteIcon />}
          onTouchTap={
            () => {
              this.props.showModal(true, 'MODAL_CONFIRM_DELETE', 'Delete Tip Out')
            }
          }
        />
      </div>
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
      <div style={{ position: 'fixed', zIndex: '5', width: '100%', top: '60px', left: '0' }}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={headerText} />
          </ToolbarGroup>
          <ToolbarGroup>
            <IconButton
              disabled={!(this.props.tipOut)}
              tooltip="Add person to tipout"
              onTouchTap={() => {
                const newPerson = {
                  belongsTo: this.props.tipOut.id,
                  id: makeNewId(),
                  name: '',
                  hours: '',
                };

                const newEmployees = [
                  ...this.props.tipOut.employees,
                  newPerson,
                ];

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
        <ConfirmDialog />
        <DistributionReport isOpen={this.state.distributionOpen} resetState={() => this.setState({ distributionOpen: false })} />
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