import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
};

class WebsiteService {
  getAllWebsite() {
    return axios.get(API_URL + "websites/", { headers: getAuthHeader() });
  }

  getWebsiteById(id) {
    return axios.get(API_URL + "websites/" + id + "/", { headers: getAuthHeader() });
  }

  createWebsite(data) {
    return axios.post(API_URL + "websites/", data, { headers: getAuthHeader() });
  }

  updateWebsite(id, data) {
    return axios.put(API_URL + "websites/" + id + "/", data, { headers: getAuthHeader() });
  }

  deleteWebsite(id) {
    return axios.delete(API_URL + "websites/" + id + "/", { headers: getAuthHeader() });
  }
}

export default new WebsiteService();