import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container, Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Box } from "@mui/material";
import Switch from "@mui/material/Switch";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffffff",
    color: "#a0a9ba",
    fontSize: "16px",
    fontWeight: "600",
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

const UserArray = [
  {
    Id: 1,
    Name: "Mehran",
    UserName: "mehranayub",
    Status: false,
    createdDate: "12/05/2021",
  },
  {
    Id: 2,
    Name: "Faisal",
    UserName: "faisalayub",
    Status: true,
    createdDate: "13/05/2021",
  },
  {
    Id: 3,
    Name: "Haider",
    UserName: "haiderayub",
    Status: true,
    createdDate: "14/05/2021",
  },
  {
    Id: 4,
    Name: "Umar",
    UserName: "umardeol",
    Status: false,
    createdDate: "15/05/2021",
  },
];

function UserManagement() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);
  const [AddOrEdit, setAddOrEdit] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [users, setUsers] = useState(UserArray);
  const [formData, setFormData] = useState({
    Id: 0,
    Name: "",
    UserName: "",
    Password: "",
  });

  const handleClickOpen = (e) => {
    if (e === true) {
      setAddOrEdit(true);
    } else {
      setAddOrEdit(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({});
    setOpen(false);
  };

  useEffect(() => {
    // axios
    //   .get("https://localhost:7268/api/Users")
    //   .then((res) => {
    //     setUsers(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [update]);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#F0AA89",
      zIndex: 20,
    },
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleActive = (id) => {
    axios
      .put("https://localhost:7268/api/User/ActiveUser/", id) // API to active or deactive User
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
    const newState = users.map((obj) =>
      obj.Id === id ? { ...obj, Status: !obj.Status } : obj
    );
    setUsers(newState);
  };
  const AddUserApi = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:7268/api/User/AddUser", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);

        handleClose();
        if (response.statusCode === 200) {
          setUsers([...users, response.data]);
        }

        setFormData({});
      })
      .catch(function (error) {
        console.log(error);
        setShowErrorMessage("Server is not responding");
      });
  };

  const EditUserApi = (event) => {
    event.preventDefault();
    axios
      .post("https://localhost:7268/api/User/EditUser", formData)
      .then(function (response) {
        console.log(response);

        handleClose();
        if (response.statusCode === 200) {
          //This is custom response data for Edit response. On this basis , It run useEffect Hook
          setUpdate((current) => !current);
        }
        setFormData({});
      })
      .catch(function (error) {
        console.log(error);
        setShowErrorMessage("Server is not responding");
      });
  };

  const Delete = (Id) => {
    axios
      .put("https://localhost:7268/api/User/DeleteUser/", Id)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={6} md={6} style={{ textAlign: "left" }}>
          <h2 style={{ Color: "#4d5159", fontSize: "24px", fontWeight: "600" }}>
            User Management
          </h2>
        </Grid>
        <Grid item xs={6} md={6} style={{ textAlign: "right" }}>
          <AddCircleIcon
            sx={{ borderRadius: 50, fontSize: "40px", cursor: "pointer" }}
            color="primary"
            onClick={() => {
              handleClickOpen(false);
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Username</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <StyledTableRow key={user.Id}>
                    <StyledTableCell component="th" scope="row">
                      {user.Name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user.UserName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {user.createdDate}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Switch
                        checked={user.Status}
                        onChange={() => {
                          handleActive(user.Id);
                        }}
                        inputProps={{ "aria-label": "controlled" }}
                      />{" "}
                      {user.Status}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <>
                        <EditIcon
                          color="success"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setFormData({
                              Id: user.Id,
                              Name: user.Name,
                              UserName: user.UserName,
                            });
                            handleClickOpen(true);
                          }}
                        />
                        |&nbsp;
                        <DeleteForeverIcon
                          sx={{ color: "red", cursor: "pointer" }}
                          onClick={() => {
                            Delete(user.id);
                          }}
                        />
                      </>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf={"center"}>
          {AddOrEdit === true ? "Edit " : "Add New "} User
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={AddOrEdit === true ? EditUserApi : AddUserApi}
          >
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={12} md={12} style={{ textAlign: "center" }}></Grid>
              <Grid item mb={2} xs={12} md={12}>
                <TextField
                  name="Name"
                  fullWidth
                  label="Full Name"
                  size="large"
                  required
                  value={formData.Name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="UserName"
                  type="text"
                  fullWidth
                  label="Username"
                  size="large"
                  required
                  value={formData.UserName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                sx={formData.Id > 0 ? { display: "none" } : {}}
                item
                xs={12}
                md={12}
              >
                <TextField
                  name="Password"
                  type="text"
                  fullWidth
                  label="Password"
                  size="large"
                  required
                  value={formData.Password}
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

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
export default UserManagement;
