'use strict';

const { combineReducers } = require('redux');

const init = {
    display: {
        main: { },
        action: [ ]
    }
};

const showActionResult = (state = init, action) => {
    const type = action.type;
    let newState = { ...state };
    if(type === 'SHOW_ACTION_RESULT') {
        newState.display.action.push(action.result);
    } else {
        return state;
    }
    return newState;
};

const reducers = combineReducers({
    showActionResult,
});

module.exports = reducers;