import React, { useState } from 'react';
import {toast,ToastContainer} from "react-toastify";
import {Link , useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Forgetpass() {
    let [email,setEmail] = useState("")

    async function fp(){
        try {
            await axios.post(`http://localhost//3004/web/forget`,{
                email : email
            }).then((a)=>{
                toast.success(a.data.msg)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className='container'>
            <h2>Forget Password</h2><hr />

            <p>Enter Your Email</p>
            <input type="text"
                placeholder='Enter Your Email'
                className='form-control my-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <button className='btn-btn-primary my-2' onClick={fp}>Sent Link</button>
        </div>
    )
}