import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "../Assets/Logo.png";
import Insta from "../Assets/insta.png";
import linkedIn from "../Assets/linkedin.png";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

const drawerWidth = 300;

export default function Navbar() {
  var user = localStorage.getItem("token");
  let navigate = useNavigate();
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const NavTo = (link: any) => {
    navigate(link);
  };
  const Redirect = (url: string) => {
    window.open(url, "_blank");
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ ml: 4, mt: 6, textAlign: "start" }}>
      <Divider />

      <Button
        sx={{
          fontSize: "20px",
          color: "white",
          fontFamily: "Lulo-Clean-One-Bold",
        }}
        onClick={() => {
          NavTo("/Home");
        }}
      >
        HOME
      </Button>
      <br />
      <Button
        sx={{
          fontSize: "20px",
          color: "white",
          fontFamily: "Lulo-Clean-One-Bold",
        }}
        onClick={() => {
          NavTo("/MyLists");
        }}
      >
        MY LISTS
      </Button>
      <Button
        sx={{
          fontSize: "20px",
          color: "white",
          fontFamily: "Lulo-Clean-One-Bold",
        }}
        onClick={() => {
          NavTo("/Inspiration");
        }}
      >
        INSPIRATION
      </Button>
      <Button
        sx={{
          fontSize: "20px",
          color: "white",
          fontFamily: "Lulo-Clean-One-Bold",
        }}
        onClick={() => {
          NavTo("/About");
        }}
      >
        ABOUT
      </Button>
      <Button
        sx={{
          mt: "20px",
          backgroundColor: "none",
          border: "1px solid #EC6B40",
          borderRadius: "0px",
          letterSpacing: "-0.025em",
          fontSize: "14px",
          width: "90%",
          color: "#EC6B40",
          fontFamily: "Lulo-Clean-One-Bold",
        }}
        onClick={() => {
          NavTo("/StartList");
        }}
        size="large"
      >
        START A LIST
      </Button>
      <Box sx={{ position: "absolute", bottom: 30 }}>
        <IconButton
          sx={{ mt: 3 }}
          onClick={() => {
            Redirect("https://www.instagram.com/alistforall/");
          }}
        >
          <img src={Insta} />
        </IconButton>

        <Typography
          onClick={() => {
            Redirect("https://mailchimp.com/legal/");
          }}
          sx={{ fontSize: "14px", color: "#EBE8D8", mt: 2 }}
        >
          Privacy Policy
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#EBE8D8", mt: 1 }}>
          contact@alistforall.com{" "}
        </Typography>
        {!user ? (
          <Button
            sx={{
              mt: 4,
              fontSize: "20px",
              color: "white",
              fontFamily: "Lulo-Clean-One-Bold",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            LOG IN
          </Button>
        ) : (
          <Button
            sx={{
              mt: 4,
              fontSize: "20px",
              color: "white",
              fontFamily: "Lulo-Clean-One-Bold",
            }}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            LOG OUT
          </Button>
        )}
      </Box>
    </Box>
  );

  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#EBE8D8",
          borderBottom: "1.5px solid black",
          boxShadow: "none",
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ ml: "28%", display: { sm: "block", md: "none" } }}>
            <img src={Logo} style={{ width: "72px" }}></img>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" }, width: "100%" }}>
            <Box
              sx={{
                mt: 2,
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button
                sx={{
                  color: "black",
                  letterSpacing: "-0.205em",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  NavTo("/");
                }}
              >
                HOME
              </Button>
              <Button
                sx={{
                  color: "black",
                  letterSpacing: "-0.205em",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  NavTo("/MyLists");
                }}
              >
                MY LISTS
              </Button>
              <Button
                sx={{
                  color: "black",
                  letterSpacing: "-0.205em",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  NavTo("/Inspiration");
                }}
              >
                INSPIRATION
              </Button>
              <Button
                sx={{
                  color: "black",
                  letterSpacing: "-0.205em",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  NavTo("/About");
                }}
              >
                ABOUT
              </Button>
              {!user ? (
                <Button
                  sx={{
                    color: "#EC6B40",
                    letterSpacing: "-0.205em",
                    fontFamily: "Lulo-Clean-One-Bold",
                  }}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  LOG IN
                </Button>
              ) : (
                <Button
                  sx={{
                    color: "#EC6B40",
                    letterSpacing: "-0.205em",
                    fontFamily: "Lulo-Clean-One-Bold",
                  }}
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  LOG OUT
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "black",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
