import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
const CourseDetails = () => {

    const [course, setCourse] = useState(null);
    const { id } = useParams();
    const user = useAuth().user;

    const enrollHandler = async () => {

        try {
            const response = await api.post(
                `/student/enrollCourse`,
                {
                    courseId:course._id,
                }
            );  
            toast.success(response.data.message);

        } catch (error) {
            console.log(error);
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Error"
            );
        }
    };


    const fetchCourse = async () => {
        try {
            // console.log(id);
            
            const response = await api.get(
                `course/getCourse/${id}`
            );
            // console.log(response.data);
            setCourse(response.data.data);
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    if (!course) {
        return (
            <div className="min-h-screen bg-black text-white flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-black text-white p-10">

            <div className="max-w-5xl mx-auto">

                {/* Thumbnail */}
                <img
                    src={course.thumbnail}
                    alt=""
                    className="w-full h-[450px] object-cover rounded-2xl"
                />

                {/* Content */}
                <div className="mt-8">

                    <h1 className="text-5xl font-bold">
                        {course.name}
                    </h1>

                    <p className="text-gray-400 mt-5 text-lg">
                        {course.description}
                    </p>

                    {/* Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">

                        <div className="bg-[#111] p-5 rounded-xl border border-zinc-800">
                            <h2 className="text-gray-400">
                                Lectures
                            </h2>

                            <p className="text-2xl font-bold mt-2">
                                {course.totalVideoLectures}
                            </p>
                        </div>

                        <div className="bg-[#111] p-5 rounded-xl border border-zinc-800">
                            <h2 className="text-gray-400">
                                Assignments
                            </h2>

                            <p className="text-2xl font-bold mt-2">
                                {course.totalAssignment}
                            </p>
                        </div>

                        <div className="bg-[#111] p-5 rounded-xl border border-zinc-800">
                            <h2 className="text-gray-400">
                                Projects
                            </h2>

                            <p className="text-2xl font-bold mt-2">
                                {course.totalProject}
                            </p>
                        </div>

                        <div className="bg-[#111] p-5 rounded-xl border border-zinc-800">
                            <h2 className="text-gray-400">
                                Level
                            </h2>

                            <p className="text-2xl font-bold mt-2">
                                {course.courseLevel}
                            </p>
                        </div>

                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-center mt-10">

                        <div>
                            <h1 className="text-4xl text-blue-500 font-bold">
                                ₹ {course.price}
                            </h1>

                            <p className="text-gray-400 mt-2">
                                Capacity : {course.capacity}
                            </p>
                        </div>

                        {/* check if user has enrolled  and if yes then disable button and show text as enrolled*/}
                        {/* also check if user is admin do not allow him to enroll */}
                        {course && course.enrolledStudents && course.enrolledStudents?.includes(user._id) ? (
                            <button
                                type="button"
                                className="bg-gray-600 px-8 py-4 rounded-xl text-lg cursor-not-allowed"
                            >
                                Enrolled
                            </button>
                        ) : (   
                            <button
                                onClick={()=>{enrollHandler()}}
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg"
                            >
                                Enroll Now
                            </button>   
                        )}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CourseDetails;