import { useEffect,useState } from "react";
import AppLottie from "./AppLottie";
import React from 'react'
import TextBox from "../component/TextBox";
import PasswordBox from "../component/PasswordBox";
import Button from "../component/Button";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ setIsLoginPage }) {
    const [username,setUsername] = useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const request={
        username,
        password
    }
 

    

    const handleOnClick = ()=>{
        axios.post("http://localhost:8080/api/auth/login",request).then((response)=>{
            console.log(response.data);
            console.log(response.data.token)
            const token = response.data.token
            
            getUserIdFromToken(response.data.token)

        }).then(()=>{
            const role = localStorage.getItem("role");
        if(role === "ROLE_NORMAL"){
            navigate("/dashBoard")
        }else{
            navigate("/admin")
        }
            //navigate(`/`);
        }).catch((error)=>{
            alert("Please check your user name or password")
        })
    }

    
    const getUserIdFromToken = (token) => {
        const decodedToken = jwt_decode(token);
        localStorage.setItem("token",token)
        localStorage.setItem("role",decodedToken.role[0].name)
        console.log(decodedToken.userId)
        console.log(decodedToken.role[0].name);

    }

        

    console.log(localStorage.getItem("token"))
    
    useEffect(() => {
        setIsLoginPage(true);
        return () => setIsLoginPage(false);
    }, [setIsLoginPage]);
    return (
        <>
            <div className="flex h-screen ">
                <div className="w-1/2">
                    <AppLottie />
                </div>


                <div className=" w-1/2 flex justify-center items-center flex-col ">
                    <div className="shadow-2xl p-3 m-3 rounded-lg flex justify-center items-center flex-col">
                        <h1 className=" font-bold">Login</h1>
                        
                        <div class="flex w-72 flex-col gap-6">
            <div class="relative h-10 w-full min-w-[200px] mt-8 mb-8">
                <input
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Email
                </label>
          </div>
    </div>
    <div class="flex w-72 flex-col gap-6">
            <div class="relative h-10 w-full min-w-[200px]  mb-8">
                <input
                type='password'
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Password
                </label>
            </div>
    </div>
    <button
            class="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-950 transition-all hover:shadow-lg hover:shadow-black focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true" onClick={(e)=>handleOnClick(e)}
        >
            Login
        </button><br /><h1>If not registered Please Sign up</h1><br />
        <Link to="/signup">
        <button  class="middle none center rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-950 transition-all hover:shadow-lg hover:shadow-black focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true" onClick={() => setIsLoginPage(true)}>Sign up</button>
      </Link>
                    </div>
                </div>
            </div>
      </>
    );
}

export default Login;
