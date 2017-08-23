import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import { hideDrawer } from '../actions/drawerActions';
import selectPeople from '../actions/selectEmployees';
import { populateTipOutList } from '../actions/tipOutActions';
import selectView from '../actions/viewAction';
import LoadingSpinner from './LoadingSpinner.jsx';
import * as stateHelpers from '../helpers/populateStateHelpers';

function mapStateToProps(state) {
  return {
    tipOuts: state.tipOuts,
    tips: state.tips,
    data: state.firebase.data,
    currentTipOut: state.currentTipOut,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectView,
    hideDrawer,
    populateTipOutList,
    selectPeople }, dispatch);
}

@firebaseConnect(['/users', '/people'])
@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  renderTipOutsList() {
    const { tipOuts } = this.props;

    return Object.keys(tipOuts).map((key, index) => (
      <TipOutListItem
        key={key}
        week={tipOuts[key].weekEnding}
        cash={tipOuts[key].totalCash}
        employees={tipOuts[key].people}
        click={() => {
          this.props.populateTipOutList({ tipOut: tipOuts[key], users: this.props.data.users, people: this.props.data.people });
          this.props.selectView('SHOW_EDIT_VIEW', 0);
          this.props.hideDrawer();
        }}
      />
    ),
    );
  }

  render() {
    const {
      tipOuts,
      tpRequesting,
      tpRequested,
      tpTimestamp,
    } = this.props;

    console.log(tipOuts.constructor);
    if (tipOuts.constructor !== Array) {
      return <LoadingSpinner />;
    }


    return (
      <div>
        <List>
          <Subheader>Tips</Subheader>
        </List>
        <List>
          <Subheader>Tip Outs Created</Subheader>
          {this.renderTipOutsList()}
        </List>
        <List>
          <Subheader>Combined Tip Outs</Subheader>
        </List>
      </div>
    );
  }
}