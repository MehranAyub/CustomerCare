import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HP2 from "../../assets/Mehran.jpg";
import { Grid, ListItemAvatar } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

const Index = ({ children }) => {
  const navigate = useNavigate();
  const goToPage = (url) => {
    navigate(url);
    console.log(url);
  };
  const Logout = (url) => {
    localStorage.clear();
    window.location.href = url;
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: "white",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={2}
          mt={0}
        >
          <Grid item>
            <NotificationsActiveIcon
              sx={{ mt: 1 }}
              fontSize="medium"
              color="primary"
            />
          </Grid>
          <Grid item>
            <Avatar sx={{ mr: 1 }} alt={`Avatar`} src={HP2} />
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#111827",
            color: "#FFFFFF",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List dense>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={`Avatar`} src={HP2} />
              </ListItemAvatar>
              <ListItemText primary={user.fName + " " + user.lName} />
            </ListItemButton>
          </ListItem>
        </List>
        <Toolbar />
        <Divider sx={{ bgcolor: "white" }} />

        <List>
          <ListItem className="listHover" disablePadding>
            <ListItemButton onClick={() => goToPage("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem className="listHover" disablePadding>
            <ListItemButton onClick={() => goToPage("/customers")}>
              <ListItemIcon>
                <PersonAddIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </ListItem>
          <ListItem className="listHover" disablePadding>
            <ListItemButton onClick={() => goToPage("/addProducts")}>
              <ListItemIcon>
                <LocalMallIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
          <ListItem className="listHover" disablePadding>
            <ListItemButton onClick={() => goToPage("/orderList")}>
              <ListItemIcon>
                <DensitySmallIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
          <ListItem className="listHover" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountBoxIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>

          <ListItem className="listHover" disablePadding>
            <ListItemButton onClick={() => Logout("/login")}>
              <ListItemIcon>
                <LockIcon sx={{ color: "#ffff" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider sx={{ bgcolor: "white" }} />
        <Box component="div" sx={{ m: 5 }}>
          <p>Dealers Corporate</p>
          <PrecisionManufacturingIcon sx={{ fontSize: 150 }} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "rgb(249, 250, 240)",
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Index;
