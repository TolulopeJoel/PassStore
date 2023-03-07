import axios from "axios";



const API_URL = "http://localhost:8000/api/";


const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
};


class WebsiteService {
  getAllWebsites() {
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


class CredentialService {
  getAllCredentials() {
    return axios.get(API_URL + "credentials/", { headers: getAuthHeader() });
  }

  getCredentialById(id) {
    return axios.get(API_URL + "credentials/" + id + "/", { headers: getAuthHeader() });
  }

  createCredential(data) {
    return axios.post(API_URL + "credentials/", data, { headers: getAuthHeader() });
  }

  updateCredential(id, data) {
    return axios.put(API_URL + "credentials/" + id + "/", data, { headers: getAuthHeader() });
  }

  deleteCredential(id) {
    return axios.delete(API_URL + "credentials/" + id + "/", { headers: getAuthHeader() });
  }
}

export { WebsiteService, CredentialService }