import { Box } from "@mui/material";
import { height } from "@mui/system";
import path from "path";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import MakeList from "../Pages/MakeList";
import MyLists from "../Pages/MyLists";
import Navbar from "./../components/Navbar";
import StartList from "./../Pages/StartList";
import AList from "./../Pages/AList";
import Login from "./../Pages/Auth/Login";
import SharedList from "./../Pages/SharedList";
import Footer from "../components/Footer";
import Inspiration from "../Pages/Inspiration";
import Discover from "./../Pages/Discover";
import About from "../Pages/About";
import SignUp from "../Pages/Auth/SignUp";

function AuthLayout() {
  return (
    <Box sx={{ backgroundColor: "black", height: "auto" }}>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path={"/Home"} element={<Home />}></Route>
        <Route path={"/StartList"} element={<StartList />}></Route>
        <Route path={"/Inspiration"} element={<Inspiration />}></Route>
        <Route path={"/Discover"} element={<Discover />}></Route>
        <Route path={"/About"} element={<About />}></Route>
        <Route path="*" element={<Login />} />

        <Route
          path={"/MakeList/:occasion/:title/:date/:note"}
          element={<MakeList />}
        ></Route>
        <Route path={"/AList/:id"} element={<AList />}></Route>
        <Route path={"/MyLists"} element={<MyLists />}></Route>
        <Route path={"/Login"} element={<Login />}></Route>
        <Route path={"/Register"} element={<SignUp />}></Route>
        <Route path={"/SharedList/:id"} element={<SharedList />}></Route>
      </Routes>
    </Box>
  );
}

export default AuthLayout;
