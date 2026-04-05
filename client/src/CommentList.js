import React from "react";
import { useEffect } from "react";

export default function CommentList({ comments }) {
  useEffect(() => {
    console.log(comments);
  }, [comments]);
  return (
    <div>
      {comments?.map((comment) => (
        <ul key={comment.id}>
          <li>{comment.content}</li>
        </ul>
      ))}
    </div>
  );
}
