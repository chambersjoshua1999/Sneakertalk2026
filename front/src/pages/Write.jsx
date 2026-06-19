import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";


const Write = () => {
  const { currentUser } = useContext(AuthContext);
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");

  const [file, setFile] = useState(null);



  const navigate = useNavigate()

  // Define the upload function
  const upload = async () => {
    try {
      
      const formData = new FormData();
      formData.append("file", file);

      // Send a POST request to upload the file
      const res = await axios.post("/upload", formData);
      

      // Return the filename of the uploaded file
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            desc: value,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            desc: value,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
       
        <div className="editorContainer">
          <ReactQuill
           placeholder={`What's on your mind ${currentUser.name}?`}

            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1> Publish </h1>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <h3>
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          </h3>
          <div className="buttons">
            <button onClick={handleClick}> Share </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
