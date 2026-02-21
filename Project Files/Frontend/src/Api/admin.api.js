import api from "./axios";


const getUser = () => JSON.parse(localStorage.getItem("user"));

export const adminAPI = {
  stats: () => {
    const user = getUser();
    return api.get(`/admin/stats?role=${user.role}`);
  },

  users: () => {
    const user = getUser();
    return api.get(`/admin/users?role=${user.role}`);
  },

  projects: () => {
    const user = getUser();
    return api.get(`/admin/projects?role=${user.role}`);
  },

  applications: () => {
    const user = getUser();
    return api.get(`/admin/applications?role=${user.role}`);
  }
};
