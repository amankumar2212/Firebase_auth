import React, { useState } from 'react'
import './Register.css'
import { useNavigate, Link } from "react-router-dom"
import { toast, ToastContainer, cssTransition } from 'react-toastify'
import "animate.css/animate.min.css";
import 'react-toastify/dist/ReactToastify.css'
import InputController from './InputController';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const App = () => {

    const [input, setInput] = useState({ name: "", gender: "", dob: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        setInput({ ...input, [name]: value });
    }

    const bounce = cssTransition({
        enter: "animate__animated animate__bounceIn",
        exit: "animate__animated animate__bounceOut"
    });


    const handleSubmit = async (e) => {
        await e.preventDefault();

        if (!input.email || !input.cpassword || !input.name || !input.password || !input.dob || !input.gender) {
            toast.error("Fill all Fields", { transition: bounce });
            return;
        }
        if (input.password !== input.cpassword) {
            toast.error("Password Does not Match", { transition: bounce });
            return;
        }

        createUserWithEmailAndPassword(auth, input.email, input.password)
            .then((res) => {
                const user = res.user;
                updateProfile(user, {
                    displayName: input.name,
                });
                toast.success("Register Successfully", { transition: bounce })
                navigate('/login');
            }).catch((err) => toast.error(`Error : ${err.message}`, { transition: bounce }));

    }


    return (
        <>
            <div className='register-form'>
               <h2>Sign Up</h2>
                <div className="user-register">
                    <InputController onChange={handleInput} name='name' value={input.name} label='Name' type='text' placeholder='Enter Your Name' />
                    <InputController onChange={handleInput} name='dob' value={input.dob} label='Date of Birth' type='date' placeholder='Enter Your Date of Birth' />
                    <label>Gender</label>
                        <select
                            type="text"
                            name='gender'
                            value={input.gender}
                            onChange={handleInput}>
                            <option>---Select Your Gender---</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                  
                    <InputController onChange={handleInput} name='email' value={input.email} label='Email' type='email' placeholder='Enter Your Email' />
                    <InputController onChange={handleInput} name='password' value={input.password} label='Password' type='password' placeholder='Enter Your Password' />
                    <InputController onChange={handleInput} name='cpassword' value={input.cpassword} label='Confirm Password' type='password' placeholder='Confirm Your Password' />

                    <p>Already Have Account?<Link to='/login'> Sign in</Link></p>
                    <button type='submit' onClick={handleSubmit}>Register</button>


                </div>
            </div>
        </>

    )
}

export default App