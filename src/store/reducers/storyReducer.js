const initialState = {
  stories: [
    {id: '1', title: 'help me find peach', content: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', content: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah'}
  ]
};

const storyReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_STORY':
      console.log('Story created', action.article);
      return state;
    case 'CREATE_ARTICLE_ERROR':
      console.log('Story create error', action.err);
      return state;
    default: 
      return state;
  }
};

export default storyReducer;