import moment from 'moment';

export const isUserLoggedIn = () => localStorage.getItem('userData');
export const getUserData = () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
};
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

export const removeToken = () => {
    localStorage.removeItem('accessToken');
};

export const setToken = (token) => {
    localStorage.setItem('accessToken', token); // Ensure this is synchronous
  };
  
  export const getToken = () => {
    return localStorage.getItem('accessToken'); // This should retrieve the token after it's been set
  };

export const removeUserData = () => {
    localStorage.removeItem('userData');
};
export const setUserData = (val) => {
    localStorage.setItem('userData', val);
};

export const getDateFormat = (formattedDate) => {
    const formattedDateMoment = moment(`${formattedDate}`, 'YYYY-MM-DD HH:mm A');
    const formattedDateTime = moment(formattedDateMoment).format('llll');
    return formattedDateTime;
};

export const removeCookie = (cookieName) => {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};