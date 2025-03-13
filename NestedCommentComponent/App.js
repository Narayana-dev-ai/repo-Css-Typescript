import React, { useState } from 'react';
import Comment from './Comment';

const App = () => {
  const initialComments = [
    {
      id: 1,
      text: 'This is the first comment',
      replies: [
        {
          id: 2,
          text: 'This is a reply to the first comment',
          replies: [
            {
              id: 3,
              text: 'This is a nested reply to the first comment',
              replies: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      text: 'This is another top-level comment',
      replies: [],
    },
  ];

  const [comments, setComments] = useState(initialComments);

  const addReply = (parentId, text) => {
    setComments((prevComments) => {
      return addReplyToComment(prevComments, parentId, text);
    });
  };

  const addReplyToComment = (comments, parentId, text) => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              text,
              replies: [],
            },
          ],
        };
      }
      if (comment.replies) {
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentId, text),
        };
      }
      return comment;
    });
  };

  return (
    <div>
      <h1>Nested Comment Component</h1>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          addReply={addReply}
        />
      ))}
    </div>
  );
};

export default App;