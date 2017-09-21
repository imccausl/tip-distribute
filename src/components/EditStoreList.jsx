import React, { Component } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SvgIcon from 'material-ui/SvgIcon';
import ContentAdd from 'material-ui/svg-icons/social/person-add';
import StoreListItem from './StoreListItem.jsx';

export default class EditStoreList extends Component {
  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(newProps) {
    
  }

  render() {
    const renderStores = () => {
      const { stores } = this.props;

      return Object.keys(stores).map(key => {

        return (
          <StoreListItem
            key={key}
            storeData={stores[key]}
          />
        );
      });
    };

    return (
      <div>
        <div style={{ position: 'fixed', zIndex: '5', width: '100%', top: '60px', left: '0' }}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={'All Stores'} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <IconButton
                tooltip="Add new store"
                onClick={() => {
                  const newStore = {
                   
                  };
                }}
              >
                <SvgIcon><ContentAdd /></SvgIcon>
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
        </div>

        <div style={{ margin: '120px 0 0 0' }}>
          {renderStores()}
        </div>
      </div>
    );
  }
}
