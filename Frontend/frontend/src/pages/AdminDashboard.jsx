import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";


const AdminDashboard = () => {

    const [courses, setCourses] = useState([]);

    // fetch dashboard
    const fetchDashboard = async () => {
        try {
            const response = await api.get(
                "/admin/dashboard"
            );

            // console.log(response.data);
            setCourses(response.data.courses);

        } catch (error) {
            console.log(error);
        }
    };

    // delete course
    const deleteHandler = async (id) => {

        try {
            const response = await api.delete(
                `/admin/deleteCourse/${id}`
            );
            toast.success(response.data.message);
            fetchDashboard();
        } catch (error) {
            console.log(error);
            console.error(error);
            toast.error(
                error?.response?.data?.message
            );
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-10">

            {/* Top */}
            <div className="flex justify-between items-center min-[300px]:max-[500px]:flex-col min-[300px]:gap-2:max-[500px]:gap-2">

                <h1 className="text-3xl md:text-5xl font-bold sm:text-xl">
                    Admin Dashboard
                </h1>

                <div className="flex gap-5">

                    <Link
                        to="/admin/addCourse"
                        className="bg-blue-600 hover:bg-blue-700 lg:px-6 lg:py-3 rounded-xl px-3 py-1 text-center"
                    >
                        Add Course
                    </Link>

                    <Link
                        to="/admin/pendingRequests"
                        className="bg-yellow-500 hover:bg-yellow-600 lg:px-6 lg:py-3 rounded-xl px-3 py-1 text-center"
                    >
                        Pending Requests
                    </Link>

                </div>

            </div>

            {/* Courses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* if no courses added by admin*/}
                {
                    courses.length === 0 && (
                        <h1 className="text-2xl font-semibold">
                            No Courses added by you
                        </h1>
                    )
                }
                {
                    courses.map((course) => (

                        <div
                            key={course._id}
                            className="bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden"
                        >

                            {/* Thumbnail */}
                            <img
                                src={course.thumbnail}
                                alt=""
                                className="h-52 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-5">

                                <h1 className="text-2xl font-bold">
                                    {course.name}
                                </h1>

                                <p className="text-gray-400 mt-3 line-clamp-2">
                                    {course.description}
                                </p>

                                <div className="mt-5 space-y-2">

                                    <p className="text-blue-400 font-semibold">
                                        ₹ {course.price}
                                    </p>

                                    <p className="text-yellow-400">
                                        Enrolled Students :
                                        {" "}
                                        {course.enrolledStudents.length}
                                    </p>

                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-3 mt-6">

                                    {/* Edit */}
                                    <Link
                                        to={`/admin/updateCourse/${course._id}`}
                                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
                                    >
                                        Edit
                                    </Link>

                                    {/* Delete */}
                                    <button
                                        onClick={() =>
                                            deleteHandler(course._id)
                                        }
                                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default AdminDashboard;