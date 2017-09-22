/* User Story #1: Admin should be able to associate people from the existing people list
   with a store. If a person that is associated with one store is added to another store,
   the association to their previous store should be removed. This case is useful in the
   event that a person transfers to a different store.

   User Story #2: Tip outs belonging to a store should be deleted along with the store record.
   I can think of no use case in which changing the store association of a tip out would be useful.

   User Story #3: Admin should be able to create a new store record, so long as it doesn't conflict
   in address or store number with previous store records.

   General information: Stores function as 'groups' that hold both people and tip outs.
   The other function of stores is to keep track of 'phantoms' (substitute workers) that, while
   belonging to another store, fill in at another store and earn tips from that store for the hours
   they worked. A 'phantom' is not necessarily identified by name or store on the tip distribution
   report so this information has to either be supplied at the time that the phantom is in the store,
   or it will have to be inputted into the system as a partner number with no associated store.

   So, the obsticle to overcome here is: how/where to store information about phantoms? Should there be
   a seperate table for phantoms? Should they be stored in the people record and associated with the store
   that they worked at (even if they don't 'belong' to it as a regular worker), or sould there be a seperate
   row for phantoms within the store record (as there is a row for people)?
*/

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
