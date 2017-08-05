import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { showDrawer } from '../actions/drawerActions';

const MainMenu = () => (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="MenuItem" />
        <MenuItem primaryText="MenuItem2" />
        <MenuItem primaryText="MenuItem3" />
      </IconMenu>
    );

class TipAppBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        title="Tip Out Generator"
        iconElementRight={<MainMenu />}
        onLeftIconButtonTouchTap={() => this.props.showDrawer()}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    drawerOpen: state.showDrawer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showDrawer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TipAppBar);
