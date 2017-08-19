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
    tipOuts: state.tipOuts,
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
  '/users',
  '/people',
  '/stores',
])
@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  renderList() {
    return Object.keys(this.props.tipOuts).map((key, index) => (
      <TipOutListItem
        key={key}
        week={tipOut[key].weekEnding}
        cash={tipOut[key].totalCash}
        employees={tipOut[key].people}
        click={() => {
          this.props.selectTipOut(tipOut[key]);
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