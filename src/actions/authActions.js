function notLoggedIn() {
  return {
    type: 'UNAUTHED_REDIRECT',
    payload: {
      message: 'You must be logged in.',
    },
  };
}

function loggedIn() {
  return {
    type: 'AUTHED_REDIRECT',
    payload: {
      message: 'User is authenticated. Redirecting home...',
    },
  };
}

export {
  notLoggedIn,
  loggedIn,
};
