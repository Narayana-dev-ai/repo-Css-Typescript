import { useState } from "react";

interface CommentModel {
  comment: { id: number; user: string; content: string; replies: any[] };
  onAddReply: any;
}

const Comment: React.FC<CommentModel> = ({ comment, onAddReply }) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmit = (e: any) => {
    e.preventDefault();
    if (replyText.trim()) {
      onAddReply(comment.id, replyText);
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="comment" style={{ marginLeft: "20px", marginTop: "10px" }}>
      <div>
        <strong>{comment.user}</strong>: {comment.content}
      </div>
      <button onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {comment.replies.map((reply: any) => (
        <Comment key={comment.id} comment={reply} onAddReply={onAddReply} />
      ))}
    </div>
  );
};

export default Comment;
