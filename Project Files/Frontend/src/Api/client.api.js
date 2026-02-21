import api from "./axios";

const getUser = () => JSON.parse(localStorage.getItem("user"));

export const clientAPI = {
  createProject: (data) => {
    const user = getUser();
    return api.post("/projects", {
      ...data,
      clientId: user.id,
      role: user.role
    });
  },

  myProjects: () => {
    const user = getUser();
    return api.get(`/projects/client/${user.id}`);
  },

  applications: () => {
    const user = getUser();
    return api.get(`/applications/client/${user.id}`);
  }
};
