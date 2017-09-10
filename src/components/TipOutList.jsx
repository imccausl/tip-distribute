import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import TipsListItem from './TipsListItem.jsx';
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

@firebaseConnect(['/users', '/people', '/tipOuts'])
@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  constructor(props) {
    super(props);

    this.renderTipOutsList = this.renderTipOutsList.bind(this);
    this.renderTips = this.renderTips.bind(this);
  }

  renderTipOutsList() {
    if (this.props.tipOuts) {
      const { tipOuts } = this.props;
      return Object.keys(tipOuts).map(key => (
        <TipOutListItem
          key={key}
          week={tipOuts[key].weekEnding}
          cash={tipOuts[key].totalCash}
          totalHours={tipOuts[key].totalHours}
          people={tipOuts[key].people}
          click={() => {
            this.props.populateTipOutList({
              tipOut: tipOuts[key],
              users: this.props.data.users,
              people: this.props.data.people
            });
            this.props.selectView('SHOW_EDIT_VIEW', 0);
            this.props.hideDrawer();
          }}
        />
      ),
      );
    }

    return null;
  }

  renderTips() {
    if (this.props.tips) {
      const { tips } = this.props;
      return Object.keys(tips).map((key) => (
        <TipsListItem
          key={key}
          week={tips[key].weekEnding}
          wage={tips[key].hourlyWage}
          hours={tips[key].people.hours}
          click={() => {
            // this.props.populateTipOutList({ tipOut: tipOuts[key], users: this.props.data.users, people: this.props.data.people });
            // this.props.selectView('SHOW_EDIT_VIEW', 0);
            // this.props.hideDrawer();
          }}
        />
      ),
      );
    }

    return null;
  }

  render() {
    const {
      tipOuts,
      tpRequesting,
      tpRequested,
      tpTimestamp,
    } = this.props;
    
    if (tipOuts.constructor !== Array) {
      return <LoadingSpinner />;
    }

    const populateList = (header, func) => {
      if (func()) {
        return (
          <List>
            <Subheader>{header}</Subheader>
            {func()}
          </List>
        );
      }

      return null;
    }

    return (
      <div>
        {populateList('Your Tips', this.renderTips)}
        {populateList('Tip Outs Created By You', this.renderTipOutsList)}
        <List>
          <Subheader>Combined Tip Outs</Subheader>
        </List>
      </div>
    );
  }
}