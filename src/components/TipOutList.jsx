import React, { Component } from 'react';
import { connect } from 'react-redux';
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

@connect(mapStateToProps, mapDispatchToProps)
export default class TipOutList extends Component {
  constructor(props) {
    super(props);

    this.renderTipOutsList = this.renderTipOutsList.bind(this);
    this.renderTips = this.renderTips.bind(this);
  }

  renderTipOutsList() {
    const { adminAppState, people } = this.props;
    if (adminAppState) {
      return Object.keys(adminAppState).map(key => (
        <TipOutListItem
          key={key}
          week={adminAppState[key].weekEnding}
          cash={adminAppState[key].totalCash}
          totalHours={adminAppState[key].totalHours}
          people={adminAppState[key].people}
          click={() => {
            this.props.selectView('SHOW_EDIT_VIEW', 0, key);
            this.props.hideDrawer();
          }}
        />
      ),
      );
    }

    return null;
  }

  renderTips() {
    const { userAppState } = this.props;

    if (userAppState) {
      return Object.keys(userAppState).map(key => (
        <TipsListItem
          key={key}
          week={userAppState[key].weekEnding}
          wage={userAppState[key].hourlyWage}
          hours={userAppState[key].people.hours}
          isDistributed={userAppState[key].isDistributed}
          click={() => {
            // this.props.populateTipOutList({ tipOut: tipOuts[key], users: this.props.data.users, people: this.props.data.people });
            // this.props.selectView('SHOW_EDIT_VIEW', 0);
            // this.props.hideDrawer();
          }}
        />
      ));
    }

    return null;
  }

  render() {
    const {
      adminAppState,
      userAppState,
    } = this.props;

    if (!adminAppState && !userAppState) {
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
    };

    return (
      <div>
        {populateList('Your Store\'s Tip Outs', this.renderTipOutsList)}
        {populateList('Your Tips', this.renderTips)}
      </div>
    );
  }
}
