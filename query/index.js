const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, status, postId } = data;
    const post = posts[postId];

    if (post) {
      post.comments.push({ id, content, status });
    }
  }
  if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;
    const post = posts[postId];
    if (post) {
      const comment = post.comments.find((comment) => {
        return comment.id === id;
      });
      if (comment) {
        comment.status = status;
        comment.content = content;
      }
    }
  }
};

app.get("/posts", (req, res) => {
  res.send({
    status: "OK",
    posts,
  });
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
  axios.get("http://localhost:4005/events").then((res) => {
    console.log("Processing events:", res.data.length);
    res.data.forEach((event) => {
      console.log("Processing event:", event.type);
      console.log("Event data:", event.data);
      handleEvent(event.type, event.data);
    });
  }).catch((err) => {
    console.log(err.message);
  });
});
