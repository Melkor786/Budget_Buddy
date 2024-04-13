import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000/api/v1"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("user_info")){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info").token)}`
    }
    return req;
})

export const signInGoogle = (accessToken) => API.post("/users/login", {
    googleAccessToken: accessToken
})
