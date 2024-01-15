import React from "react";
import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import Insta from "../Assets/insta1.png";
import linkedIn from "../Assets/linkedin1.png";
import { height } from "@mui/system";
function Footer() {
  const Redirect = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Paper
      sx={{
        display: { xs: "none", md: "block" },
        position: "static",
        backgroundColor: "#EBE8D8",

        height: "136px",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ justifyContent: "flex-end", mt: 6 }}>
          <IconButton
            onClick={() => {
              Redirect("https://www.instagram.com/alistforall/");
            }}
          >
            <img src={Insta} />
          </IconButton>
        </Box>
        <Divider
          sx={{
            ml: 5,
            mt: "0.8%",
            backgroundColor: "#363636",
            height: "111px",
            width: "1px",
          }}
          orientation="vertical"
        />
        <Box
          sx={{
            justifyContent: "flex-start",
            ml: 5,
            mt: 3,
          }}
        >
          <Typography
            onClick={() => {
              Redirect("https://mailchimp.com/legal/");
            }}
            sx={{
              fontSize: "14px",
              color: "#363636",
              mt: 2,
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "#363636", mt: 1 }}>
            contact@alistforall.com{" "}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default Footer;
