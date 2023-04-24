import React, { useState } from 'react'
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import InputController from './InputController';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import "animate.css/animate.min.css";
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [userName, setUserName] = useState('');
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  }

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });


  const handleSubmission = () => {
    if (!user.email || !user.password) {
      toast.error('Please Fill all Field', { transition: bounce });
      return;
    }

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        toast.success(`Login Successfully`, { transition: bounce });
        navigate("/user");
      })
      .catch((err) => {
        toast.error(`Error Due To : ${err.message}`);
      });
  };
  return (
    <>

      <div className='user-container'>
        <h2>Login</h2>
        <div className='user-login'>
          <InputController
            onChange={handleInput}
            name='email' value={user.email}
            label='Email'
            placeholder='Enter Your Email'
          />

          <InputController
            onChange={handleInput}
            name='password'
            value={user.password}
            label='Password'
            type='password'
            placeholder='Enter Your Password'
          />
          <p>Already Have Account? <Link to='/'>Register Here</Link></p>
          <button type='submit' onClick={handleSubmission}>Login</button>
        </div>

      </div>
    </>

  )
}

export default Login