import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';
import selectPeople from '../actions/selectEmployees';

class TipOutList extends Component {

  renderList() {
    return this.props.data.map((tipOut, index) => (
      <TipOutListItem
        key={tipOut.id}
        week={tipOut.weekEnding}
        cash={tipOut.totalCash}
        employees={tipOut.employees}
        click={() => {
          this.props.selectTipOut(tipOut);
          this.props.hideDrawer();
        }}
      />
    ),
    );
  }

  render() {
    if (!this.props.data[0] || !this.props.data) {
      return null;
    }

    return (
        <List>
          {this.renderList()}
        </List>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.dataTree,
    currentTipOut: state.currentTipOut,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    selectTipOut,
    hideDrawer,
    selectPeople }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutList);
