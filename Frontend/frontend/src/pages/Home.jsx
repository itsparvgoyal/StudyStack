import { useEffect, useState } from "react";
import api from "../services/api";
import HomeHeroText from "../components/HomeHeroText";

const Home = () => {

    const [courses , setCourses] = useState([]);

    const fetchCourses = async () => {

        try {
            const response = await api.get("/getAllCourses");
            setCourses(response.data.data);
        }
        catch(error){
            console.error("Failed to fetch courses", error);
        }
    }

    useEffect(() => {
        fetchCourses();
    } , []);

    const [text , setText] = useState("");



    return (
        <div className="p-10">
        <HomeHeroText />
        <p className="text-xl text-gray-500 mt-[9rem] ">
            {/* make bullet points */}
            <ul className="gap-3 flex flex-col ">
                <li>• Discover industry-ready courses designed to help students grow their skills.</li>
                <li>• Request enrollments seamlessly and access a smooth learning experience.</li>
                <li>• Built to make modern education simple, interactive, and accessible.</li>
            </ul>
        </p>
        </div>
    )
}

export default Home;