import { useState } from "react";
import { useNavigate } from "react-router";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import CloudinaryUploadWidget from "./cloudinaryWidget";

import "./create-post-styles.css";

function Uploader({ chooseImage }) {
  const [publicId, setPublicId] = useState([]);
  const [cloudName] = useState("proj3");
  const [uploadPreset] = useState("gallery");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    showAdvancedOptions: true,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  let myUrl = publicId.url;
  const myImage = cld.image(publicId.public_id);

  return (
    <div className="cloudinary-upload">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      <div className="image-upload-preview">
        <AdvancedImage
          cldImg={myImage}
          plugins={[responsive(), placeholder()]}
        />
      </div>
      {myUrl ? (
        <button className="img-upload-btn" onClick={() => chooseImage(myUrl)}>
          + To Post
        </button>
      ) : null}
    </div>
  );
}

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    tldr: "",
    body: "",
    tags: "",
    date: "",
    img: "",
  });

  // tags
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  console.log(tags);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  // uploaded image
  const [img, setImg] = useState("");

  const chooseImage = (img) => {
    setImg(img);
    updateForm({ img: img });
  };

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPerson = { ...form };

    await fetch("http://localhost:5050/record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ title: "", tldr: "", body: "", tags: "", date: "", img: "" });
    navigate("/");
  }

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
      updateForm({ tags: tags });
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  return (
    <div className="create-post">
      {/* <h3>Create New Post</h3> */}
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={form.title}
              onChange={(e) => updateForm({ title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tldr">TLDR</label>
            <input
              type="text"
              className="form-control"
              id="tldr"
              value={form.tldr}
              onChange={(e) => updateForm({ tldr: e.target.value })}
            />
            <div className="form-group">
              <label htmlFor="tldr">Body</label>
              <input
                type="text"
                className="form-control"
                id="body"
                value={form.body}
                onChange={(e) => updateForm({ body: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="tldr">Tags</label>
            <input
              value={input}
              // placeholder="Enter a tag"
              onKeyDown={onKeyDown}
              onKeyUp={onKeyUp}
              onChange={onChange}
            />
          </div>
          <div className="pills">
            {tags.map((tag, i) => (
              <li key={tag}>
                <div className="pill"> {tag} </div>
                <button className="delete-tag-btn" type="button">
                  X
                </button>
              </li>
            ))}
          </div>
          {/* tag input works  */}
          {/* <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              className="form-control"
              id="tags"
              value={form.tags}
              onChange={(e) => updateForm({ tags: e.target.value })}
            />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              className="form-control"
              id="date"
              value={form.date}
              onChange={(e) => updateForm({ date: e.target.value })}
            />
          </div> */}
          {!img ? null : (
            // <div className="form-group">
            //   <input
            //     type="text"
            //     className="form-control"
            //     id="img-upload"
            //     value={img}
            //   />
            // </div>
            <h3>Image Added</h3>
          )}
          <div className="form-group">
            <input type="submit" className="form-control" />
          </div>
        </form>
      </div>
      <Uploader chooseImage={chooseImage} />
    </div>
  );
}
