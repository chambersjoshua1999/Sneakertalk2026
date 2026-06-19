import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Defining a functional component named Menu 
const Menu = () => {
  
  // Initializing posts state with an empty array using useState hook
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // Defining an async function 
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // Calling fetchData function to fetch data 
    fetchData();
  });

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post?.img}`} alt="" />
          <Link className="link" to={`/post/${post.id}`}>
                <h2>{getText(post.desc)}</h2>
              </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;

//rfc
