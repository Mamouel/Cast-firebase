// @flow
import type { StoriesState } from "../../../types/StoriesTypes";
import type { Action } from "../actions/storyActions";

const initialState: StoriesState = {
  stories: []
};

type StoriesReducer = (state: StoriesState, action: Action) => StoriesState;

const storyReducer: StoriesReducer = (
  state: StoriesState = initialState, 
  action: Action
) => {
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
    default: 
      return state;
  }
};

export default storyReducer;