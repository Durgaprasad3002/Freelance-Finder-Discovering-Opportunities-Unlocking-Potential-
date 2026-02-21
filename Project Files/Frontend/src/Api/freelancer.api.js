import api from "./axios";

const getUser = () => JSON.parse(localStorage.getItem("user"));

export const freelancerAPI = {
  allProjects: () => api.get("/projects"),

  applyProject: (projectId, data) => {
    const user = getUser();
    return api.post("/applications/apply", {
      ...data,
      freelancerId: user.id,
      role: user.role
    });
  },

  myApplications: () => {
    const user = getUser();
    return api.get(`/applications/freelancer/${user.id}`);
  }
};
