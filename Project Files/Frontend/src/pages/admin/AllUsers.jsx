import { useEffect, useState, useContext } from "react";
import api from "../../Api/axios";
import { useGeneral } from "../../context/GeneralContext";
import "./AdminTables.css";
const AllUsers = () => {
  const { user } = useGeneral();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get(`/admin/users?role=${user.role}`)
      .then(res => setUsers(res.data));
  }, []);



return (
  <div className="admin-page">
    <h3>All Users</h3>

    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`role-badge role-${u.role}`}>
                  {u.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default AllUsers;
