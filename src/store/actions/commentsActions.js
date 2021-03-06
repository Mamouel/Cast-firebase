export const commentStory = (state) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('comments').add({
      ...state,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'COMMENT_STORY', state });
    }).catch((err) => {
      dispatch({ type: 'COMMENT_STORY_ERROR', err });
    })
  };
};