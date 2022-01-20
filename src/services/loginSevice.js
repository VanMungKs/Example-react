import axios from "../axios";

const hanldeLogin = (email, password) => {
  return axios.post("/login", { email, password });
};

export { hanldeLogin };
