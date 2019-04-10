import decode from 'jwt-decode';

export default () => {
  if (localStorage.getItem('token')) {
    const token = decode(localStorage.getItem('token'));
    const user = {
      id: token.id,
      name: token.name,
      email: token.email,
      token: localStorage.getItem('token')
    }
    return user;
  } else {
    return {};
  }
};