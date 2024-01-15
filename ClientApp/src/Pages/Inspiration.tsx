import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Insp from "../Assets/InspSeason.png";

const Inspiration: React.FunctionComponent = () => {
  let navigate = useNavigate();
  return (
    <Box
      component="div"
      maxWidth="xl"
      sx={{
        height: "105vh",
        backgroundColor: "#EBE8D8",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        mt={12}
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          fontSize="28px"
          fontFamily="Lulo-Clean-One-Bold"
          color="black"
          component="h1"
          variant="h5"
        >
          Inspiration{" "}
        </Typography>
        <Box
          position="relative"
          mt={7}
          sx={{ maxWidth: "358px", textAlign: "center" }}
        >
          <img src={Insp}></img>
          <Box
            position="absolute"
            sx={{
              backgroundColor: "#EC6B40",
              left: "50%",
              width: "309px",
              height: "200px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography
              mt="17px"
              fontSize="20px"
              fontFamily="Lulo-Clean-One-Bold"
              color="#EBE8D8"
            >
              Pisces Season{" "}
            </Typography>
            <Typography
              fontSize="12px"
              fontWeight={400}
              lineHeight="122%"
              color="#EBE8D8"
              textAlign="center"
              p={1.5}
            >
              If you have an important Pisces in your life, you might be
              wondering what to give them for their birthday. After all, Pisces
              is known for its dreamy and elusive nature, which can make
              gift-giving a bit of a challenge. But fear not, for we have some
              quirky and unconventional gift ideas that are sure to delight any
              little fishy out there.{" "}
            </Typography>
            <Button
              sx={{
                top: "2%",
                maxWidth: "216px",
                fontSize: "14px",
                backgroundColor: "none",
                color: "#EBE8D8",
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: 0,
                width: "100%",
              }}
            >
              Discover{" "}
            </Button>
            <Button
              sx={{
                top: "-17.5%",
                left: "-1%",
                maxWidth: "216px",
                fontSize: "14px",
                "&:hover": { backgroundColor: "black" },

                backgroundColor: "black",
                color: "#EBE8D8",
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                borderRadius: 0,
                width: "100%",
              }}
              onClick={() => {
                navigate("/Discover");
              }}
            >
              Discover{" "}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Inspiration;
