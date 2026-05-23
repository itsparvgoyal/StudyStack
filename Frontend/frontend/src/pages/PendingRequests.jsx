import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const PendingRequests = () => {

    const [requests , setRequests] = useState([]);

    const fetchRequests = async () => {

        try {
            const response = await api.get("/admin/requests");
            setRequests(response.data.pending);
        }
        catch(error){
            console.log(error);
            console.error(error);
            toast.error(error.response.data.message);
        }

    }

    useEffect(() => {
        fetchRequests();
    } , []);


    const acceptHandler = async (id) => {

        try {

            const response = await api.put(
                "/admin/acceptRequest",
                {
                    reqFormId:id,
                }
            );

            toast.success(response.data.message);
            fetchRequests();
        }
        catch(error){
            console.log(error);
            console.error(error);
            toast.error(error.response.data.message);
        }

    }

    const rejectHandler = async (id) => {

        try {
            const response = await api.put(
                "/admin/rejectRequest",
                {
                    reqFormId:id,
                }
            );

            toast.success(response.data.message);
            fetchRequests();
        }
        catch(error){
            console.log(error);
            console.error(error);
            toast.error(error.response.data.message);
        }

    }

    return (
        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                Pending Requests
            </h1>

            <div className="flex flex-col gap-5">
                
                {
                    requests.length === 0 && (
                        <h1 className="text-2xl font-semibold">
                            No Pending Requests
                        </h1>
                    )
                }
                
                {
                    requests.map((req) => (
                        <div
                            key={req._id}
                            className="bg-zinc-900 p-5 rounded-xl flex justify-between items-center"
                        >

                            <div>
                                <h1 className="text-2xl font-semibold">
                                    {req.student.name}
                                </h1>

                                <p className="text-zinc-400">
                                    {req.course.name}
                                </p>
                            </div>

                            <div className="flex gap-3">

                                <button
                                    onClick={() => acceptHandler(req._id)}
                                    className="bg-green-500 px-5 py-2 rounded-lg"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => rejectHandler(req._id)}
                                    className="bg-red-500 px-5 py-2 rounded-lg"
                                >
                                    Reject
                                </button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default PendingRequests;