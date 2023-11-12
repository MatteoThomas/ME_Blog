import "./postcard-styles.css";

const PostCard = (props) => (
  <div className="post-card">
    <div className="card-img">
      <img src={props.record.img} />
    </div>
    <div className="card-body">
      <div className="card-title">{props.record.title}</div>
      {/* <div className="card-tldr">{props.record.tldr}</div> */}
      {/* <div className="card-date">{props.record.date}</div> */}
    </div>
  </div>
);

export default PostCard;
