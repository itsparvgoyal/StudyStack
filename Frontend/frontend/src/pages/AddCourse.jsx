import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";



const AddCourse = () => {
    
    // course ki id aaygi jab edit krenge 
    const { id } = useParams();
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        totalVideoLectures: "",
        totalAssignment: "",
        totalProject: "",
        courseLevel: "Beginner",
        courseCategory: "",
        courseStatus: "Draft",
        thumbnail: null,
        capacity: "",
    });


    const fetchCourse = async () => {

        try {

            const response = await api.get(
                `/course/getCourse/${id}`
            );

            const course = response.data.data;

            setFormData({
                name: course.name,
                description: course.description,
                price: course.price,
                totalVideoLectures: course.totalVideoLectures,
                totalAssignment: course.totalAssignment,
                totalProject: course.totalProject,
                courseLevel: course.courseLevel,
                courseCategory: course.courseCategory,
                courseStatus: course.courseStatus,
                thumbnail: null,
                capacity: course.capacity,
            });

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, []);

    // jaise hi user kuch change kre turant ui pi dikha rhe taki
    const changeHandler = (e) => {

        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };


    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            // ek form ka object bnao taki data backend bhej sake 
            const courseData = new FormData();
            
            // input wali values jo formdata me save ki thi wo isme daal do 
            for (let key in formData) {
                courseData.append(key, formData[key]);
            }

            let response;
            
            // agar id hai toh means update krna hai 
            if (id) {

                response = await api.put(
                    `/admin/updateCourse/${id}`,
                    courseData,
                    {  // ye isliye hota hai taki backend detect krle data "form" hai 
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Course Updated");
            }

            // wrna new course add krdo 
            else {
                response = await api.post(
                    "/admin/addCourse",
                    courseData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Course Added");
            }

            // console.log(response.data);
            
            // sumbit ke baad khali krdo fields ko 
            setFormData({
                name: "",
                description: "",
                price: "",
                totalVideoLectures: "",
                totalAssignment: "",
                totalProject: "",
                courseLevel: "Beginner",
                courseCategory: "",
                courseStatus: "Draft",
                thumbnail: null,
                capacity: "",
            });
            
            // wapis redirect krdo 
            navigate("/admin/dashboard");

        } catch (error) {

            console.log(error);
            console.error(error);
            toast.error(
                error?.response?.data?.message ||
                "Error"
            );
        }
    };

    return (

        <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">

            <form
                onSubmit={submitHandler}
                className="w-full max-w-3xl bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl space-y-6"
            >

                {/* Heading */}
                <h1 className="text-4xl font-bold text-center">

                    {
                        id
                            ? "Edit Course"
                            : "Create New Course"
                    }

                </h1>

                {/* Course Name */}
                <div>

                    <label className="block mb-2 text-sm text-gray-400">
                        Course Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter course name"
                        onChange={changeHandler}
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>

                {/* Description */}
                <div>

                    <label className="block mb-2 text-sm text-gray-400">
                        Description
                    </label>

                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        placeholder="Enter course description"
                        onChange={changeHandler}
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                    />

                </div>

                {/* Price */}
                <div>

                    <label className="block mb-2 text-sm text-gray-400">
                        Price
                    </label>

                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        placeholder="Enter price"
                        onChange={changeHandler}
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <input
                        type="number"
                        name="totalVideoLectures"
                        value={formData.totalVideoLectures}
                        placeholder="Total Lectures"
                        onChange={changeHandler}
                        className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                    />

                    <input
                        type="number"
                        name="totalAssignment"
                        value={formData.totalAssignment}
                        placeholder="Assignments"
                        onChange={changeHandler}
                        className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                    />

                    <input
                        type="number"
                        name="totalProject"
                        value={formData.totalProject}
                        placeholder="Projects"
                        onChange={changeHandler}
                        className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                    />

                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        placeholder="Capacity"
                        onChange={changeHandler}
                        className="bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                    />

                </div>

                {/* Course Level */}
                <select
                    name="courseLevel"
                    value={formData.courseLevel}
                    onChange={changeHandler}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                {/* Course Status */}
                <select
                    name="courseStatus"
                    value={formData.courseStatus}
                    onChange={changeHandler}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                </select>

                {/* Category */}
                <input
                    type="text"
                    name="courseCategory"
                    value={formData.courseCategory}
                    placeholder="Course Category"
                    onChange={changeHandler}
                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                />

                {/* Thumbnail */}
                <div>

                    <label className="block mb-2 text-sm text-gray-400">
                        Course Thumbnail
                    </label>

                    <input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        key={formData.thumbnail ? "filled" : "empty"}
                        onChange={changeHandler}
                        className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3"
                    />

                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl text-lg font-semibold"
                >
                    {
                        id
                            ? "Update Course"
                            : "Create Course"
                    }
                </button>

            </form>

        </div>
    );
};

export default AddCourse;