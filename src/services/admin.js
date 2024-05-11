import api from "configs/api";

const addCategory = (data) => api.post("category", data);
const getCategory = () => api.get("category");
const deleteCategory = (data) => api.delete(`category/${data}`);

//options

const getOptions = () => api.get("option");
const addOptions = () => api.post("option", data);

export { addCategory, getCategory, deleteCategory, getOptions, addOptions };
