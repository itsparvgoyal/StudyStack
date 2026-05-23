import React from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const CourseCard = ({ course }) => {

    const { user } = useAuth();

    const requestCourse = async () => {

        try {

            const response = await api.post(
                "/student/requestCourse",
                {
                    courseId: course._id
                }
            );

            toast.success(response.data.message);

        } catch (error) {
            console.log(error);
            console.error(error);
            toast.error(
                error?.response?.data?.message
            );
        }
    };

    return (
        <div
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-blue-500 transition-all"
        >

            <img
                src={course.thumbnail}
                alt=""
                className="w-full h-52 object-cover"
            />

            <div className="p-5 flex flex-col gap-3">

                <h1 className="text-2xl font-bold">
                    {course.name}
                </h1>

                <p className="text-zinc-400 line-clamp-3">
                    {course.description}
                </p>

                <div className="flex justify-between items-center">

                    <h1 className="text-blue-500 text-2xl font-bold">
                        ₹ {course.price}
                    </h1>

                    {
                        user?.role === "Student" && (
                            <button
                                onClick={requestCourse}
                                className="bg-blue-500 px-5 py-2 rounded-lg"
                            >
                                Enroll
                            </button>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default CourseCard;