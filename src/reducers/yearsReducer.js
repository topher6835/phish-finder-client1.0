export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_YEARS':
            return action.payload;
        default:
            return state;
    }
};
