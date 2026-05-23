import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


// means ye pehle user ki detail fetch krga useAuth se and then apa jo page render krna chate hai 
// wo dekhega ki apa ja skte hai ya nhi us per 

const ProtectedRoute = ({ children , role }) => {
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/login" />
    }
    if(role && user.role !== role){
        return <Navigate to="/" />
    }
    return children;
}

export default ProtectedRoute;