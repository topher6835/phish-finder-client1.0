import { combineReducers } from 'redux';
import yearsReducer from './yearsReducer';
import showsReducer from './showsReducer';

const selectedShowReducer = (state=[], action) => {
    switch(action.type) {
        case 'SHOW_SELECTED':
            if(state.indexOf(action.payload) >= 0) {
                return [ ...state.filter(element => element !== action.payload) ];
            } else {
                return [...state, action.payload];
            }
        default:
            return state;
    }
};

export default combineReducers({
    shows: showsReducer,
    selectedShows: selectedShowReducer,
    years: yearsReducer
});