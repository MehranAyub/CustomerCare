import * as React from "react";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

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
const steps = ["Recieved", "Accepted", "Deliver"];

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productList, setproductList] = useState([]);
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios
      .get("https://localhost:7268/api/Order/" + id + "/detail")
      .then((res) => {
        console.log(res);
        setOrder(res.data);

        setproductList(res.data.orderDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <container>
      <ArrowBackIcon
        sx={{ mt: 10, ml: 5, cursor: "pointer" }}
        fontSize="large"
        onClick={() => {
          navigate("/orderList");
        }}
      />

      <Card
        sx={{
          maxWidth: 650,
          ml: "25%",
          mb: 10,
          borderRadius: 5,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={order.customer}
          subheader="Order Detail"
        />
        <Divider />
        <CardMedia>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid textAlign="center" item>
              <b>
                <p style={{ fontSize: "22px" }}>${order.totalBill}</p>
              </b>
              <p style={{ fontSize: "12px" }}>Total Bill</p>
            </Grid>
            <Divider flexItem orientation="vertical" />
            <Grid textAlign="center" item>
              <b>
                <p style={{ fontSize: "22px" }}>{order.noOfItems}</p>
              </b>
              <p style={{ fontSize: "12px" }}>Items</p>
            </Grid>
            <Divider flexItem orientation="vertical" />
            <Grid textAlign="center" item>
              <b>
                <p style={{ fontSize: "22px" }}>{order.time}</p>
              </b>
              <p style={{ fontSize: "12px" }}>Order Time</p>
            </Grid>
            <Divider flexItem orientation="vertical" />
            <Grid textAlign="center" item>
              <b>
                <p style={{ fontSize: "22px" }}>COD</p>
              </b>
              <p style={{ fontSize: "12px" }}>Payment Mehod</p>
            </Grid>
          </Grid>
        </CardMedia>
        <Divider />
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={
                order.status === 0
                  ? 1
                  : order.status === -1
                  ? 2
                  : order.status === 1
                  ? 2
                  : 3
              }
              alternativeLabel
            >
              {steps.map((label, index) => (
                <Step
                  icon={<RemoveShoppingCartIcon />}
                  className={
                    order.status === -1 && index == 1
                      ? "dangerStep"
                      : (order.status === -1 && index == 0) ||
                        (order.status === 2 &&
                          (index == 0 || index == 1 || index == 2)) ||
                        (order.status === 1 && (index == 0 || index == 1)) ||
                        (order.status === 0 && index == 0)
                      ? "activeStep"
                      : "disableStep"
                  }
                  key={label}
                >
                  <StepLabel
                    error={order.status === -1 && index == 1 ? true : false}
                  >
                    <b>
                      {order.status === -1 && index == 1 ? "Rejected" : label}
                    </b>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell align="left">Product Name</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Quantity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((item) => (
              <StyledTableRow key={item.productName}>
                <StyledTableCell component="th" scope="row">
                  <div>
                    <img
                      src={"https://localhost:7268/Assets/" + item.image}
                      style={{ height: "70px" }}
                    ></img>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.productName}
                </StyledTableCell>
                <StyledTableCell align="left">${item.price}</StyledTableCell>
                <StyledTableCell align="left">{item.quantity}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </container>
  );
}
