import xios from "./xios";

const getAll = () => {
  return xios.get("/topics");
};

const get = (id) => {
  return xios.get(`/topics/${id}`);
};

const create = (data) => {
  return xios.post("/topics", data);
};

const update = (id, data) => {
  return xios.put(`/topics/${id}`, data);
};

const unarchiveAll = () => {
  return xios.put(`/topics/`);
};

const remove = (id) => {
  return xios.delete(`/topics/${id}`);
};

const removeAll = () => {
  return xios.delete(`/topics`);
};

const findByTitle = (title) => {
  return xios.get(`/topics?title=${title}`);
};

const findByTags = (tags) => {
  return xios.get(`/topics?tags=${tags}`);
};

const findByName = (name) => {
  return xios.get(`/topics?name=${name}`);
};

const TopicsAxios = {
  getAll,
  get,
  create,
  update,
  unarchiveAll,
  remove,
  removeAll,
  findByTitle,
  findByTags,
  findByName
};

export default TopicsAxios;
