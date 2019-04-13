import backEnd from '../apis/backEnd';

// thunk middleware allows function return. needed for async/await.
export const fetchYears = () => {
    return async (dispatch) => {
        const response = await backEnd.get('/getYears');

        dispatch({ type: 'FETCH_YEARS', payload: response.data.data });
    };
    
};

export const fetchShowsInYear = (year) => {
    return async (dispatch) => {
        const response = await backEnd.get(`/show/year/${year}`);

        dispatch({ type: 'FETCH_SHOWS', payload: response.data.data});
    }
};

export const selectShow = (show) => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_SELECTED', payload: show });
    };

    //  return {
         
         
    //  };
 };
 