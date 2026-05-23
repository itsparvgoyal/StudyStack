import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    

    const [formData , setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"Student",
    });

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/register" , formData);
            // console.log(formData);
            setUser(response.data.user);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            toast.success(response.data.message);
            // console.log(response.data.user.role);         
            // navigate to home page 
            navigate("/");
        }
        catch(error){
            console.log(error);
            console.error(error);
            toast.error(error.response.message);
        }

    }

    return (
        <div className="flex justify-center items-center h-[80vh]">

            <form
                onSubmit={submitHandler}
                className="bg-zinc-900 p-10 rounded-2xl w-[400px] flex flex-col gap-5"
            >

                <h1 className="text-3xl font-bold">
                    Signup
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={changeHandler}
                    className="bg-zinc-800 p-3 rounded-lg outline-none"
                />

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

                <select
                    name="role"
                    onChange={changeHandler}
                    className="bg-zinc-800 p-3 rounded-lg outline-none"
                >
                    <option value="Student">
                        Student
                    </option>

                    <option value="Admin">
                        Admin
                    </option>
                </select>

                <button
                    className="bg-blue-500 py-3 rounded-lg"
                >
                    Signup
                </button>

            </form>

        </div>
    )
}

export default Signup;