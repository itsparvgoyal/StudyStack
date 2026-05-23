import React from "react";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const Login = () => {

    const [formData , setFormData] = useState({
        email:"",
        password:"",
    });

    const { setUser } = useAuth();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const submitHandler = async (e) => {

        e.preventDefault();

        try {
            // response bhej do
            const response = await api.post(
                "/login",
                formData
            );
            // user me value rkh do  
            setUser(response.data.user);
            // user save krdo local pe
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            // jwt token local pe save krdo  
            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success(response.data.message);
            navigate("/");
        }
        catch(error){
            console.error(error);
            console.log("error in login" , error) 
            toast.error(
                error.response.data.message
            );
        }
    }

    return (
        <div className="flex justify-center items-center h-[80vh]">

            <form
                onSubmit={submitHandler}
                className="bg-zinc-900 p-10 rounded-2xl w-[400px] flex flex-col gap-5"
            >

                <h1 className="text-3xl font-bold">
                    Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={changeHandler}
                    className="bg-zinc-800 p-3 rounded-lg outline-none"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={changeHandler}
                    className="bg-zinc-800 p-3 rounded-lg outline-none"
                />

                <button
                    className="bg-blue-500 py-3 rounded-lg"
                >
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login;