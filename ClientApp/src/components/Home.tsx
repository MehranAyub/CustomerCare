import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Logo from "../Assets/Logo.png";
import inspSeason from "../Assets/InspSeason.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
function Home() {
  var navigate = useNavigate();

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundColor: "#EBE8D8",
            height: "90vh",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid item xs={0} md={3}></Grid>
            <Grid sx={{ mt: 15 }} item xs={12} md={6}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img src={Logo}></img>
              </Box>
              <Box sx={{ display: { xs: "block", md: "none" }, width: "50%" }}>
                <img src={Logo} style={{ width: "331px" }}></img>
              </Box>
            </Grid>
            <Grid item xs={0} md={3}></Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ArrowDownwardIcon
              sx={{
                display: { xs: "block", md: "none" },
                mt: "35vh",
                color: "#EC6B40",
              }}
            />
            <ArrowDownwardIcon
              sx={{
                display: { xs: "none", md: "block" },
                mt: "2%",
                color: "#EC6B40",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: "#EC6B40",
            height: "476px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Typography
              sx={{
                fontFamily: "Baskerville",
                textAlign: "center",
                fontSize: "33px",
                fontWeight: 400,
                mt: "145px",
                letterSpacing: "-0.02em",
              }}
            >
              Gift smarter
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <Typography
              sx={{
                fontFamily: "Baskerville",
                fontSize: "33px",
                textAlign: "center",

                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              Your one stop destination to make every wish come true.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Button
              sx={{
                backgroundColor: "none",
                border: "2px solid black",
                borderRadius: "0px",
                width: "270px",
                color: "black",
                fontFamily: "Lulo-Clean-One-Bold",
              }}
              size="large"
              onClick={() => {
                navigate("/StartList");
              }}
            >
              START A LIST
            </Button>
          </Box>
        </Box>
        <Box>
          <Grid sx={{ flexGrow: 1 }} justifyContent="space-around" container>
            <Grid item xs={12} md={3} sx={{ marginTop: "98px" }}>
              <Typography
                sx={{
                  fontFamily: "Lulo-Clean-One-Bold",
                  fontSize: "16px",
                  textAlign: "center",
                  lineHeight: "19.02px",
                  fontWeight: 400,
                  color: "white",
                }}
              >
                UNLIMITED LISTS
              </Typography>

              <Grid
                item
                ml={10}
                sx={{
                  width: 198,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Open Sauce One",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "17.08px",
                    fontWeight: 400,
                    color: "#7F7F7F",
                  }}
                >
                  Sign up for free and make a wish list for any occasion.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sx={{ marginTop: "98px" }}>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Lulo-Clean-One-Bold",
                  fontSize: "16px",
                  textAlign: "center",
                  lineHeight: "19.02px",
                  fontWeight: 400,
                  color: "white",
                }}
              >
                Add any product{" "}
              </Typography>
              <Grid
                item
                ml={10}
                sx={{
                  width: 198,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Open Sauce One",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "17.08px",
                    fontWeight: 400,
                    color: "#7F7F7F",
                  }}
                >
                  Fetch products from all your favourite stores or choose from A
                  LIST directly.
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sx={{ marginTop: "98px" }}>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Lulo-Clean-One-Bold",
                  fontSize: "16px",
                  textAlign: "center",
                  lineHeight: "19.02px",
                  fontWeight: 400,
                  color: "white",
                }}
              >
                Share with anyone{" "}
              </Typography>
              <Grid
                item
                ml={10}
                sx={{
                  width: 198,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Open Sauce One",
                    fontSize: "14px",
                    textAlign: "center",
                    lineHeight: "17.08px",
                    fontWeight: 400,
                    color: "#7F7F7F",
                  }}
                >
                  Share your lists with family and friends in an instant.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box ml="10%" mt="110px">
          <Typography
            sx={{
              fontFamily: "Lulo-Clean-One-Bold",
              fontSize: "28px",
              textAlign: "start",
              lineHeight: "29.02px",
              fontWeight: 400,
              color: "#EC6B40",
            }}
          >
            Create a list for your
          </Typography>
          <Typography
            sx={{
              backgroundImage:
                "linear-gradient(-50.0deg, rgba(0, 0, 0, 0) 21.55%, #ffffff 105.51%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mt: "32px",
              fontFamily: "Lulo-Clean-One-Bold",
              display: { xs: "block", md: "none" },
              color: "white",
              fontSize: "20px",
              textAlign: "start",
              lineHeight: "23.02px",
              fontWeight: 400,
            }}
          >
            BIRTHDAY,
            <br /> WEDDING,
            <br /> BABY SHOWEr,
            <br /> MOVING IN PARTY, DIVORCE PARTY, JUST BECAUSE, GRADUATION,
            CHRISTMAS, HANUKKAH,
            <br />
            RAMADAN
            <br /> OR
            <br /> JUST
            <br /> FOR
            <br /> fUN...{" "}
          </Typography>
          <Typography
            sx={{
              backgroundImage:
                "linear-gradient(-4.0deg, rgba(0, 0, 0, 0) 21.55%, #ffffff 105.51%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mt: "32px",
              fontFamily: "Lulo-Clean-One-Bold",
              display: { xs: "none", sm: "block" },
              color: "white",
              fontSize: "20px",
              textAlign: "start",
              lineHeight: "23.02px",
              fontWeight: 400,
            }}
          >
            BIRTHDAY, WEDDING, BABY SHOWEr, MOVING IN PARTY, <br /> DIVORCE
            PARTY, JUST BECAUSE, GRADUATION, CHRISTMAS, <br /> HANUKKAH, <br />
            RAMADAN <br />
            OR
            <br /> JUST
            <br /> FOR
            <br /> fUN...{" "}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            sx={{
              backgroundColor: "none",
              border: "2px solid WHITE",
              borderRadius: "0px",
              width: "270px",
              color: "WHITE",
              fontFamily: "Lulo-Clean-One-Bold",
            }}
            onClick={() => {
              navigate("/StartList");
            }}
            size="large"
          >
            GET STARTED
          </Button>
        </Box>
        <Box ml="10%" mt="206px">
          <Typography
            sx={{
              fontFamily: "Lulo-Clean-One-Bold",
              fontSize: "28px",
              textAlign: "start",
              lineHeight: "29.02px",
              fontWeight: 400,
              color: "#EC6B40",
            }}
          >
            INSPIRATION{" "}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Open Sauce One",
              mt: "2px",
              color: "#B6B6B6",
              fontSize: "14px",
              textAlign: "start",
              lineHeight: "14.64px",
              fontWeight: 400,
            }}
          >
            Featured blogs to help you find the best gifts
          </Typography>
          <Grid mt={1} pb={15} container display="flex" width="auto">
            <Grid item xs={6} md={3} maxWidth="202px">
              <Box sx={{ direction: "column", maxWidth: "202px" }}>
                <img style={{ width: "202px" }} src={inspSeason}></img>
                <Typography
                  sx={{
                    fontFamily: "Lulo-Clean-One",
                    mt: "2px",
                    color: "#EBE8D8",
                    letterSpacing: "-0.1em",
                    fontSize: "12px",
                    textAlign: "start",
                    lineHeight: "14.64px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/Inspiration");
                  }}
                >
                  Pisces Season
                </Typography>
              </Box>
            </Grid>

            <Grid
              mr="10%"
              item
              xs={12}
              display="flex"
              justifyContent="flex-end"
            >
              <Box>
                <Button
                  sx={{
                    color: "#EBE8D8",
                    fontSize: "14px",
                    fontFamily: "Lulo-Clean-One-Bold",
                  }}
                  onClick={() => {
                    navigate("/Inspiration");
                  }}
                >
                  SEE MORE <ArrowForwardIcon />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default Home;
