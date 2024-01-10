import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Typography from "@mui/material/Typography";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  CardActionArea,
  CardActions,
  Container,
  Grid,
  Button,
  Box,
} from "@mui/material";
import { UserContext } from "./UserContext";

export default function Products() {
  const { value, setValue } = useContext(UserContext);
  const navigate = useNavigate();
  var user = null;
  user = JSON.parse(localStorage.getItem("user"));

  const navToPage = (url) => {
    console.log(user);
    navigate(url);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7268/api/Product")
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("values", value);
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <h5>
        Hi{" "}
        {user !== null
          ? user.fName
          : "Dear Customer, please login to continue shopping."}{" "}
        <hr />
      </h5>

      <Grid container spacing={4} alignItems="center">
        <Grid
          item
          xs={6}
          md={12}
          style={{ textAlign: "right", marginRight: 20 }}
        >
          <Badge badgeContent={value.length} color="secondary">
            <ShoppingCartCheckoutIcon
              sx={{ borderRadius: 50, fontSize: "30px", cursor: "pointer" }}
              color="primary"
              onClick={() => navToPage(user !== null ? "/checkout" : "/login")}
            />
          </Badge>
        </Grid>
        {products.map((product) => (
          <Grid item xs={12} md={3} key={product.id} justifyContent="center">
            <Card
              sx={{
                maxWidth: 245,
                borderRadius: "10px",
                height: 350,
              }}
            >
              <CardActionArea>
                <CardMedia>
                  {product.unitsInStock === 0 ? (
                    <span className="sale">Sold out</span>
                  ) : (
                    ""
                  )}

                  <img
                    className="imgstyle"
                    src={"https://localhost:7268/Assets/" + product.image}
                    alt=""
                  />
                </CardMedia>
                <CardContent sx={{ height: 150 }}>
                  <Typography
                    sx={{ fontFamily: "Georgia" }}
                    gutterBottom
                    variant="h6"
                    component="div"
                  >
                    {product.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.productDescription}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid item>
                      <IconButton
                        disabled={
                          value.some(
                            (item) => item.product.id === product.id
                          ) || product.unitsInStock === 0
                        }
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={() => {
                          setValue([...value, { product }]);
                        }}
                      >
                        {product.unitsInStock > 0 ? (
                          <AddShoppingCartIcon />
                        ) : (
                          <RemoveShoppingCartIcon />
                        )}
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Typography
                        align="justify"
                        gutterBottom
                        variant="p"
                        component="span"
                      >
                        <span className="price"> $ {product.unitPrice}</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
