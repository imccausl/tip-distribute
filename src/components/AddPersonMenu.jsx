import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SuperSelectField from 'material-ui-superselectfield';
import Popover from 'material-ui/Popover';
import Subheader from 'material-ui/Subheader';

export default class SearchMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dataSource = [
      'Testing',
      'Testing1',
      'Testing2',
      'Testing3',
      'teesting123',
    ];

    const dataSourceNodes = dataSource.map(node => <div>{node}</div>);

    return (
      <Popover
        open={this.props.open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        zDepth={3}
        onRequestClose={() => {
          this.props.closeMenu();
        }}
        useLayerForClickAway={false}
        canAutoPosition={false}
      >
        <AutoComplete
          style={{ padding: '0 10px', overflow: 'hidden' }}
          name="getPeople"
          floatingLabelText="Add Person"
          hintText="Person Name"
          dataSource={dataSource}
        />
      </Popover>
    );
  }
}