import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockIcon from "@mui/icons-material/Lock";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import IconButton from "@mui/material/IconButton";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";

const drawerWidth = 240;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);

const Index = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
        <Box
          display="dlex"
          justifyContent="flex-end"
          alignItems="center"
          mt={1}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            style={{ color: "#38376e" }}
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => Logout("login")} sx={{ fontSize: "14px" }}>
            <LogoutIcon sx={{ marginRight: 1 }} fontSize="small" /> Log Out
          </MenuItem>
        </Menu>
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
                {/* <Avatar alt={`Avatar`} src={HP2} /> */}

                {user.role === 0 ? (
                  <AdminPanelSettingsIcon fontSize="large" />
                ) : user.role === 2 ? (
                  <SupportAgentIcon fontSize="large" />
                ) : (
                  <PersonIcon fontSize="large" />
                )}
              </ListItemAvatar>
              <ListItemText primary={user.firstName + " " + user.lastName} />
            </ListItemButton>
          </ListItem>
        </List>
        <Toolbar />
        {/* <Typography mt={2} mb={2} fontSize="22px" textAlign="center">
          {user.role === 0
            ? "Admin"
            : user.role === 1
            ? "Customer"
            : user.role === 2
            ? "Agent"
            : ""}
        </Typography> */}
        <Divider sx={{ bgcolor: "white" }} />
        {user.role === 0 ? (
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
              <ListItemButton onClick={() => goToPage("/users")}>
                <ListItemIcon>
                  <PersonAddIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => goToPage("/AdminComplaints")}>
                <ListItemIcon>
                  <ReportProblemIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Complaints" />
              </ListItemButton>
            </ListItem>
            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => goToPage("/blogs")}>
                <ListItemIcon>
                  <DensitySmallIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Blogs" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem className="listHover" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem> */}

            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => Logout("/login")}>
                <ListItemIcon>
                  <LockIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        ) : user.role === 1 ? (
          <List>
            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => goToPage("/CustomerComplaints")}>
                <ListItemIcon>
                  <ReportProblemIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="My Complaints" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem className="listHover" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem> */}

            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => Logout("/login")}>
                <ListItemIcon>
                  <LockIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => goToPage("/AgentComplaints")}>
                <ListItemIcon>
                  <ReportProblemIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Complaints" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem className="listHover" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem> */}

            <ListItem className="listHover" disablePadding>
              <ListItemButton onClick={() => Logout("/login")}>
                <ListItemIcon>
                  <LockIcon sx={{ color: "#ffff" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        )}
        <Divider sx={{ bgcolor: "white" }} />
        <Box component="div" sx={{ m: 5 }}>
          <Typography fontSize="22px" textAlign="center">
            DocBlock
          </Typography>
          <ReportProblemIcon sx={{ fontSize: 150 }} />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "rgb(249, 250, 240)",
          p: 3,
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Index;
