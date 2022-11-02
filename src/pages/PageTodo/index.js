import React, {useCallback, useContext, useEffect, useState} from "react";
import { Button } from "../../components/Button";
import { Post } from "../../components/Post";
import { addPost, editPost, getPost } from "../../api/postsServises";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

export const PageTodo = () => {
  const gendate = new Date();

  let day = gendate.getDate();
  let month = gendate.getMonth() + 1;
  let year = gendate.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
  let date = `${day}-${month}-${year}`;

  let user = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [edited, setEdited] = useState(false);
  const [postId, setPostId] = useState(null);



  const loadData = useCallback(async () => {
    const data = await getPost("posts");
    if (data.status < 400) {
      const posts = await data.json();
      setPosts(posts);
    }
  }, []);

  const heandleTitle = (event) => {
    setTitle(event.target.value);
  };

  const heandleBody = (event) => {
    setBody(event.target.value);
  };


  const creatPost = useCallback(async () => {

      const newPost = {
        id: uuid(),
        title,
        body,
        nickname: user.nickName,
        date,
      };
      console.log(newPost)
      const data = await addPost("posts", newPost);
      if (data.status < 400) {
        loadData();
      } else {
        setError("Упс, что то пошло не так");
      }

  }, [title,body]);

  const editedPost = useCallback(async () => {
    const newPost = {
      id: postId,
      title: title,
      body: body,
      date,
    };

    const data = await editPost("posts", postId, newPost);
    if (data.status < 400) {
      loadData();
    }
  }, [postId, title, body]);

  useEffect(() => {
    setError("");
  }, [title, body,  date]);

  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <div>
      <Link to="./">
        <button>Home</button>
      </Link>
      <input type="text" value={title} onChange={heandleTitle} />
      <input type="text" value={body} onChange={heandleBody} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {edited ? (
        <Button text={"Edit post"} func={editedPost} />
      ) : (
        <Button text={"Add post"} func={creatPost} />
      )}
      <div>
        {posts.map(({ id, title, body, nickname, date }) => (
          <Post
            setPostId={setPostId}
            setEdited={setEdited}
            setTitle={setTitle}
            setBody={setBody}
            loadData={loadData}
            key={id}
            id={id}
            title={title}
            body={body}
            nickname={nickname}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};
