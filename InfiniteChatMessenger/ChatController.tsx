import { useState } from "react";
import Comment from "./Comment";

interface CommentModel {
  id: number;
  user: string;
  content: string;
  replies: any[];
}

export const ChatController = () => {
  const [comments, setComments] = useState([]);

  const addReply = (parentId: number, replyText: string) => {
    const newReply: CommentModel = {
      id: Date.now(),
      user: "CurrentUser",
      content: replyText,
      replies: [],
    };

    const findReplyParent = (comments: any) => {
      return comments.map((com: CommentModel) => {
        if (com.id == parentId) {
          return { ...com, replies: [...com.replies, newReply] };
        } else if (com.replies.length > 0) {
          return { ...com, replies: findReplyParent(com.replies) };
        } else {
          return com;
        }
      });
    };

    setComments(findReplyParent(comments));
  };

  return (
    <div>
      {comments.map((comment: CommentModel) => (
        <Comment key={comment.id} comment={comment} onAddReply={addReply} />
      ))}
    </div>
  );
};
