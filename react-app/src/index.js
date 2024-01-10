import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="products" element={<Products />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="customers" element={<Customers />} />
        <Route path="addProducts" element={<AdminProductList />} />
        <Route path="orderList" element={<OrderList />} />
        <Route path="orderDetail/:id" element={<OrderDetail />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userOrders" element={<UserOrders />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
