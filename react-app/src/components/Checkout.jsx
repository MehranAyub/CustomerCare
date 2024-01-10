import * as React from "react";
import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Container, Grid } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { UserContext } from "./UserContext";
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

export default function Checkout() {
  const navigate = useNavigate();
  const { value, setValue } = useContext(UserContext);
  var user = null;
  user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState({
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const products = [];

  var results = 0;
  value.forEach((element) => {
    results = results + element.product.unitPrice;
    products.push(element.product);
  });

  const placeOrder = (e) => {
    e.preventDefault();
    const Order = {
      Email: userData.email,
      Phone: userData.phone,
      Address: userData.address,
      TotalBill: results,
      CustomerId: user.id,
      OrderDetail: products,
    };
    console.log(Order);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://localhost:7268/api/Order/createOrder", Order, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.status !== 200) {
        } else {
          alert("Your order has been placed Successfully");
          setValue([]);
          navigate("/products");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 12, height: "77vh" }}>
      <Grid container spacing={4} justifyContent="flex-start">
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell align="right">Price</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {value.map((item) => (
                  <StyledTableRow key={item.product.id}>
                    <StyledTableCell component="th" scope="row">
                      {item.product.productName}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.product.unitPrice}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setValue((value) =>
                            value.filter(
                              (prdct) => prdct.product.id !== item.product.id
                            )
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <TableRow>
                  <StyledTableCell style={{ color: "red" }}>
                    <h6>
                      <b> Total Bill</b>
                    </h6>
                  </StyledTableCell>
                  <StyledTableCell style={{ color: "red" }} align="right">
                    <h6>
                      <b>$ {results}</b>
                    </h6>
                  </StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid spacing={2} item xs={12} md={6} style={{ textAlign: "center" }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              <h4>Shipping Address</h4>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                disabled
                name="email"
                fullWidth
                label="Email"
                size="small"
                required
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="phone"
                fullWidth
                label="Phone"
                size="small"
                required
                value={userData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name="address"
                fullWidth
                label="Address"
                size="small"
                required
                value={userData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Button
                disabled={results === 0}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
