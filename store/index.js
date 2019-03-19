import { createStore, combineReducers } from 'redux';
function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0;
    }

    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// A very simple store
let store = createStore(combineReducers({ count: counter }));

export default store;