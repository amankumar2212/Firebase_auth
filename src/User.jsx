import React, { useEffect, useState } from 'react'
import { auth } from './Firebase';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "animate.css/animate.min.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './User.css'

const User = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserName(user.displayName);
            } else {
                setUserName("");
            }
        });
    }, []);

    const bounce = cssTransition({
        enter: "animate__animated animate__bounceIn",
        exit: "animate__animated animate__bounceOut"
    });

    const handleSignout = () => {
        signOut(auth).then(() => {
            toast.success(`Bye ${userName} Logging Out`, {
                transition: bounce
            });
            navigate('/login');

        }).catch((err) => {
            toast.error(`Logout Failed Due To: ${err.message}`, {
                transition: bounce
            })
        })
    }
    return (
        <>
            <ToastContainer />
            {userName && (

                <>
                    <div className='login-success'>

                        <h1>Welcome {userName}</h1>
                        <p>Hello World!</p>
                        <button onClick={handleSignout}>Logout</button>
                    </div>
                </>
            )}
        </>
    );
}

export default User