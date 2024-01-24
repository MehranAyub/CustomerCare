import React from "react";
import { Container, Typography, Box, Paper, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    handleGetBlogs();
  }, []);
  const handleGetBlogs = () => {
    axios
      .get("https://localhost:7268/api/Blog")
      .then((res) => {
        setBlogList(res.data.entityList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box mt={15}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "60px",
            width: "100%",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <b>Handling customer complaints is easier now.</b>
        </Typography>
      </Box>
      <Box my={4}>
        {/* <Typography variant="h4" component="h1" gutterBottom>
          Complaint Management System
        </Typography> */}
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6">
            Welcome to our Complaint Management System
          </Typography>
          <Typography paragraph>
            This system allows customers to create and track their complaints.
            Administrators can assign complaints to agents, who then investigate
            and resolve them efficiently.
          </Typography>
        </Paper>
        <Grid container spacing={3} style={{ marginTop: "20px" }}>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h6">For Customers</Typography>
              <Typography>
                Create and track your complaints easily. Stay updated with the
                status of your complaint and get solutions in no time.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h6">For Admins</Typography>
              <Typography>
                Assign complaints to the right agents. Monitor resolution
                progress and maintain efficiency.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper style={{ padding: "20px" }}>
              <Typography variant="h6">For Agents</Typography>
              <Typography>
                View assigned complaints, investigate issues, and resolve them
                promptly to ensure customer satisfaction.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginLeft: "20%", marginTop: "15%" }}>
        <Typography variant="h5">
          <b>Team Collaboration</b>
        </Typography>
        <Typography mt={2}>
          Resolving customers' complaints go beyond just a single team. It can
          often require a cross-functional team or several departments to work
          together. This creates a risk of communication gaps and a lot of
          back-and-forth that complicates the problem and takes time to fix.
          Zoho Desk keep things on track by enabling your agents to tag their
          colleagues and other teams within tickets and leave private comments.
          This ensures that no context is lost when information is passed on,
          creating a smoother path to resolution.
        </Typography>
        <Box mt={5}>
          <img
            src="https://localhost:7268/Assets/coming soon.jpg"
            style={{ maxWidth: "70%" }}
          ></img>
        </Box>

        {blogList && blogList.length > 0
          ? blogList.map((blog) => (
              <Box mt={5}>
                <Typography variant="h5">
                  <b>{blog.heading}</b>
                </Typography>
                <Typography mt={2}>{blog.description}</Typography>
                <Box mt={5}>
                  {blog.images && blog.images.length > 0
                    ? blog.images.map((img, index) => (
                        <img
                          key={index}
                          style={{ maxWidth: "70%", marginTop: "30px" }}
                          src={"https://localhost:7268/Assets/" + img.imageData}
                        />
                      ))
                    : ""}
                </Box>
              </Box>
            ))
          : ""}
      </Box>
    </Container>
  );
}

export default HomePage;
