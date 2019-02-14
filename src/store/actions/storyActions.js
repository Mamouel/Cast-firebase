// @flow

import type { Stories, Story } from "../../../types/StoriesTypes";

export type CREATE_STORY = "CREATE_STORY";
export type CREATE_STORY_ERROR = "CREATE_STORY_ERROR";
export type DELETE_STORY = "DELETE_STORY";
export type DELETE_STORY_ERROR = "DELETE_STORY_ERROR";


export type Action = {
  type:
    | CREATE_STORY
    | CREATE_STORY_ERROR
    | DELETE_STORY
    | DELETE_STORY_ERROR,
  payload?: Stories,
  story?: Story,
  timestamp?: number,
  title?: string,
  id?: number,
  err?: string
};



type CreateStory = (story: Story) => Action;

export const createStory: CreateStory = (story: Story) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('stories').add({
      ...story,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_STORY', story });
    }).catch((err) => {
      dispatch({ type: 'CREATE_STORY_ERROR', err });
    })
  };
};

type DeleteStory = (story: Story, storyId: string) => Action;

export const deleteStory: DeleteStory = (story: Story, storyId: string) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    firestore.collection('stories').doc(storyId).delete()
      .then(() => {
        console.log('story deleted')
      })
      .then(() => {
        dispatch({ type: 'DELETE_STORY', story });
      }).catch((err) => {
        dispatch({ type: 'DELETE_STORY_ERROR', err });
      })
  };
};