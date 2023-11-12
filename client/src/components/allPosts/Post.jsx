import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./post-styles.css";

const Post = () => {
  const params = useParams();
  let location = useLocation();
  const [post, setPost] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      console.log(id);
      const response = await fetch(`http://localhost:5050/record/${params.id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setPost(record);
      setTags(record.tags);
    }

    fetchData();
    console.log("UseEff");

    return;
  }, [location]);

  function TagList() {
    return tags.map((tag, i) => (
      <div className="pill" key={i}>
        {tag}
      </div>
    ));
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-title">{post.title}</div>
        <div className="post-tldr">{post.tldr}</div>
        <div className="pills">
          <TagList />
        </div>
      </div>
      <div className="post-img">
        <img src={post.img} />
      </div>
      <div className="post-body">{post.body}</div>
      <div className="post-date">{post.date}</div>
    </div>
  );
};

export default Post;
