import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';
import selectPeople from '../actions/selectEmployees';
import selectView from '../actions/viewAction';
import LoadingSpinner from './LoadingSpinner.jsx';

const populates = {
  child: 'store',
  root: 'stores',
};

function mapStateToProps(state) {
  return {
    tipOuts: populate(state.firebase, 'tipOuts', populates),
    tpRequested: state.firebase.requested.tipOuts,
    tpRequesting: state.firebase.requesting.tipOuts,
    tpTimestamp: state.firebase.timestamps.tipOuts,
    uid: state.firebase.auth.uid,
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
  '/stores',
  { path: '/tipOuts', populates },
])
@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  renderList() {
    const { tipOuts } = this.props;

    return Object.keys(tipOuts).map((key, index) => (
      <TipOutListItem
        key={key}
        week={tipOuts[key].weekEnding}
        cash={tipOuts[key].totalCash}
        employees={tipOuts[key].people}
        click={() => {
          this.props.selectTipOut(tipOuts[key]);
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

    if (!tipOuts || (tpRequesting === true && tpRequested === false)) {
      return <LoadingSpinner />;
    }


    return (
      <div>
        <List>
          <Subheader>Group Tip Outs</Subheader>
          {this.renderList()}
        </List>
        <List>
          <Subheader>Combined Tip Outs</Subheader>
        </List>
      </div>
    );
  }
}