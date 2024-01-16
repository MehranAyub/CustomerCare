import React from "react";
import { TextField, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confpassword: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (showErrorMessage === false) {
      setIsLoading(true);
      const customer = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 1,
      };

      axios.defaults.headers.post["Content-Type"] = "application/json";

      axios
        .post(
          "https://localhost:7268/api/User/CreateUser",
          JSON.stringify(customer),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);

          if (response && response.data.status === 200) {
            alert("You are Registered Successfully");
            navigate("/login");
          } else if (response.data.status == 403) {
            setErrorMessage("Email already Exists");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally((res) => {
          setIsLoading(false);
        });
    }
  };
  const handleCPassword = (e) => {
    if (formData.password === e.target.value) {
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
    console.log(e.target.value);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 12, height: "75vh" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
            <h3>SignUp</h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="firstName"
              fullWidth
              label="First Name"
              size="small"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="lastName"
              fullWidth
              label="Last Name"
              size="small"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="email"
              fullWidth
              label="Email"
              type="email"
              size="small"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="phone"
              fullWidth
              label="Phone"
              size="small"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="address"
              fullWidth
              label="Address"
              size="small"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="password"
              fullWidth
              label="Password"
              size="small"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="confpassword"
              fullWidth
              label="Confirm Password"
              size="small"
              type="password"
              required
              value={formData.confpassword}
              onChange={(e) => {
                handleChange(e);
                handleCPassword(e);
              }}
              error={showErrorMessage}
              helperText={showErrorMessage ? "Passwords did not match" : " "}
            />
          </Grid>
        </Grid>
        <Typography textAlign="center" color="error">
          {errorMessage}
        </Typography>
        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? (
            <CircularProgress size="1rem"></CircularProgress>
          ) : (
            "SignUp"
          )}
        </Button>
      </Box>
    </Container>
  );
}
