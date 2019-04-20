const intialState = false;
export default (state = intialState, action) => {
    switch(action.type) {
        case 'ALLOW_YEAR_CLICK':
            return !state;
        default:
            return state;
    }
}