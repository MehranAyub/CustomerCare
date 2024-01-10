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
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
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

function OrderList() {
  const [orderList, setorderList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    GetOrdersList();
  }, []);
  const GetOrdersList = () => {
    axios
      .get("https://localhost:7268/api/Order/GetAllOrders")
      .then((res) => {
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
    <Container maxWidth="lg" sx={{ mt: 12, height: "80vh" }}>
      <Card>
        <Typography sx={{ mt: 1, ml: 2 }} variant="h5">
          Orders
        </Typography>
        <CardContent></CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell> Order ID</StyledTableCell>
              <StyledTableCell align="left">Customer</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Bill</StyledTableCell>
              <StyledTableCell align="left">Delivery Address</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
              <StyledTableCell align="left">Order Detail</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orderList.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="left">
                  {"ON#" + item.id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.customer}
                </StyledTableCell>
                <StyledTableCell align="left">{item.date}</StyledTableCell>
                <StyledTableCell align="left">{item.totalBill}</StyledTableCell>
                <StyledTableCell align="left">{item.address}</StyledTableCell>
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
                <StyledTableCell align="left">
                  {item.status === 0 ? (
                    <>
                      <DeleteForeverIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          Action(item.id, -1);
                        }}
                      />
                      |&nbsp;
                      <VerifiedIcon
                        color="success"
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          Action(item.id, 1);
                        }}
                      />
                    </>
                  ) : item.status === 1 ? (
                    <>
                      &nbsp; &nbsp;
                      <LocalShippingIcon
                        sx={{ cursor: "pointer" }}
                        color="success"
                        fontSize="large"
                        onClick={() => {
                          Action(item.id, 2);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      &nbsp; &nbsp;
                      <DoNotDisturbIcon color="disabled" />
                    </>
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <LaunchIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/orderDetail/" + item.id);
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default OrderList;
