import React from "react";
import { Container, Grid, Box } from "@mui/material";
import { TotalCustomers } from "./TotalCustomersTicket";
import { TotalOrders } from "./TotalOrdersTicket";
import { DeliveredOrders } from "./DeliveredOrdersTicket";
import { TotalProducts } from "./TotalProducts";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderList from "./OrderList";
import BarChart from "./BarChart";

function Dashboard() {
  const [DashboardData, setDashboardData] = useState({});
  useEffect(() => {
    axios
      .get("https://localhost:7268/api/Product/DashboardCall")
      .then((res) => {
        setDashboardData(res.data);
        console.log(res.data);
        console.log(DashboardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCustomers count={DashboardData.customers} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalOrders count={DashboardData.orders} />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <DeliveredOrders
                count={
                  (DashboardData.deliveredOrders / DashboardData.orders) * 100
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalProducts
                count={DashboardData.products}
                sx={{ height: "100%" }}
              />
            </Grid>
            {/* <Grid item lg={8} md={12} xl={9} xs={12}></Grid> */}
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: "100%" }} /> 
            </Grid> */}
            {/* <Grid item lg={4} md={6} xl={3} xs={12}>
              <TotalCustomers sx={{ height: "100%" }} />
            </Grid> */}
            <Grid mt={5} item lg={12} md={12} xl={12} xs={12}>
              <BarChart object={DashboardData} />
            </Grid>
            <Grid item lg={8} md={8} xl={12} xs={12}>
              <OrderList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
  );
}

export default Dashboard;
