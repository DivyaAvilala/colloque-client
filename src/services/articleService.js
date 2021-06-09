import http from "./httpService";
import { apiUrl } from "../config.json";

// http.setJwt()
const apiEndpoint = apiUrl + "/articles";

export function getArticles(params) {
  const url = http.addQueryParams(apiEndpoint, params);
  return http.get(url);
}
export function getArticleById(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function editArticleById(id) {
  return http.get(apiEndpoint + "/edit/" + id);
}
export function createArticle(article) {
  return http.post(apiEndpoint, {
    title: article.title,
    content: article.content,
  });
}
export function updateArticle(article, id) {
  return http.put(apiEndpoint + "/" + id, {
    title: article.title,
    content: article.content,
  });
}
export function deleteArticle(id) {
  return http.delete(apiEndpoint + "/" + id);
}
