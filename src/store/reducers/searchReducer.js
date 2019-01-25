const initialState = {
  storiesFound: []
};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_SUCCESS':
      console.log('search success', action);
      return action.state;
    case 'SEARCH_ERROR':
      console.log('search error', action.err);
      return state;
    default: 
      return state;
  }
};

export default searchReducer;
