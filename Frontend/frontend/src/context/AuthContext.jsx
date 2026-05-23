import React from "react";
import { createContext, useContext, useState } from "react";

// context bnaya taki har jagh user ki info share kr ske 
const AuthContext = createContext();

// provider yaha hi laga dia 
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// custom hook bna dia kuch nhi hai fucn hi hai simple jo usecontext(Authcontext) ko call krdega
export const useAuth = () => {
    return useContext(AuthContext);
};