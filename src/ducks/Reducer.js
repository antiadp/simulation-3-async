import axios from 'axios';

const initialState = {
    user: {} //defaulted to an empty obj b/c database info comes back into an array of objects
}

const GET_USER = 'GET_USER'

export function getUser() {
   let userData = axios.get('/auth/authenticated').then( res => {
       return res.data;
   })
    return {
        type: GET_USER,
        payload: userData
    }
}

export default function reducer (state = initialState, action) { //initial state will be user
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload}) //merging contents of objects into the left most object // merge everything into state 
        default:
            return state;
    }
}

