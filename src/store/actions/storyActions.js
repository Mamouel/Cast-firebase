export const createStory = (story) => {
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


export const deleteStory = (story, storyId) => {
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