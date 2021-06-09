import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/register";

export function register(user) {
  // const data = {};
  return http.post(apiEndpoint, {
    category: user.category,
    email: user.email,
    password: user.password,
    name: user.name,
    orgName: user.orgName,
    deptName: user.deptName,
  });
}
