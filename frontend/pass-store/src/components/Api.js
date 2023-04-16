import axios from "axios";


const apiBaseURL = "http://localhost:8000/api/"

const api = axios.create({
  baseURL: apiBaseURL,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // Check if the error is due to an invalid or expired token
    if (error.response.status === 401) {
      // Redirect the user to the sign-in page
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);


export const apiWithoutToken = axios.create({
  baseURL: apiBaseURL,
});


export default api;