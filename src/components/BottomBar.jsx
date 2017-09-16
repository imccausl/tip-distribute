import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import MoneyIcon from 'material-ui/svg-icons/editor/monetization-on';
import StatsIcon from 'material-ui/svg-icons/editor/show-chart';
import PeopleIcon from 'material-ui/svg-icons/action/supervisor-account';
import Paper from 'material-ui/Paper';
import selectView from '../actions/viewAction';

class BottomBar extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
  }

  select(index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    return (
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: '5' }}>
        <Paper zDepth={1}>
          <BottomNavigation selectedIndex={this.props.view.payload.selection}>
            <BottomNavigationItem
              label="Edit"
              icon={<EditIcon />}
              onClick={() => {
                this.props.selectView('SHOW_EDIT_VIEW', 0, this.props.view.payload.key);
              }}
            />
            <BottomNavigationItem
              label="Distribute"
              icon={<MoneyIcon />}
              onClick={() => this.props.selectView('SHOW_DISTRIBUTE_TIPS', 1, this.props.view.payload.key)}
            />
            <BottomNavigationItem
              label="People"
              icon={<PeopleIcon />}
              onClick={() => this.props.selectView('SHOW_EDIT_PEOPLE', 2, this.props.view.payload.key)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    view: state.activeView,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectView }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
