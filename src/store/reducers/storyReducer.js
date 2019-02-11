const initialState = {
  stories: []
};

const storyReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_STORY':
      console.log('Story created', action);
      return state;
    case 'CREATE_STORY_ERROR':
      console.log('Story create error', action.err);
      return state;
    case 'DELETE_STORY':
      console.log('Story deleted', action, state);
      const storyContent = action.story.content;
      return state.stories.filter(story => story.content !== storyContent);
    case 'DELETE_STORY_ERROR':
      console.log('Story delete error', action.err);
      return state;
    case 'COMMENT_STORY':
      return state;
    default: 
      return state;
  }
};

export default storyReducer;