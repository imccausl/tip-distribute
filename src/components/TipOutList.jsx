import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import NewTipOut from './NewTipOut.jsx';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';
import { showNewTipOutDialog } from '../actions/newTipOutDialogActions';

class TipOutList extends Component {
  componentWillMount() {
    console.log("in TipOutList:",this.props.tipOuts);
    
    if (!this.props.tipOuts[0]) {
      this.props.showNewTipOutDialog();
    }

    return null;
  }

  renderList() {
    return this.props.tipOuts.map(tipOut => (
      <TipOutListItem
        key={tipOut.weekEnding}
        week={tipOut.weekEnding}
        cash={tipOut.totalCash}
        employees={tipOut.employees}
        clicked={() => {
          this.props.selectTipOut(tipOut);
          this.props.hideDrawer();
        }}
      />
    ),
    );
  }
  
  render() {
    console.log(this.props.tipOuts);

    if (!this.props.tipOuts[0]) {
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
    drawerOpen: state.showDrawer,
    newTipOut: state.showTipOutDialog,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTipOut, hideDrawer, showNewTipOutDialog }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutList);
