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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import LaunchIcon from "@mui/icons-material/Launch";
import Moment from "react-moment";

import { Card, CardContent, Typography } from "@mui/material";

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

function UserOrders() {
  var user = null;
  user = JSON.parse(localStorage.getItem("user"));
  const [orderList, setorderList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    GetOrdersList();
  }, []);
  const GetOrdersList = () => {
    axios
      .get("https://localhost:7268/api/Order/OrdersByUserId/" + user.id)
      .then((res) => {
        console.log(res);
        setorderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const Action = (Id, Status) => {
    axios
      .put("https://localhost:7268/api/Order/OrderActions", {
        Id: Id,
        Status: Status,
      })
      .then((res) => {
        console.log("success");
        setorderList([
          ...orderList.map((order) =>
            order.id === Id ? { ...order, status: Status } : order
          ),
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, height: "79vh" }}>
      <Card>
        <Typography sx={{ mt: 1, ml: 2 }} variant="h5">
          Your Orders
        </Typography>
        <CardContent></CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Order ID</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Bill</StyledTableCell>
              <StyledTableCell align="left">Delivery Address</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderList.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="left">
                  {"ON#" + item.id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Moment format="YYYY/MM/DD">{item.orderDate}</Moment>
                </StyledTableCell>
                <StyledTableCell align="left">{item.totalBill}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.shipAddress}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.status === 0 ? (
                    <span className="status">&nbsp; Pending</span>
                  ) : item.status === 1 ? (
                    <span
                      style={{ backgroundColor: "rgb(0, 204, 0)" }}
                      className="status"
                    >
                      Approved
                    </span>
                  ) : item.status === 2 ? (
                    <span
                      style={{ backgroundColor: "rgb(140, 53, 196)" }}
                      className="status"
                    >
                      Delivered
                    </span>
                  ) : item.status === -1 ? (
                    <span
                      style={{ backgroundColor: "red", color: "white" }}
                      className="status"
                    >
                      Cancelled
                    </span>
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserOrders;
