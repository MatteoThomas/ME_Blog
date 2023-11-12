import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";

import "./all-posts-styles.css";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <li key={record._id}>
          <Link to={record._id}>
            <PostCard
              record={record}
              deleteRecord={() => deleteRecord(record._id)}
              key={record._id}
            />
          </Link>
        </li>
      );
    });
  }

  return <div className="all-posts-container">{recordList()}</div>;
}
