import xios from "./xios";

const getAll = () => {
  return xios.get("/postings");
};

const get = (id) => {
  return xios.get(`/postings/${id}`);
};

const create = (data) => {
  return xios.post("/postings", data);
};

const update = (id, data) => {
  return xios.put(`/postings/${id}`, data);
};

const remove = (id) => {
  return xios.delete(`/postings/${id}`);
};

const removeAll = () => {
  return xios.delete(`/postings`);
};

const findByTitle = (title) => {
  return xios.get(`/postings?title=${title}`);
};

const findByTags = (tags) => {
  return xios.get(`/postings?tags=${tags}`);
};

const findByName = (name) => {
  return xios.get(`/postings?name=${name}`);
};

const PostingAxios = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByTags,
  findByName
};

export default PostingAxios;
