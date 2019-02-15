const initialState = {
  comments: []
};

const commentReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'COMMENT_STORY':
      console.log('story commented', action);
      return state;
    case 'COMMENT_STORY_ERROR':
      console.log('story comment error', action.err);
      return state;
    default: 
      return state;
  }
};

export default commentReducer;