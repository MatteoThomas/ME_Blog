import { Route, Routes } from "react-router-dom";

import Navbar from "./components/nav/Navbar";
import RecordList from "./components/allPosts/AllPosts";
import Edit from "./components/editPost/EditPost";
import Create from "./components/createPost/CreatePost";
import BackendList from "./components/allPosts/AllPostsBACKEND";
import Post from "./components/allPosts/Post";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<RecordList />}></Route>
        <Route path="/backend" element={<BackendList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path=":id" element={<Post />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
};

export default App;
