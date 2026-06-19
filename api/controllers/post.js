import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Retrieves posts from a database
export const getPosts = (req, res) => {

  // select all posts.
  const q = "SELECT * FROM posts";


  db.query(q, (err, data) => {
    
    // If there's an error, send a 500 status code and the error message
    if (err) return res.status(500).send(err);

    // Otherwise, send a 200 status code and the data as JSON
    return res.status(200).json(data);
  });
};

// Retrieves a single post from the database
export const getPost = (req, res) => {
 
  const q =
    "SELECT p.id, `username`, p.desc, p.img, p.createdAt, u.username FROM posts p JOIN users u ON u.id = p.userId WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {

    // return a 500 status code 
    if (err) return res.status(500).json(err);

   // send 200 status code and the first item 
    return res.status(200).json(data[0]);
  });
};

// Adds a new post to the database
export const addPost = (req, res) => {

  // Check if the user is authenticated 
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the token using secret key
  jwt.verify(token, "jwtkey", (err, userInfo) => {

    // If there's an error
    if (err) return res.status(403).json("Token is not valid!");

    // insert a new post into the database
    const q =
      "INSERT INTO posts(`desc`, `img`, `userId`, `createdAt`) VALUES (?)";


    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      req.body.date,
      
    ];

    db.query(q, [values], (err, data) => {

      // return a 500 status code 
      if (err) return res.status(500).json(err);

      // return a 200 status code 
      return res.json("Post has been created.");
    });
  });
};

// Deletes a post from the database
export const deletePost = (req, res) => {
  
  // Check if the user is authenticated 
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  // Verify the token 
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    

    if (err) return res.status(403).json("Token is not valid");

    // Otherwise, get the ID of the post
    const postId = req.params.id;

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    // Execute the SQL query with the postId and userInfo.id as parameters
    db.query(q, [postId, userInfo.id], (err, data) => {

      // If there's an error, return a 403 status code and an error message
      if (err) return res.status(403).json("You can delete only your post");

      // return a 200 status code 
      return res.json("Post has been deleted");
    });
  });
};

// Update a post
export const updatePost = (req, res) => {

  // Get the access token from the request cookies.
  const token = req.cookies.access_token;

  // Check if the token exists, if not, return an error response.
  if (!token) return res.status(401).json("Not authenticated!");

  // Verify the token using the "jwtkey" secret key. If the token is not valid, return an error response.
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Get the post ID from the request parameters.
    const postId = req.params.id;

    // SQL query to update the post with new values.
    const q =
      "UPDATE posts SET `desc`=?,`img`=? WHERE `id` = ? AND `userId` = ?";

    // An array containing the new values for the post.
    const values = [req.body.desc, req.body.img];

    // Execute the query using the values and post ID. If there's an error, return an error response. Otherwise, return a success response.
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};