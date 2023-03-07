import axios from "axios";


const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
};


class WebsiteService {
  getAllWebsites() {
    return axios.get("/api/websites/", { headers: getAuthHeader() });
  }

  getWebsiteById(id) {
    return axios.get("/api/websites/" + id + "/", { headers: getAuthHeader() });
  }

  createWebsite(data) {
    return axios.post("/api/websites/", data, { headers: getAuthHeader() });
  }

  updateWebsite(id, data) {
    return axios.put("/api/websites/" + id + "/", data, { headers: getAuthHeader() });
  }

  deleteWebsite(id) {
    return axios.delete("/api/websites/" + id + "/", { headers: getAuthHeader() });
  }
}

export { WebsiteService }