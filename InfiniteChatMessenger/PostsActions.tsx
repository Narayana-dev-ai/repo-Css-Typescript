import React, { useState } from 'react';

// Generic Post Component
const Post = ({ id, content, onThumbsUp, onThumbsDown, onLike, reactions }) => {
  return (
    <div className="post">
      <p>{content}</p>
      <div className="reactions">
        <button onClick={() => onThumbsUp(id)}>👍 {reactions.thumbsUp}</button>
        <button onClick={() => onThumbsDown(id)}>👎 {reactions.thumbsDown}</button>
        <button onClick={() => onLike(id)}>❤️ {reactions.like}</button>
      </div>
    </div>
  );
};

// Main Feed Component
const Feed = ({ posts }) => {
  const [reactions, setReactions] = useState(
    posts.reduce((acc, post) => {
      acc[post.id] = { thumbsUp: 0, thumbsDown: 0, like: 0 };
      return acc;
    }, {})
  );

  const handleThumbsUp = (postId) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: {
        ...prevReactions[postId],
        thumbsUp: prevReactions[postId].thumbsUp + 1,
      },
    }));
  };

  const handleThumbsDown = (postId) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: {
        ...prevReactions[postId],
        thumbsDown: prevReactions[postId].thumbsDown + 1,
      },
    }));
  };

  const handleLike = (postId) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [postId]: {
        ...prevReactions[postId],
        like: prevReactions[postId].like + 1,
      },
    }));
  };

  return (
    <div className="feed">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          content={post.content}
          onThumbsUp={handleThumbsUp}
          onThumbsDown={handleThumbsDown}
          onLike={handleLike}
          reactions={reactions[post.id]}
        />
      ))}
    </div>
  );
};

// Example Usage
const App = () => {
  const posts = [
    { id: 1, content: "This is the first post!" },
    { id: 2, content: "Another post here." },
    { id: 3, content: "Yet another post." },
    // Add more posts as needed
  ];

  return <Feed posts={posts} />;
};

export default App;