import React from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import LoginIcon from "@mui/icons-material/Login";

export default function Login() {
  const [showErrorMessage, setShowErrorMessage] = useState("");
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
    // prevents the submit button from refreshing the page
    console.log(formData);
    axios.defaults.headers.post["Content-Type"] = "application/json";

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
          if (response.data.role !== "admin") {
            // navigate("/products");
            window.location.href = "/products";
          } else {
            window.location.href = "/dashboard";
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 12, height: "75vh" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <h3>SignIn</h3>
          </Grid>
          <Grid item mb={2} xs={12} md={12}>
            <TextField
              name="email"
              fullWidth
              label="Username"
              size="large"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="password"
              type="password"
              fullWidth
              label="Password"
              size="large"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{ textAlign: "center", color: "red" }}
          >
            <p>{showErrorMessage}</p>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
          <LoginIcon />
        </Button>
      </Box>
    </Container>
  );
}
