import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registration
export const register = (req, res) => {
  //check if user alrady exist
  const q = "SELECT * FROM users WHERE username = ? or email = ?";

  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.js(err);
    if (data.length)
      return res.status(409).json("User has already been created");

    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Store all information and the hashed password in DB.
    const q =
      "INSERT INTO users(`name`,`email`,`phone`, `username`, `password`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.username,
      hash,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created");
    });
  });
};

//Login with tokenization
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User does not Exist");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Incorrect Username or Password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User successfully logged out!.");
};
