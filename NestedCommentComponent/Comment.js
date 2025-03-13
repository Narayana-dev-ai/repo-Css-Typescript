import React, { useState } from 'react';

const Comment = ({ comment, addReply }) => {
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText('');
    }
  };

  return (
    <div style={{ marginLeft: 20, marginBottom: 10 }}>
      <p>{comment.text}</p>
      <form onSubmit={handleReplySubmit}>
        <input
          type="text"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Add a reply"
        />
        <button type="submit">Reply</button>
      </form>
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addReply={addReply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;