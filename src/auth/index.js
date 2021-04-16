import { API } from '../config';

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//save the data(Network) into Local Storage
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {  //local storage is just a property of the browser's window object.
        localStorage.setItem('jwt', JSON.stringify(data)); //set key-value
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next(); //redirect user to a new page in the callback() function.
        return fetch(`${API}/signout`, {
            method: 'GET'
            })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};