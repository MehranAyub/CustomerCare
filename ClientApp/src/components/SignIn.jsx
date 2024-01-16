import React from "react";
import chaione from "../assets/chaione.png";
import logo from "../assets/chaione.svg";
import arrow from "../assets/arrow-forward.svg";
import { TextField, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowErrorMessage("");
    axios
      .post("https://localhost:7268/api/Customer/ValidateCustomer", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
          setShowErrorMessage("Username or Password is incorrect");
        } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/Dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${chaione})`,
        backgroundRepeat: "no-repeat",
        height: "100vh",
        backgroundPosition: "right",
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Grid height={"100vh"} container justifyContent="flex-start">
          <Grid item xs={12} md={6} sx={{ backgroundColor: "white" }}>
            <Grid container justifyContent="center">
              <Grid item xs={10} md={8} sx={{ pt: "80px" }}>
                <img src={logo} alt="" />
              </Grid>
              <Grid item xs={10} md={8} sx={{ pt: "60px" }}>
                <h1
                  style={{
                    color: "#4D5159",
                    textAlign: "left",
                    letterSpacing: "-0.55px",
                    opacity: 1,
                    fontSize: "46px",
                  }}
                >
                  Welcome!
                </h1>
              </Grid>
              <Grid item xs={10} md={8} sx={{ pt: "3px" }}>
                <label
                  style={{
                    color: "#A0A9BA",
                    textAlign: "left",
                    letterSpacing: "0.09px",
                    opacity: "100%",
                    fontSize: "20px",
                  }}
                >
                  Sign in to our services.
                </label>
              </Grid>

              <Grid item xs={10} md={8} sx={{ pt: "35px" }}>
                <TextField
                  name="email"
                  fullWidth
                  size="large"
                  required
                  label="Enter Your Username or Email"
                  InputLabelProps={{ style: { color: "#A0A9BA" } }}
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={10} md={8} sx={{ pt: "33px" }}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  size="large"
                  label="Enter Your Password"
                  InputLabelProps={{ style: { color: "#A0A9BA" } }}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={10}
                md={8}
                sx={{ color: "red", pt: "2px", fontSize: "12px" }}
              >
                <span>{showErrorMessage}</span>
              </Grid>
              <Grid item xs={10} md={8} sx={{ pt: "32px" }}>
                <Button
                  sx={{
                    backgroundColor: "#0073A0",
                    width: "168px",
                    height: "48px",
                    fontSize: "16px",
                  }}
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs={10} md={8} sx={{ pt: "49px" }}>
                <label
                  style={{
                    color: "#A0A9BA",
                    textAlign: "left",
                    letterSpacing: "-0.23px",
                    opacity: "100%",
                    fontSize: "16px",
                  }}
                >
                  Forgot Password?
                </label>
              </Grid>
              <Grid item xs={10} md={8} sx={{ pt: "3px" }}>
                <label
                  style={{
                    color: "#A0A9BA",
                    textAlign: "left",
                    letterSpacing: "-0.23px",
                    opacity: "100%",
                    fontSize: "16px",
                  }}
                >
                  Do not have account yet? Sign up now!
                </label>
                <img
                  style={{
                    paddingLeft: "9.44px",
                    width: "16px",
                    height: "16px",
                  }}
                  src={arrow}
                  alt=""
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
