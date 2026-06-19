
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../App.css"
import video from '../LoginAssets/kix-2.mp4'
import logo from '../LoginAssets/kix.png'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";


const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='loginPage flex'>
        <div className="container flex">
            <div className='videoDiv'>
                <video src={video} autoPlay muted loop></video>
                
                <div className="textDiv">
                    <h2 className='title'>Welcome to Sneaker Talk! </h2>
                    <p>Capture the heart of Kix Culture</p>
                </div>

                <div className="footerDiv flex">
                    <span className='text'>Dont have an account?</span>
                    <Link to = {'/register'}>
                    <button className='btn'>Sign up</button>
                    </Link>
                </div>
            </div>

            <div className='formDiv flex'>
                <div className='headerDiv'>
                    <img src = {logo} alt = "kix"/>
                    <h3>Welcome!</h3>
                </div>
                
                    <form className = "form grid">
                      

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                            <FaUserShield className="icon"/>
                            <input type = "text"  name="username" placeholder = 'Enter Username' onChange={handleChange}></input> 
                            </div>
                    
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                            <BsFillShieldLockFill className="icon"/>
                            <input type = "password"  name="password" placeholder = 'Enter Password' onChange={handleChange
                            }></input> 
                            </div>
                        </div>
                        
                        <button type = "submit" className='btn flex' onClick={handleSubmit}>
                            <span> Login </span>
                            <AiOutlineSwapRight className='icon'/>
                        </button>

                        {err && <p>{err}</p>}

                    </form>
                </div>
            </div>
    </div>
  );
};

export default Login;
