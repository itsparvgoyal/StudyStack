import axios from "axios";

// axios  ka ek custom object bnaya hai jise hum use kr skenge api.post() , api.get() ,...
// backend ko req bhejne ke lie 
// baseurl har kisi ke aage apne aap attach ho jayga 
// withCredintials : true ==> means har request ke sath cookies bhi bhejni hai ye khega browser ko 

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

export default api;