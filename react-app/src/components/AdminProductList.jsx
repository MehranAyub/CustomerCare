import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DialogTitle from "@mui/material/DialogTitle";
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
import HP1 from "../assets/Headphones.jpg";
import HP2 from "../assets/Headphones2.jpg";
import HP3 from "../assets/Headphones3.jpg";
import HP4 from "../assets/Headphones4.jpg";
import HP5 from "../assets/Headphones5.jpg";
import HP6 from "../assets/Headphones6.jpg";
import HP7 from "../assets/Headphones7.jpg";
import HP8 from "../assets/Headphones8.jpg";
import { UserContext } from "./UserContext";

function AdminProductList() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const { value, setValue } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState(false);
  const [AddOrEdit, setAddOrEdit] = useState(false);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
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

  var user = null;
  user = JSON.parse(localStorage.getItem("user"));

  const urls = [HP1, HP2, HP3, HP4, HP5, HP6, HP7, HP8];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://localhost:7268/api/Product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);
  console.log("values", value);
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

  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    Id: 0,
    ProductName: "",
    UnitPrice: null,
    UnitsInStock: null,
    ProductDescription: "",
    Image: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formFile = new FormData();

    formFile.append("file", file);
    formFile.append("fileName", fileName);
    formFile.append("form", JSON.stringify(formData));
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("https://localhost:7268/api/Product", formFile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);

        handleClose();
        if (response.statusCode === 250) {
          setUpdate((current) => !current);
        } else {
          setProducts([...products, response.data]);
        }

        setFormData({});
      })
      .catch(function (error) {
        console.log(error);
        setShowErrorMessage("Server is not responding");
      });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid
          item
          xs={6}
          md={12}
          style={{ textAlign: "right", marginRight: 20 }}
        >
          <AddCircleIcon
            sx={{ borderRadius: 50, fontSize: "40px", cursor: "pointer" }}
            color="primary"
            onClick={() => {
              handleClickOpen(false);
            }}
          />
          {/* </Button> */}
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
                    sx={{ fontFamily: "Apple Color Emoji" }}
                    gutterBottom
                    variant="h5"
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
                        color="primary"
                        aria-label="add to shopping cart"
                      >
                        <EditIcon
                          onClick={() => {
                            setFormData({
                              Id: product.id,
                              ProductName: product.productName,
                              UnitPrice: product.unitPrice,
                              UnitsInStock: product.unitsInStock,
                              ProductDescription: product.productDescription,
                              Image: product.image,
                            });
                            handleClickOpen(true);
                          }}
                        />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <span className="price"> $ {product.unitPrice}</span>
                      {/* <Typography
                        align="justify"
                        gutterBottom
                        variant="p"
                        component="span"
                      >
                        R.S {product.unitPrice}
                      </Typography> */}
                    </Grid>
                  </Grid>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle alignSelf={"center"}>
          {AddOrEdit === true ? "Edit " : "Add New "} Product
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={12} md={12} style={{ textAlign: "center" }}></Grid>
              <Grid item mb={2} xs={12} md={12}>
                <TextField
                  name="ProductName"
                  fullWidth
                  label="Product Name"
                  size="large"
                  required
                  value={formData.ProductName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="UnitPrice"
                  type="number"
                  fullWidth
                  label="Unit Price"
                  size="large"
                  required
                  value={formData.UnitPrice}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="UnitsInStock"
                  type="number"
                  fullWidth
                  label="Units In Stock"
                  size="large"
                  required
                  value={formData.UnitsInStock}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="ProductDescription"
                  type="text"
                  inputProps={{ maxLength: 60 }}
                  fullWidth
                  label="Product Description"
                  size="large"
                  required
                  value={formData.ProductDescription}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="Image"
                  type="file"
                  fullWidth
                  size="large"
                  onChange={saveFile}
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
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
              <LoginIcon />
            </Button> */}

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
export default AdminProductList;
