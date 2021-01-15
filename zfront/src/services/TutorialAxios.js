import xios from "../xios";

const getAll = () => {
  return xios.get("/tutorials");
};

const get = id => {
  return xios.get(`/tutorials/${id}`);
};

const create = data => {
  return xios.post("/tutorials", data);
};

const update = (id, data) => {
  return xios.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return xios.delete(`/tutorials/${id}`);
};

const removeAll = () => {
  return xios.delete(`/tutorials`);
};

const findByTitle = title => {
  return xios.get(`/tutorials?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
