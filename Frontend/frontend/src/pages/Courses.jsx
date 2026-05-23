import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {

        try {

            const response = await api.get(
                "/getAllCourses"
            );

            // console.log(response.data);

            setCourses(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <h1 className="text-4xl font-bold mb-10">
                All Courses
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {
                    courses.map((course) => (

                        <div
                            key={course._id}
                            className="bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
                        >

                            <img
                                src={course.thumbnail}
                                alt=""
                                className="h-52 w-full object-cover"
                            />

                            <div className="p-5">

                                <h1 className="text-2xl font-bold">
                                    {course.name}
                                </h1>

                                <p className="text-gray-400 mt-3 line-clamp-3">
                                    {course.description}
                                </p>

                                <div className="flex justify-between items-center mt-5">

                                    <h2 className="text-blue-500 text-xl font-semibold">
                                        ₹ {course.price}
                                    </h2>

                                    <Link
                                        to={`/course/${course._id}`}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                    >
                                        View
                                    </Link>
                        
                                </div>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>
    );
};

export default Courses;