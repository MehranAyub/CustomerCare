import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import { useState, useMemo } from "react";
import AdminLayout from "./Layouts/Admin/Index";
import UserLayout from "./Layouts/User";
const App = () => {
  const [value, setValue] = useState([]);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  const role = JSON.parse(localStorage.getItem("user"))?.role;
  console.log("checking", role);
  return (
    <div>
      <UserContext.Provider value={providerValue}>
        {role === "admin" ? (
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        ) : (
          <>
            <UserLayout>
              <Outlet />
            </UserLayout>
          </>
        )}
      </UserContext.Provider>
    </div>
  );
};

export default App;
