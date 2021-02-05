import { navigate } from 'gatsby';
import auth0 from 'auth0-js';
const isBrowser = typeof window !== 'undefined';

// todo: for some reason these aren't pulled in zeit in env vars or secrets?
const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN || 'dev-2d73xy3s.auth0.com',
      clientID: process.env.AUTH0_CLIENTID || 'uuSfhbXRXVWVbNgUlvEAxE8uMWX8QiUH',
      redirectUri: process.env.AUTH0_CALLBACK || 'https://aa-springshow-web.now.sh/callback',
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {};

// insert after auth const
const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
};

let user = {};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  // eslint-disable-next-line no-undef
  return localStorage.getItem('isLoggedIn') === 'true';
};

export const login = () => {
  if (!isBrowser) {
    return;
  }

  auth.authorize();
};

const setSession = (cb = () => {}) => (err, authResult) => {
  if (err) {
    console.log('setSession err: ', err);
    navigate('/');
    cb();
    return;
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    user = authResult.idTokenPayload;
    // eslint-disable-next-line no-undef
    localStorage.setItem('isLoggedIn', true);
    navigate('/student-profile-form');
    cb();
  }
};

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }

  auth.parseHash(setSession());
};

export const getProfile = () => {
  return user;
};

export const silentAuth = (callback) => {
  if (!isAuthenticated()) return callback();
  auth.checkSession({}, setSession(callback));
};

export const logout = () => {
  // eslint-disable-next-line no-undef
  localStorage.setItem('isLoggedIn', false);
  auth.logout();
};
