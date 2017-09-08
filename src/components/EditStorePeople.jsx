import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import SvgIcon from 'material-ui/SvgIcon';
import ContentAdd from 'material-ui/svg-icons/social/person-add';
import StorePerson from './StorePerson.jsx';

function mapStateToProps(state) {
  return {
    people: state.firebase.data.people,
    profile: state.firebase.profile,
    stores: state.firebase.data.stores,
    users: state.firebase.data.users,
  };
}

@firebaseConnect(['/stores', '/people', '/users'])
@connect(mapStateToProps)
export default class EditStorePeople extends Component {
  constructor(props) {
    super(props);

    const userPeopleRecord = this.props.people[this.props.profile.ref];
    const userStore = this.props.stores[userPeopleRecord.storeRef];
    
    this.state = { userStore };
  }

  render() {
    const renderPeople = () => {
      console.log("Store people:", this.state.userStore);
      return this.state.userStore.people.map((person) => {
        let personEmail = null;
        const personRecord = this.props.people[person];

        console.log("PersonRecord:", personRecord);

        if (personRecord.userRef) {
          personEmail = this.props.users[personRecord.userRef].email;
        }

        return (
          <StorePerson
            key={person}
            name={personRecord.displayName}
            partnerNum={personRecord.partnerNum}
            storeRef={personRecord.storeRef}
            email={personEmail}
          />
        );
      });
    };

    return (
      <div>
        <div style={{ position: 'fixed', zIndex: '5', width: '100%', top: '60px', left: '0' }}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text={`People at Store ${this.state.userStore.storeNum}`} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <IconButton
                tooltip="Add person to store"
                onTouchTap={() => {

                }}
              >
                <SvgIcon><ContentAdd /></SvgIcon>
              </IconButton>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
        </div>

        <div style={{ margin: '70px 0' }}>
          {renderPeople()}
        </div>
      </div>
    );
  }
}
