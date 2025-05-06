import React, { useState } from 'react';
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


export default function Regsiter() {
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [pss,setPss] = useState("")
    let [age,setAge] = useState(0)

    function clear(){
        setName("");
        setEmail("");
        setPss("");
        setAge(0);
    }

    async function save_data(){
        try {
            await axios.post("http://localhost:3004/web/reg",{
                name:name,
                email:email,
                password:pss,
                age:age,
            })
            toast.success("Data Saved Successfully")
            clear();
        } catch (error) {
            if(error.status === 409){
                toast.error("email already exist")
            }
            else{
                toast.error(error)
                console.log(error)
            }

        }
    }

    return (
        <div className='container'>
            <h2>User Registration from</h2><hr />

            <p>Enter Your Name</p>
            <input type="text"
                placeholder='Enter Your Name'
                className='form-control my-2'
                value={name}
                onChange={(e)=>setName(e.target.value)}/>

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

            <p>Enter Your Age</p>
            <input type="number"
                placeholder='Enter Your Age'
                className='form-control my-2'
                value={age}
                onChange={(e)=>setAge(e.target.value)}/>

                <button className='btn-btn-primary my-2' onClick={save_data}>Register Yourself</button>
                <ToastContainer/>
        </div>

    )
}



