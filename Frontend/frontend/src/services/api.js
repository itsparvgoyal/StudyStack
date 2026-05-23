import axios from "axios";

// axios  ka ek custom object bnaya hai jise hum use kr skenge api.post() , api.get() ,...
// backend ko req bhejne ke lie 
// baseurl har kisi ke aage apne aap attach ho jayga 
// withCredintials : true ==> means har request ke sath cookies bhi bhejni hai ye khega browser ko 

const api = axios.create({
    baseURL: "https://studystack-mrz5.onrender.com/api/v1",
    withCredentials: true,
});

export default api;