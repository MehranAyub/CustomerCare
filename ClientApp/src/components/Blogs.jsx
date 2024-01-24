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
  DialogActions,
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

function Blogs() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [blogList, setBlogList] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [selectedBlog, setSelectedBlog] = useState({});
  const [foundBlogs, setFoundBlogs] = useState();
  const [openAdd, setOpenAdd] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [openDetail, setOpenDetail] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    heading: "",
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
    data.append("heading", formData.heading);
    data.append("description", formData.description);
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios
      .post("https://localhost:7268/api/Blog/CreateBlog", data)
      .then(function (response) {
        console.log(response);

        if (response && response.data.status === 200) {
          setFormData({ description: "", heading: "" });
          setFiles([]);
          handleGetBlogs();
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

  const DeleteBlog = () => {
    setDeleteConfirm(false);
    axios
      .delete("https://localhost:7268/api/Blog/" + selectedBlog.id)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("success");
          setBlogList(blogList.filter((bg) => bg.id !== selectedBlog.id));
          setFoundBlogs(blogList.filter((bg) => bg.id !== selectedBlog.id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpenAdd(false);
    setDeleteConfirm(false);
    setOpenDetail(false);
  };

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = blogList.filter((comp) => {
        return comp.heading.toLowerCase().startsWith(keyword.toLowerCase());
      });
      setFoundBlogs(results);
    } else {
      setFoundBlogs(blogList);
    }

    setName(keyword);
  };

  useEffect(() => {
    if (user != null && user.role === 0) {
      handleGetBlogs();
    } else {
      navigate("/Login");
    }
  }, []);

  const handleGetBlogs = () => {
    axios
      .get("https://localhost:7268/api/Blog")
      .then((res) => {
        setBlogList(res.data.entityList);
        setFoundBlogs(res.data.entityList);
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
          <Typography variant="h6">Blogs</Typography>
          <Button
            size="medium"
            variant="contained"
            onClick={() => setOpenAdd(true)}
            startIcon={<AddIcon />}
          >
            Post Blog
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
              <StyledTableCell> Heading</StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {foundBlogs && foundBlogs.length > 0 ? (
              foundBlogs.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    {item.heading}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <VisibilityIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedBlog(item);
                        setOpenDetail(true);
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedBlog(item);
                        setDeleteConfirm(true);
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
              <StyledTableRow aria-colspan={4}>
                <h6 style={{ textAlign: "center" }}>No results found!</h6>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openAdd} onClose={handleClose} fullWidth>
        <DialogTitle textAlign="center">Post New Blog</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} mt={1}>
            <Grid container spacing={3} justifyContent="flex-start">
              <Grid item xs={12}>
                <TextField
                  name="heading"
                  fullWidth
                  label="Heading"
                  size="small"
                  required
                  value={formData.heading}
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
        <DialogTitle textAlign="center">Blog Detail</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <Grid container spacing={3} justifyContent="flex-start">
              <Grid item xs={12}>
                <Typography>
                  <b>Heading</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{selectedBlog.heading}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  <b> Description</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{selectedBlog.description}</Typography>
              </Grid>
              <Grid item xs={12} width="100%">
                {selectedBlog.images && selectedBlog.images.length > 0
                  ? selectedBlog.images.map((img, index) => (
                      <img
                        key={index}
                        style={{ width: "200px" }}
                        src={"https://localhost:7268/Assets/" + img.imageData}
                      />
                    ))
                  : "No Images."}
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

      <Dialog open={deleteConfirm} onClose={handleClose} fullWidth>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Confirm to Delete
        </DialogTitle>
        <DialogContent>Are you sure to delete this blog?</DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            autoFocus
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              if (selectedBlog !== "") DeleteBlog();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Blogs;
