import { Link } from "react-router-dom";

const Post = (props) => (
  <tr>
    <td>{props.record.title}</td>
    <td>{props.record.tldr}</td>
    <td>{props.record.date}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default Post;
