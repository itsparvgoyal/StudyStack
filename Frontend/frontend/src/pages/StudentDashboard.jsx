import { useEffect, useState } from "react";
import api from "../services/api";

const StudentDashboard = () => {

    const [courses, setCourses] = useState([]);

    // fetch enrolled courses
    const fetchDashboard = async () => {

        try {
            const response = await api.get(
                "/student/dashboard"
            );
            
            // console.log(response.data);
            setCourses(response.data.courses);
        } catch (error) {
            console.error(error);   
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-5xl font-bold">
                Student Dashboard
            </h1>

            {/* Courses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {/* if no course enrolled */}
                {
                    courses.length === 0 && (
                        <h1 className="text-2xl font-semibold">
                            No courses enrolled by you
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

                                <p className="text-blue-400 mt-4 font-semibold">
                                    ₹ {course.price}
                                </p>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default StudentDashboard;