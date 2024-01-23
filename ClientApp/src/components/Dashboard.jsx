import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { TotalCustomers } from "./TotalCustomersTicket";
import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./BarChart";
import { TotalAgents } from "./TotalAgentsTicket";
import { TotalComplaints } from "./TotalComplaints";
import PageLoader from "./PageLoader";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [DashboardData, setDashboardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user != null && user.role === 0) {
      handleGetStats();
    } else {
      navigate("/Login");
    }
  }, []);

  const handleGetStats = () => {
    setIsLoading(true);
    axios
      .get("https://localhost:7268/api/User/GetDashboardStats")
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
        }
        setDashboardData(res.data.entity);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <PageLoader isLoading={isLoading}></PageLoader>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <TotalCustomers count={DashboardData.customers} />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalAgents count={DashboardData.agents} />
            </Grid>
            <Grid item md={4} xs={12}>
              <TotalComplaints count={DashboardData.complaints} />
            </Grid>
          </Grid>
          <Box mt={10} xs={12}>
            <BarChart object={DashboardData} />
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default Dashboard;
