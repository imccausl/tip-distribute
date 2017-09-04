import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { notLoggedIn } from '../actions/authActions';
import LoadingSpinner from './LoadingSpinner.jsx';

const UserIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated',
  authenticatedSelector: ({ firebase: { auth } }) => !auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  authenticatingComponent: LoadingSpinner,
  // redirectAction: notLoggedIn,
});

export default UserIsAuthenticated;
