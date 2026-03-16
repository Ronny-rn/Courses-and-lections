import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5059/api",
    withCredentials: true, // sends HTTP-only cookie automatically
    headers: {
        "Content-Type": "application/json",
    },
});



export const getMe = () =>
    api.get("/Users/me");

export const login = (username, password) =>
    api.post("/Users/login", { username, password });

export const logout = () =>
    api.post("/Users/logout");

export const register = (fullName, username, password, age) =>
    api.post("/Users/register", { fullName, username, password, age });



export const getSubjects = () =>
    api.get("/subjects");

export const getSubjectById = (subjectId) =>
    api.get(`/subjects/${subjectId}`);



export const getCoursesBySubject = (subjectId) =>
    api.get(`/courses/${subjectId}`);



export const getOrder = (orderId) =>
    api.get(`/Order/${orderId}`);

export const createOrder = (customerId, courseIds) =>
    api.post("/Order", { customerId, courseIds });

export const updateOrder = (orderId, customerId, courseIds) =>
    api.put(`/Order/${orderId}`, { customerId, courseIds });

export const deleteOrder = (orderId) =>
    api.delete(`/Order/${orderId}`);

export default api;