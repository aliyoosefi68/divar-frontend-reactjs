import api from "src/configs/api";
import { getCookie } from "src/utils/cookie";

const token = getCookie("accessToken");
const getProfile = () => api.get("user/whoami").then((res) => res || false);

const getPosts = () => api.get("post/my");

const getAllPosts = () => api.get("");

export { getProfile, getPosts, getAllPosts };
