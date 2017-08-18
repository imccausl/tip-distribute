import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';
import selectPeople from '../actions/selectEmployees';
import selectView from '../actions/viewAction';

function mapStateToProps(state) {
  return {
    data: state.dataTree,
    view: state.activeView,
    currentTipOut: state.currentTipOut,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTipOut,
    selectView,
    hideDrawer,
    selectPeople }, dispatch);
}

@firebaseConnect([
  '/tipOuts',
  '/users',
  '/people',
  '/stores',
])
@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  renderList() {
    return this.props.data.map((tipOut, index) => (
      <TipOutListItem
        key={tipOut.id}
        week={tipOut.weekEnding}
        cash={tipOut.totalCash}
        employees={tipOut.employees}
        click={() => {
          this.props.selectTipOut(tipOut);
          this.props.selectView('SHOW_EDIT_VIEW', 0);
          this.props.hideDrawer();
        }}
      />
    ),
    );
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return (
      <div>
        <List>
          <Subheader>Individual Tip Outs</Subheader>
          {this.renderList()}
        </List>
        <List>
          <Subheader>Combined Tip Outs</Subheader>
        </List>
      </div>
    );
  }
}