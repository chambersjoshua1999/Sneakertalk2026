import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
const Home = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
    <div className="content">
    <div className="home">
      <div className="posts">
     
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link" to={`/post/${post.id}`}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            </Link>
            <div className="content">
            <Link className="link" to={`/post/${post.id}`}>
                <h2>{getText(post.desc)}</h2>
                </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    <Menu />
    </div>
  
  );
};

export default Home;
