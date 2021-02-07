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

const findByTag = (tag) => {
  return xios.get(`/postings?tag=${tag}`);
};

const findByContributor = (contributor) => {
  return xios.get(`/postings?contributor=${contributor}`);
};

const PostingAxios = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  findByTag,
  findByContributor
};

export default PostingAxios;
