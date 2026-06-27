import axios from "axios";

export const UpdateProject = async (data) =>
    await axios.post("http://localhost:8080/api/updateProject", data)

export const deleteProject = async (data) =>
    await axios.post("http://localhost:8080/api/svDeleteProject", data)

export const CreateProject = async (data) =>
    await axios.post("http://localhost:8080/api/createProject", data)

export const getStrokes = async (data) =>
    await axios.post("http://localhost:8080/api/getStrokes", data)

export const LogIn = async (data) =>
    await axios.post("http://localhost:8080/api/login", data)

export const getProjects = async (data) =>
    await axios.post("http://localhost:8080/api/getProjects", data)