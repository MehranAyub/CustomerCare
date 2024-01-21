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

function AdminComplaints() {
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
    if (user != null && user.role === 0) {
      handleGetComplaints();
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
                      <Chip color="info" label="In Progress" />
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
                      <Chip color="info" label="In Progress" />
                    ) : selectedComplaint.status === 2 ? (
                      <Chip color="success" label="Resolved" />
                    ) : selectedComplaint.status === 3 ? (
                      <Chip color="error" label="Cancelled" />
                    ) : (
                      ""
                    )}
                  </span>
                </Typography>
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
              <Grid>
                {selectedComplaint.images && selectedComplaint.images.length > 0
                  ? selectedComplaint.images.map((item, index) => {
                      <img
                        id={index}
                        width="100%"
                        height="100%"
                        src={"https://localhost:7268/Assets/" + item.imageData}
                        alt="Error"
                      />;
                    })
                  : "No Additional Info."}
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
              <Button autoFocus onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default AdminComplaints;
