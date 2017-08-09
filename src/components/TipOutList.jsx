import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import NewTipOut from './NewTipOut.jsx';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';
import { showNewTipOutDialog } from '../actions/newTipOutDialogActions';
import selectPeople from '../actions/selectEmployees';

class TipOutList extends Component {
  componentWillMount() {
    if (!this.props.tipOuts[0]) {
      this.props.showNewTipOutDialog();
    }

    return null;
  }

  renderList() {
    return this.props.tipOuts.map((tipOut, index) => (
      <TipOutListItem
        key={tipOut.weekEnding}
        week={tipOut.weekEnding}
        cash={tipOut.totalCash}
        tipOutObj={tipOut}
        employees={this.props.people}
        tipOutIndex={index}
      />
    ),
    );
  }

  render() {
    if (!this.props.tipOuts[0] || !this.props.tipOuts) {
      return <NewTipOut isOpen={this.props.newTipOut} />;
    }

    return (
      <div>
        <List>
          {this.renderList()}
        </List>
        <NewTipOut isOpen={this.props.newTipOut} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOuts: state.tipOuts,
    people: state.activePeople,
    drawerOpen: state.showDrawer,
    newTipOut: state.showTipOutDialog,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    selectTipOut, 
    hideDrawer,
    showNewTipOutDialog,
    selectPeople }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutList);
