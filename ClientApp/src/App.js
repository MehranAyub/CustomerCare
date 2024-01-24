import { UserContext } from "./components/UserContext";
import { useState, useMemo } from "react";
import AdminLayout from "./Layouts/Admin/Index";
import UserLayout from "./Layouts/User";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard";
import CustomerComplaints from "./components/CustomerComplaints";
import AdminComplaints from "./components/AdminComplaints";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgentComplaints from "./components/AgentComplaints";
import Blogs from "./components/Blogs";
import HomePage from "./components/Home";
const App = () => {
  const [value, setValue] = useState([]);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={providerValue}>
          {user ? (
            <AdminLayout>
              <Routes>
                <Route
                  path="CustomerComplaints"
                  element={<CustomerComplaints />}
                />
                <Route path="AgentComplaints" element={<AgentComplaints />} />
                <Route path="AdminComplaints" element={<AdminComplaints />} />
                <Route path="users" element={<Customers />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/" element={<Dashboard />}></Route>
              </Routes>
            </AdminLayout>
          ) : (
            <>
              <UserLayout>
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Registration />} />
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/home" element={<HomePage />}></Route>
                </Routes>
              </UserLayout>
            </>
          )}
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
