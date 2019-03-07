import React from 'react';
import { Link } from 'react-router-dom';


import "../../style/components/stories/comments-list.scss";

const CommentsList = (props) => {

  const { comments, storyId } = props;
  return (
    <div className="comment-ctn">
      <div className="comment-card">
        {comments && comments.map((comment, id) => {
          return (
            comment.storyId === storyId &&
            <div className="comment-infos" key={id}>
              <div className="comment-author">
                <Link to={'/profile/' + comment.authorId}>
                  {comment.authorFirstName} {comment.authorLastName}: 
                </Link>
              </div>
              <div className="comment-content">
                {comment.commentContent}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentsList;