import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { bindActionCreators } from 'redux';
import TipOutListItem from './TipOutListItem.jsx';
import selectTipOut from '../actions/tipOutActions';

class TipOutList extends Component {
  renderList() {
    return this.props.tipOuts.map(tipOut => (
      <TipOutListItem 
        key={tipOut.date}
        name={tipOut.date}
        hours={tipOut.cash}
        employees={tipOut.employees}
        clicked={() => this.props.selectTipOut(tipOut)}
      />
    ),
    );
  }

  render() {
    return (
      <div>
      <List>
        <Subheader>Tipout Week Ending:</Subheader>
        {this.renderList()}
      </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tipOuts: state.tipOuts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectTipOut }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipOutList);
