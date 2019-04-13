export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_SHOWS':
            return [...state, ...action.payload];
        default:
            return state;
    }
};