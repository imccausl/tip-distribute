import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';
import { hideDrawer } from '../actions/drawerActions';

class TipOutList extends Component {
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
    return (
      <div>
      <List>
        {this.renderList()}
      </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOuts: state.tipOuts,
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTipOut, hideDrawer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutList);
