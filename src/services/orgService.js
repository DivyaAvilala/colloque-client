import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/org";

export function getOrgNames() {
  return http.get(apiEndpoint);
}
