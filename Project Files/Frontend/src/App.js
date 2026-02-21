import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Landing from "./Landing";
import Authenticate from "./Authenticate";

import Admin from "./pages/admin/Admin";
import AllUsers from "./pages/admin/AllUsers";
import AllApplications from "./pages/admin/AllApplications";

import Client from "./pages/client/Client";
import Freelancer from "./pages/freelancer/Freelancer";
import VerifyOtp from "./pages/VerifyOtp";

import NewProject from "./pages/client/NewProject";
import ProjectApplications from "./pages/client/ProjectApplications";
import ProjectWorking from "./pages/client/ProjectWorking";

import ProjectData from "./pages/freelancer/ProjectData";
import MyApplications from "./pages/freelancer/MyApplications";
import WorkingProjects from "./pages/freelancer/WorkingProject";
import SubmitWork from "./pages/freelancer/SubmitWork";
import MySubmissions from "./pages/freelancer/MySubmissions";
import AdminAllProjects from "./pages/admin/AdminAllProjects";
import AdminStats from "./pages/admin/AdminStats";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ===== Public ===== */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

       
      {/* ===== ADMIN ===== */}
<Route element={<Authenticate role="admin" />}>
  <Route path="/admin" element={<Admin />}>

    {/* Dashboard (default page) */}
    <Route index element={<AdminStats/>} />

    <Route path="users" element={<AllUsers />} />
    <Route path="applications" element={<AllApplications />} />
    <Route path="projects" element={<AdminAllProjects />} />

  </Route>
</Route>


        {/* ===== CLIENT ===== */}
        <Route element={<Authenticate role="client" />}>
          <Route path="/client" element={<Client />}>
            <Route index element={<NewProject />} />
            <Route path="new-project" element={<NewProject />} />
            <Route path="applications" element={<ProjectApplications />} />
            <Route path="working" element={<ProjectWorking />} />
          </Route>
        </Route>

      <Route path="/freelancer" element={<Freelancer />}>
  <Route path="projects" element={<ProjectData />} />
  <Route path="applications" element={<MyApplications />} />
  <Route path="working" element={<WorkingProjects />} />
  <Route path="submit-work/:projectId/:clientId" element={<SubmitWork />} />
  <Route path="submissions" element={<MySubmissions />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
