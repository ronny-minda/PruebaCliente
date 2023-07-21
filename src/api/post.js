import axios from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:3000/posts",
});

export const getPost = () => postApi.get("/");

export const postPost = (post) => postApi.post("/", post);

export const putPost = (post) => postApi.put(`/${post.id}`, post);

export const deletePost = (id) => postApi.delete(`/${id}`);
