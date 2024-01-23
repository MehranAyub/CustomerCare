import { Outlet, Link } from "react-router-dom";
import { UserContext } from "./components/UserContext";
import { useState, useMemo } from "react";
import AdminLayout from "./Layouts/Admin/Index";
import UserLayout from "./Layouts/User";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Customers from "./components/Customers";
import AdminProductList from "./components/AdminProductList";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import Dashboard from "./components/Dashboard";
import UserOrders from "./components/UserOrders";
import CustomerComplaints from "./components/CustomerComplaints";
import AdminComplaints from "./components/AdminComplaints";

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
                <Route path="products" element={<Products />} />
                <Route
                  path="CustomerComplaints"
                  element={<CustomerComplaints />}
                />
                <Route path="AdminComplaints" element={<AdminComplaints />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="users" element={<Customers />} />
                <Route path="addProducts" element={<AdminProductList />} />
                <Route path="orderList" element={<OrderList />} />
                <Route path="orderDetail/:id" element={<OrderDetail />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="userOrders" element={<UserOrders />} />
                <Route path="/" element={<Dashboard />}></Route>
              </Routes>
            </AdminLayout>
          ) : (
            <>
              <UserLayout>
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Registration />} />
                  <Route path="/" element={<Login />}></Route>
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
