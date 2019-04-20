export default (state = [], action) => {
    switch(action.type) {
        case 'SHOW_SELECTED':
            if(state.indexOf(action.payload) >= 0) {
                return [ ...state.filter(element => element !== action.payload) ];
            } else {
                return [...state, action.payload];
            }
        case 'REMOVE_ALL_SHOWS':
            return [ ...state = [] ];

        default:
            return state;
    }
};
