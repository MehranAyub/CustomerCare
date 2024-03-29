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
  TextareaAutosize,
  IconButton,
  Select,
  CircularProgress,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
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

function AdminComplaints() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [complaintList, setComplaintList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [foundComplaints, setFoundComplaints] = useState();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAgent, setSelectedAgent] = useState();

  const handleClose = () => {
    setOpenAdd(false);
    setOpenDetail(false);
  };
  const handleChange = (event) => {
    setSelectedAgent(event.target.value);
  };
  const handleAssignAgent = (event) => {
    if (selectedComplaint !== null && selectedAgent !== null) {
      const assignAgentRequest = {
        agentId: selectedAgent,
        complaintId: selectedComplaint.id,
      };
      setIsLoading(true);
      axios.defaults.headers.post["Content-Type"] = "application/json";
      axios
        .put(
          "https://localhost:7268/api/Complaint/AssignAgent",
          JSON.stringify(assignAgentRequest),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (response) {
          console.log(response);

          if (response && response.data.status === 200) {
            console.log("Agent Assigned Successfully");
            setOpenDetail(false);
            handleGetComplaints();
          } else if (response.data.status == 403) {
            setErrorMessage("Got Error while Assigning Agent*");
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
    if (user != null && user.role === 0) {
      handleGetComplaints();
      handleGetAllAgents();
    } else {
      navigate("/Login");
    }
  }, []);

  useEffect(() => {
    console.log("Selected Complaint", selectedComplaint);
  }, [selectedComplaint]);

  const handleGetComplaints = () => {
    axios.defaults.headers.post["Content-Type"] = "text/plain";
    axios
      .get("https://localhost:7268/api/Complaint")
      .then((res) => {
        setComplaintList(res.data.entityList);
        setFoundComplaints(res.data.entityList);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetAllAgents = () => {
    axios.defaults.headers.post["Content-Type"] = "text/plain";
    axios
      .get("https://localhost:7268/api/User/GetAllAgents")
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Agents List", res.data.entityList);
          setAgentList(res.data.entityList);
        }
        console.log("Agents res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12, height: "80vh" }}>
      <Card>
        <Box margin={2}>
          <Typography variant="h6">Customer Complaints</Typography>
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
                        setSelectedAgent(item.agentId);
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
              <Grid mt={1} item xs={3}>
                <Typography>
                  <b> Agent :</b>
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Select
                  label="Agent"
                  name="agent"
                  size="small"
                  disabled={
                    selectedComplaint.status === 2 ||
                    selectedComplaint.status === 3
                  }
                  value={selectedAgent}
                  fullWidth
                  onChange={handleChange}
                >
                  {agentList && agentList.length > 0
                    ? agentList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.firstName + " " + item.lastName}
                        </MenuItem>
                      ))
                    : ""}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b> Agent Remarks :</b> {selectedComplaint.agentRemarks}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b>Additional Data</b>
                </Typography>
              </Grid>
              <Grid item xs={12} width="100%">
                {selectedComplaint.images && selectedComplaint.images.length > 0
                  ? selectedComplaint.images.map((img, index) => (
                      <img
                        key={index}
                        style={{ width: "200px" }}
                        src={"https://localhost:7268/Assets/" + img.imageData}
                      />
                    ))
                  : "No Additional Info."}
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
              <Button onClick={handleClose}>Close</Button>
              <Button
                disabled={
                  selectedComplaint.status === 2 ||
                  selectedComplaint.status === 3 ||
                  isLoading
                }
                onClick={handleAssignAgent}
              >
                {isLoading ? (
                  <CircularProgress size="1rem"></CircularProgress>
                ) : (
                  "Save"
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AdminComplaints;
