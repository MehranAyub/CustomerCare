import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import Vector1 from "../Assets/Vector.png";
import Vector2 from "../Assets/Vector2.png";
import Bubbles from "../Assets/bubbles.gif";
import child from "../Assets/child.gif";
import Aida from "../Assets/aida.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
const styles = {
  bar: {
    display: "inline-block",
    width: "100%",
    height: "47px",
    marginRight: "2px",
  },
};
function About() {
  var navigate = useNavigate();

  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url('${Bubbles}')`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Typography
            textAlign="center"
            fontSize="20px"
            fontFamily="Baskerville"
            zIndex={1}
            color="black"
          >
            Reinventing gifting as we know it.
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexDirection: "column",
            height: "90vh",
          }}
        >
          <Typography
            maxWidth="sm"
            textAlign="center"
            fontSize="28px"
            fontFamily="Lulo-Clean-One-Bold"
            color="#EC6B40"
          >
            ABOUT A LIST{" "}
          </Typography>

          <Typography
            maxWidth="348px"
            textAlign="left"
            fontSize="14px"
            lineHeight="122%"
            fontFamily="Open-Sauce-One"
            color="#B6B6B6"
            p={3}
          >
            Introducing A LIST, the smart online wish-list for all your special
            occasions.
            <br /> With A LIST, you can give the gift of choice while also
            positively impacting the environment, society and economy.
            <br /> You can create a list that reflects your personal values and
            preferences, choosing from a wide variety of retailers, brands and
            companies, including eco-friendly and socially responsible options.
            <br /> <br />
            By giving the gift of choice, we can avoid the problem of duplicate
            or unwanted gifts that often end up in landfills; this not only
            saves resources and energy but also reduces waste and pollution.
            <br /> By choosing A LIST, you're not just making it easy for your
            family and friends to give you the perfect gift but also making a
            conscious choice to reduce your environmental footprint and support
            businesses you care about.{" "}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EBE8D8",
            flexDirection: "column",
            minHeight: "110vh",
          }}
        >
          {[...Array(11)].map((_, index) => (
            <Box
              maxWidth="345px"
              key={index}
              sx={{
                ...styles.bar,
                backgroundColor: index % 2 === 0 ? "#EC6B40" : "none",
              }}
            />
          ))}
          <Box
            position="absolute"
            sx={{
              backgroundColor: "none",
              left: "50%",
              maxWidth: "358px",
              height: "503px",
              transform: "translate(-50%, -16%)",
            }}
          >
            <Typography
              fontSize="28px"
              fontFamily="Lulo-Clean-One-Bold"
              lineHeight="169%"
              color="black"
              textAlign="center"
            >
              SIGN UP FOR A LIST TODAY AND EXPERIENCE THE FUTURE OF GIFT-GIVING,
              <br />
              WHERE SUSTAINABILITY AND CONVENIENCE GO
              <br /> HAND IN HAND.
            </Typography>
          </Box>

          <Button
            sx={{
              mt: "57px",
              backgroundColor: "none",
              border: "2px solid #EC6B40",
              borderRadius: "0px",
              width: "270px",
              color: "#EC6B40",
              fontFamily: "Lulo-Clean-One-Bold",
            }}
            onClick={() => {
              navigate("/StartList");
            }}
          >
            Get started{" "}
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexDirection: "column",
            height: { xs: "70vh", md: "100vh" },
          }}
        >
          <Box
            mt={4}
            sx={{
              width: { xs: "100%", md: "80%" },
              height: { xs: "50%", md: "70%" },
            }}
          >
            <img style={{ width: "100%", height: "100%" }} src={child}></img>
          </Box>

          <Typography
            mt={5}
            maxWidth="760px"
            textAlign="center"
            fontSize="16px"
            lineHeight="120%"
            fontFamily="Lulo-Clean-One-Bold"
            color="#EC6B40"
            p={3}
          >
            A LIST AIMS TO BE A PART OF CELEBRATING ALL LIFE MOMENTS, FROM BIRTH
            TO RETIREMENT AND BEYOND.
          </Typography>
        </Box>
        <Box height="17.5px" sx={{ backgroundColor: "#EBE8D8" }}></Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            flexDirection: "column",
            height: "80vh",
          }}
        >
          <Typography
            maxWidth="sm"
            textAlign="center"
            fontSize="28px"
            fontFamily="Lulo-Clean-One-Bold"
            color="#EC6B40"
          >
            HOW IT WORKS{" "}
          </Typography>

          <Typography
            maxWidth="348px"
            textAlign="right"
            fontSize="14px"
            lineHeight="122%"
            fontFamily="Open-Sauce-One"
            color="#B6B6B6"
            p={3}
          >
            Whether you're planning a wedding, baby shower, birthday party, or
            graduation, A LIST makes it easy to create and manage your gift
            registry. You can create a list in just a few minutes. Simply create
            an account, add your occasion, and start adding items from our
            curated selection. You can also import items from any other
            websites, so you can register for anything you want in one place.
            <br />
            <br />
            Our easy-to-use interface makes it simple to manage your registry,
            even on the go. You can view and update your registry anytime, and
            your guests can easily search for and purchase gifts online. Plus,
            with A LIST, you'll never have to worry about duplicate gifts, as
            guests can see what's been purchased in real time.
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{
            flexDirection: "column",
            backgroundColor: "#EBE8D8",
            minHeight: "100vh",
          }}
        >
          <Box maxWidth="390px" textAlign="center">
            <Typography
              sx={{
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 400,
                mt: 10,
                color: "#EC6B40",
              }}
            >
              The founder
            </Typography>

            <img
              style={{ marginTop: "19px", width: "73%", height: "100%" }}
              src={Aida}
            ></img>
            <Typography
              sx={{
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                fontSize: "16px",
                lineHeight: "120%",
                mt: "19px",
                color: "black",
              }}
            >
              MEET AIDA THE SELF PROCLAIMED QUEEN OF <br />
              GIFTS
            </Typography>
            <Typography
              ml="5%"
              mb="5%"
              maxWidth="348px"
              textAlign="center"
              fontSize="14px"
              lineHeight="122%"
              fontFamily="Open-Sauce-One"
              color="black"
              p={3}
            >
              Aida created A LIST due to her personal experience with the
              challenges and joys of gift giving.
              <br /> As a wife and a mother of three, she has spent countless
              hours on making lists with her kids swell as finding gifts for
              everyone in her circle. The wish of giving meaningful gifts along
              with the frustration of trying to find the
              ”perfect-thoughtful-meaningful-unexpected” gift within the
              constraints of time and budget, gave her the personal insights she
              needed to try and make a change.
              <br />
              <br /> Her international Marketing and PR background, working with
              game changing brands with an online first approach in cities like
              Milan, London and Stockholm, gave her a broad understanding of
              consumer behavior and trends in different markets.
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          sx={{
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              textAlign: "left",
              width: "324px",
              mt: 1,
            }}
          >
            <img src={Vector1}></img>
            <img style={{ marginLeft: "7px" }} src={Vector1}></img>
          </Box>
          <Typography
            width="324px"
            textAlign="center"
            fontSize="12px"
            lineHeight="159%"
            fontFamily="Lulo-Clean-One-Bold"
            color="#B6B6B6"
            p={3}
          >
            My vision for A LIST is to create a platform that truly meets the
            needs of gift givers and recipients everywhere, I want to
            revolutionise the gift registry industry, and start bringing back
            joy and meaning to the gifting process.<br></br>
            <br /> A LIST is is my gift to all Mothers out there working in
            disguise as Santa, Tooth Fairy, Easter Bunny, Cupid and all other
            joyous creatures. If I can help them save some time and avoid
            stress, then I will be truly fulfilled and my mission completed,
            because the best gift one can get, is the gift of time and choice.
            <br />
            <br />
            <Typography
              fontSize="12px"
              lineHeight="159%"
              fontFamily="Lulo-Clean-One-Bold"
              color="#EC6B40"
            >
              -Aida
            </Typography>
          </Typography>
          <Box
            sx={{
              textAlign: "right",
              width: "324px",
            }}
          >
            <img style={{ marginRight: "7px" }} src={Vector2}></img>
            <img src={Vector2}></img>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default About;
