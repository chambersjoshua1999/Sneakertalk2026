import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, {useState} from 'react'
import "../App.css"
import video from '../LoginAssets/kix-2.mp4'
import logo from '../LoginAssets/kix.png'
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='registerPage flex'>
        <div className="container flex">
            <div className='videoDiv'>
                <video src={video} autoPlay muted loop></video>
                
                <div className="textDiv">
                    <h2 className='title'>Welcome to Sneaker Talk! </h2>
                    <p>Capture the heart of Kix Culture</p>
                </div>

                <div className="footerDiv flex">
                    <span className='text'>Have an account?</span>
                    <Link to = {'/login'}>
                    <button className='btn'>Login</button>
                    </Link>
                </div>
            </div>

            <div className='formDiv flex'>
                <div className='headerDiv'>
                    <img src = {logo} alt = "kix"/>
                    <h3>Registration</h3>
                </div>
                
                    <form action ="" className = "form grid">
                        <div className="inputDiv">
                            <label htmlFor="name">Name</label>
                            <div className="input flex">
                            <FaUserShield className="icon"/>
                            <input type = "text"  placeholder = 'Name' name="name"  onChange={handleChange}
                            ></input> 
                            </div>
                    
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                            <FaUserShield className="icon"/>
                            <input type = "text" placeholder = 'Email'  name="email" required onChange={handleChange}></input> 
                            </div>
                    
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="phone">Phone Number</label>
                            <div className="input flex">
                            <FaUserShield className="icon"/>
                            <input type = "text" placeholder = 'Phone Number' name="phone" required onChange={handleChange}></input> 
                            </div>
                    
                        </div>
                        
                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                            <FaUserShield className="icon"/>
                            <input type = "text"  placeholder = 'Username' name="username" required onChange={handleChange}></input> 
                            </div>
                    
                        </div>
                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                            <BsFillShieldLockFill className="icon"/>
                            <input type = "password" placeholder = 'Password' name="password" required onChange={handleChange}></input> 
                            </div>
                        </div>
                        <Link to = "/login">
                        <button type = "submit" className='btn flex' onClick = {handleSubmit}>
                            <span>Register</span>
                          
                            <AiOutlineSwapRight className='icon'/>
                        </button>
                        {err && <p>{err}</p>}
                        </Link>
                    </form>
                </div>
            </div>

    </div>
  );
};

export default Register;
