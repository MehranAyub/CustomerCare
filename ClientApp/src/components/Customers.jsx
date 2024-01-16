import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container, Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

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
  const [customerList, setCustomerList] = useState([]);
  const [name, setName] = useState("");
  const [foundUsers, setFoundUsers] = useState();

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = customerList.filter((user) => {
        return (
          user.fName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.lName.toLowerCase().startsWith(keyword.toLowerCase()) ||
          user.email.toLowerCase().startsWith(keyword.toLowerCase())
        );
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers(results);
    } else {
      setFoundUsers(customerList);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  useEffect(() => {
    axios
      .get("https://localhost:7268/api/Customer")
      .then((res) => {
        setCustomerList(res.data);
        setFoundUsers(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container maxWidth="lg" sx={{ mt: 12, height: "80vh" }}>
      <Card>
        <Typography sx={{ m: 1 }} variant="h5">
          Customers
        </Typography>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              value={name}
              onChange={filter}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search customer"
              variant="outlined"
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
            </TableRow>
          </TableHead>

          <TableBody>
            {foundUsers && foundUsers.length > 0 ? (
              foundUsers.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.fName + " " + item.lName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.email}</StyledTableCell>
                  <StyledTableCell align="left">{item.address}</StyledTableCell>
                  <StyledTableCell align="left">{item.phone}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <h5>No results found!</h5>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Customers;
