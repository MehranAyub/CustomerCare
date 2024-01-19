import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";

import {
  Chip,
  Container,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Customers() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [customerList, setCustomerList] = useState([]);
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [foundUsers, setFoundUsers] = useState();
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confpassword: "",
    role: 1,
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
        role: formData.role,
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
            handleGetUsers();
            handleClose();
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
  const handleClose = () => {
    setDeleteConfirm(false);
    setOpenAdd(false);
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = customerList.filter((user) => {
        return (
          user.firstName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.lastName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.email.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(customerList);
    }

    setName(keyword);
  };

  useEffect(() => {
    if (user.role === 0) {
      handleGetUsers();
    } else {
      navigate("/Login");
    }
  }, []);
  const handleGetUsers = () => {
    axios
      .get("https://localhost:7268/api/User")
      .then((res) => {
        setCustomerList(res.data.entityList);
        setFoundUsers(res.data.entityList);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeleteUser = (Id) => {
    setDeleteConfirm(false);
    axios
      .delete("https://localhost:7268/api/User/" + Id)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("success");
          setCustomerList(customerList.filter((user) => user.id !== Id));
          setFoundUsers(customerList.filter((user) => user.id !== Id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 12, height: "80vh" }}>
      <Card>
        <Box
          margin={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Users</Typography>
          <Button
            size="medium"
            variant="contained"
            onClick={() => setOpenAdd(true)}
            startIcon={<AddIcon />}
          >
            Add User
          </Button>
        </Box>
        <CardContent>
          <Box sx={{ maxWidth: 400 }}>
            <TextField
              value={name}
              onChange={filter}
              fullWidth
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              label="Search"
            />
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Address</StyledTableCell>
              <StyledTableCell align="left">Phone</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {foundUsers && foundUsers.length > 0 ? (
              foundUsers.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.firstName + " " + item.lastName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.email}</StyledTableCell>
                  <StyledTableCell align="left">{item.address}</StyledTableCell>
                  <StyledTableCell align="left">{item.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.role === 1 ? (
                      <Chip color="primary" label="Customer" />
                    ) : (
                      <Chip color="success" label="Agent" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        // DeleteUser(item.id);
                        setSelectedUser(item.id);
                        setDeleteConfirm(true);
                      }}
                    />
                    {/* |&nbsp;
                      <VerifiedIcon
                        color="success"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          Action(item.id, 1);
                        }}
                      /> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <h5>No results found!</h5>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteConfirm} onClose={handleClose} fullWidth>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm to Delete
        </DialogTitle>
        <DialogContent>Are you sure to delete this User?</DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            autoFocus
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              if (selectedUser !== "") DeleteUser(selectedUser);
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Add User</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} mt={1}>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  fullWidth
                  label="Last Name"
                  size="small"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select">Role</InputLabel>
                  <Select
                    labelId="select"
                    id="select"
                    required
                    value={formData.role}
                    label="Role"
                    name="role"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>Customer</MenuItem>
                    <MenuItem value={2}>Agent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
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
                  helperText={
                    showErrorMessage ? "Passwords did not match" : " "
                  }
                />
              </Grid>
            </Grid>

            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              item
              xs={12}
            >
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Typography textAlign="center" color="error">
                {errorMessage}
              </Typography>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size="1rem"></CircularProgress>
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default Customers;
