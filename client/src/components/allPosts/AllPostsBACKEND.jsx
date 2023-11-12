import { useEffect, useState } from "react";

import PostCard from "./PostCard";

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
        <PostCard
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Posts</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>TITLE</th>
            <th>TLDR</th>
            <th>DATE</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}
