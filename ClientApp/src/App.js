import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import { useState, useMemo } from "react";
import AdminLayout from "./Layouts/Admin/Index";
import UserLayout from "./Layouts/User";
const App = () => {
  const [value, setValue] = useState([]);
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <UserContext.Provider value={providerValue}>
        {user ? (
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
