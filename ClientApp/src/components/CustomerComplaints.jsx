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
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const menuItems = [
  "Wrong Order",
  "Wrong item",
  "Missing Item",
  "Inappropriate behavior",
  "Delivery Instructions were not followed",
  "Vendor not cooperative",
  "2nd contact",
  "Follow up",
  "Request for redelivery",
  "Request for refund",
  "Refund not received within TAT",
  "Issues with Vendor",
  "Address",
  "Other Issues",
];

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

function CustomerComplaints() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [complaintList, setComplaintList] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [foundComplaints, setFoundComplaints] = useState();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    subject: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }
    data.append("type", formData.type);
    data.append("subject", formData.subject);
    data.append("description", formData.description);
    data.append("customerId", user.id);
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("https://localhost:7268/api/Complaint/CreateComplaint", data)
      .then(function (response) {
        console.log(response);

        if (response && response.data.status === 200) {
          setFormData({ description: "", subject: "", type: "" });
          setFiles([]);
          handleGetComplaints();
          handleClose();
        } else if (response.data.status == 403) {
          setErrorMessage("Sorry , Found Error");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    setOpenAdd(false);
    setOpenDetail(false);
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = complaintList.filter((comp) => {
        return (
          comp.type.toLowerCase().startsWith(keyword.toLowerCase()) ||
          comp.subject.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setFoundComplaints(results);
    } else {
      setFoundComplaints(complaintList);
    }

    setName(keyword);
  };

  useEffect(() => {
    if (user != null && user.role === 1) {
      handleGetComplaints();
    } else {
      navigate("/Login");
    }
  }, []);

  const handleGetComplaints = () => {
    console.log("userId", user.id);
    axios.defaults.headers.post["Content-Type"] = "text/plain";
    axios
      .post(
        "https://localhost:7268/api/Complaint/GetComplaintsByUserId?userId=" +
          user.id
      )
      .then((res) => {
        setComplaintList(res.data.entityList);
        setFoundComplaints(res.data.entityList);
        console.log(res);
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
          <Typography variant="h6">Complaints</Typography>
          <Button
            size="medium"
            variant="contained"
            onClick={() => setOpenAdd(true)}
            startIcon={<AddIcon />}
          >
            Report
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
              <StyledTableCell> S.No</StyledTableCell>
              <StyledTableCell> Type</StyledTableCell>
              <StyledTableCell align="left">Subject</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {foundComplaints && foundComplaints.length > 0 ? (
              foundComplaints.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {item.type}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.subject}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status === 0 ? (
                      <Chip color="primary" label="Pending" />
                    ) : item.status === 1 ? (
                      <Chip color="secondary" label="In Progress" />
                    ) : item.status === 2 ? (
                      <Chip color="success" label="Resolved" />
                    ) : item.status === 3 ? (
                      <Chip color="error" label="Cancelled" />
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <VisibilityIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedComplaint(item);
                        setOpenDetail(true);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <h5>No results found!</h5>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openAdd} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Report a Problem</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} mt={1}>
            <Grid container spacing={3} justifyContent="flex-start">
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select">Type</InputLabel>
                  <Select
                    labelId="select"
                    id="select"
                    required
                    value={formData.type}
                    label="Type"
                    name="type"
                    onChange={handleChange}
                  >
                    {menuItems.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="subject"
                  fullWidth
                  label="Subject"
                  size="small"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Description"
                  id={"description"}
                  name={"description"}
                  minRows={5}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  value={formData.description}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <label htmlFor="images">
                  <TextField
                    type="file"
                    sx={{ display: "none" }}
                    id="images"
                    name="images"
                    label="Images"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(e) => {
                      if (e && e.target.files.length > 0) {
                        var file = e.target.files[0];
                        const newFiles = [...files, file];
                        setFiles(newFiles);
                      }
                    }}
                  />

                  <Button variant="contained" size="small" component="span">
                    Upload Images
                  </Button>
                </label>

                <br />
                {files && files?.length > 0 ? (
                  files?.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <img
                        style={{
                          width: "150px",
                          height: "100px",
                          marginTop: "10px",
                          borderRadius: 5,
                          marginLeft: 3,
                        }}
                        alt="preview image"
                        src={URL.createObjectURL(file)}
                      />

                      <IconButton
                        size="small"
                        style={{
                          position: "absolute",
                          top: 6,
                          right: -3,
                          backgroundColor: "white",
                        }}
                        onClick={() => {
                          setFiles((prevFiles) =>
                            prevFiles.filter(
                              (_, fileIndex) => fileIndex !== index
                            )
                          );
                        }}
                      >
                        <CloseIcon
                          sx={{
                            color: "rgb(56, 55, 110)",
                            fontSize: "13px",
                          }}
                        />
                      </IconButton>
                    </div>
                  ))
                ) : (
                  <Typography>No files selected </Typography>
                )}
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              mt={3}
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
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openDetail} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Complaint Detail</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <Grid container spacing={3} justifyContent="flex-start">
              <Grid item xs={12}>
                <Typography>
                  <b>Type :</b> {selectedComplaint.type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Subject :</b> {selectedComplaint.subject}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b> Description :</b> {selectedComplaint.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b> Status :</b>
                  <span style={{ marginLeft: "10px" }}>
                    {selectedComplaint.status === 0 ? (
                      <Chip color="primary" label="Pending" />
                    ) : selectedComplaint.status === 1 ? (
                      <Chip color="secondary" label="In Progress" />
                    ) : selectedComplaint.status === 2 ? (
                      <Chip color="success" label="Resolved" />
                    ) : selectedComplaint.status === 3 ? (
                      <Chip color="error" label="Cancelled" />
                    ) : (
                      ""
                    )}
                  </span>
                  <span style={{ marginLeft: "20px", color: "red" }}>
                    {selectedComplaint.status === 0
                      ? "Agent Not Assigned*"
                      : ""}{" "}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b> Agent Remarks :</b> {selectedComplaint.agentRemarks}
                </Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              mt={3}
            >
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default CustomerComplaints;
