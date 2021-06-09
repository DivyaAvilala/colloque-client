import http from "./httpService";
import { apiUrl } from "../config.json";

// http.setJwt()
const apiEndpoint = apiUrl + "/videos";

export function getVideos(params) {
  const url = http.addQueryParams(apiEndpoint, params);
  return http.get(url);
}

export function getVideoById(id) {
  return http.get(apiEndpoint + "/" + id);
}
export function editVideoById(id) {
  return http.get(apiEndpoint + "/edit/" + id);
}
export function createVideo(video) {
  return http.post(apiEndpoint, video);
}
export function updateVideo(video, id) {
  return http.put(apiEndpoint + "/" + id, {
    title: video.title,
    content: video.content,
  });
}
export function deleteVideo(id) {
  return http.delete(apiEndpoint + "/" + id);
}

export function uploadVideo(files) {
  let formData = new FormData();
  const config = {
    header: { "content-type": "multipart/form-data" },
  };
  console.log(files);
  formData.append("file", files[0]);

  return http.post(apiEndpoint + "/uploadVideo", formData, config);
}

export function generateThumbnail(fileDetails) {
  return http.post(apiEndpoint + "/thumbnail", fileDetails);
}
