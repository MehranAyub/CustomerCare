import React from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
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
    // prevents the submit button from refreshing the page
    if (showErrorMessage === false) {
      const customer = {
        fName: formData.fname,
        lName: formData.lname,
        address: formData.address,
        email: formData.email,
        phone: formData.phone,
        passwrord: formData.password,
      };

      axios.defaults.headers.post["Content-Type"] = "application/json";

      axios
        .post("https://localhost:7268/api/Customer", JSON.stringify(customer), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response);
          alert("User Registered Successfully");
          setFormData([]);
          navigate("/login");
        })
        .catch(function (error) {
          console.log(error);
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
              name="fname"
              fullWidth
              label="FirstName"
              size="small"
              required
              value={formData.fname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="lname"
              fullWidth
              label="LastName"
              size="small"
              value={formData.lname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="email"
              fullWidth
              label="Email"
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
    // <Grid container sx={{ mt: 12 }}>
    //   <Grid item xs={12} sm={4}></Grid>
    //   <Grid item xs={12} sm={5}>
    //     <h3 style={{ textAlign: "center" }}>Signup</h3>
    //     <Box
    //       onSubmit={handleSubmit}
    //       component="form"
    //       sx={{
    //         "& .MuiTextField-root": { m: 1, mb: 3, width: "35ch" },
    //       }}
    //       autoComplete="off"
    //     >
    //       <div>
    //         <TextField
    //           label="FirstName"
    //           name="fname"
    //           size="small"
    //           required
    //           value={formData.fname}
    //           onChange={(e) =>
    //             setFormData({ ...formData, fname: e.target.value })
    //           }
    //         />
    //         <TextField
    //           label="LastName"
    //           name="lname"
    //           size="small"
    //           value={formData.lname}
    //           onChange={(e) =>
    //             setFormData({ ...formData, lname: e.target.value })
    //           }
    //         />

    //         <TextField
    //           label="Email"
    //           style={{ width: "72ch" }}
    //           name="email"
    //           size="small"
    //           required
    //           type="email"
    //           value={formData.email}
    //           onChange={(e) =>
    //             setFormData({ ...formData, email: e.target.value })
    //           }
    //         />

    //         <TextField
    //           label="Phone"
    //           id="outlined-size-small"
    //           size="small"
    //           name="phone"
    //           value={formData.phone}
    //           onChange={(e) =>
    //             setFormData({ ...formData, phone: e.target.value })
    //           }
    //         />
    //         <TextField
    //           label="Address"
    //           id="outlined-size-small"
    //           size="small"
    //           name="address"
    //           required
    //           value={formData.address}
    //           onChange={(e) =>
    //             setFormData({ ...formData, address: e.target.value })
    //           }
    //         />
    //         <TextField
    //           label="Password"
    //           id="outlined-size-small"
    //           size="small"
    //           name="password"
    //           required
    //           value={formData.password}
    //           onChange={(e) =>
    //             setFormData({ ...formData, password: e.target.value })
    //           }
    //         />
    //         <TextField
    //           label="Confirm Password"
    //           size="small"
    //           name="confpassword"
    //           required
    //           value={formData.confpassword}
    //           onChange={(e) => {
    //             setFormData({ ...formData, confpassword: e.target.value });
    //             handleCPassword(e);
    //           }}
    //           error={showErrorMessage}
    //           helperText={showErrorMessage ? "Passwords did not match" : " "}
    //         />
    //       </div>

    //       <Button
    //         sx={{ width: "40%", ml: 24 }}
    //         type="submit"
    //         variant="contained"
    //       >
    //         Submit
    //       </Button>
    //     </Box>
    //   </Grid>

    //   <Grid item xs={12} sm={3}></Grid>
    // </Grid>
  );
}
