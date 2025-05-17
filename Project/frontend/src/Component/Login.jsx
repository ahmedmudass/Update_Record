import React, { useState } from 'react';
import {toast,ToastContainer} from "react-toastify";
import {Link , useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export default function Login() {
    let [email,setEmail] = useState("")
    let [pss,setPss] = useState("")
    let nav = useNavigate();

    async function login_work(){
        try {
            await axios.post("http://localhost:3004/web/login",{
                email:email,
                password:pss,
            }).then((a)=>{
                toast.success(a.data.msg);
                localStorage.setItem("user data",JSON.stringify(a.data.user))
                setEmail("");
                setPss("");
                nav("/get");
            })
        } catch (error) {
            toast.error(error.response.data.msg);
        }
    }

    return (
        <div className='container'>
            <h2>User Login from</h2><hr />

            <p>Enter Your Email</p>
            <input type="text"
                placeholder='Enter Your Email'
                className='form-control my-2'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>

            <p>Enter Your Password</p>
            <input type="password"
                placeholder='Enter Your Password'
                className='form-control my-2'
                value={pss}
                onChange={(e)=>setPss(e.target.value)}/>

                <button className='btn-btn-primary my-2' onClick={login_work}>Login</button>
                <ToastContainer/>
                <br/>

                <Link to="/">Register Your Account</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/fp">Forget Your password</Link>
        </div>

    )
}
