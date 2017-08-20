import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { loggedIn } from '../actions/authActions';
import LoadingSpinner from './LoadingSpinner.jsx';

const UserIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: '/',
  allowRedirectBack: false,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsNotAuthenticated',
  authenticatedSelector: ({ firebase: { auth } }) => auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatingComponent: LoadingSpinner,
  //redirectAction: loggedIn,
});

export default UserIsNotAuthenticated;
