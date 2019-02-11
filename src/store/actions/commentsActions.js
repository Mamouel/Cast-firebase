export const commentStory = (state, storyId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('comments').doc(storyId).set({
      "comments" : {
        ...state,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      }
    }, { merge: true }).then(() => {
      dispatch({ type: 'COMMENT_STORY', comment });
    }).catch((err) => {
      dispatch({ type: 'COMMENT_STORY_ERROR', err });
    })
  };
};
