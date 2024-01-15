import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import UserApi from "../../services/Api/User.Api";
import Footer from "../../components/Footer";

const Login: React.FunctionComponent = () => {
  const {
    data,
    refetch: login,
    isFetching,
  } = useQuery("validateUser", () => UserApi.ValidateUser(userData), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [userData, setUserData] = React.useState<any>({
    email: "",
    password: "",
  });

  const handleListData = (event: any) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const handleContinue = () => {
    console.log("User", userData);
    if (userData.email !== "" && userData.password !== "") {
      return login(userData);
    }
    setErrorMessage("Please fill all fields");
  };
  React.useEffect(() => {
    console.log("returned Data", data);

    if (data) {
      console.log("returned Data", data);
      if (data.entity && data.status === 0) {
        localStorage.setItem("token", JSON.stringify(data.entity));

        navigate(`/StartList`);
      } else {
        setErrorMessage("Invalid Credentials");
      }
    }
  }, [data]);
  return (
    <>
      <Container component="div" maxWidth="xs" style={{ height: "100vh" }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            height: "100%",
            textAlign: "center",
          }}
        >
          <Grid item maxWidth="xs">
            <Box component="div" mt={2}>
              <Typography
                fontSize="28px"
                fontFamily="Lulo-Clean-One-Bold"
                color="#EC6B40"
                component="h1"
                variant="h5"
              >
                SIGN IN
              </Typography>
            </Box>

            <TextField
              fullWidth
              sx={{
                "& .MuiInputLabel-root": { color: "#EBE8D8" }, //styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#EBE8D8",
                    borderRadius: "0px",
                  },
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#EBE8D8",
                  },
                },
                input: { color: "#EBE8D8" },
                mt: "20px",
              }}
              inputProps={{
                autoComplete: "off",
              }}
              name="email"
              onChange={handleListData}
              value={userData.email}
              label="Email"
              variant="outlined"
            />
            <TextField
              fullWidth
              sx={{
                "& .MuiInputLabel-root": { color: "#EBE8D8" }, //styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#EBE8D8",
                    borderRadius: "0px",
                  },
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#EBE8D8",
                  },
                },
                input: { color: "#EBE8D8" },
                mt: "20px",
              }}
              inputProps={{
                autoComplete: "off",
              }}
              type="password"
              name="password"
              onChange={handleListData}
              value={userData.password}
              label="Password"
              variant="outlined"
            />

            <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                disabled={isFetching}
                sx={{
                  color: "#EC6B40",
                  fontSize: "16px",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  handleContinue();
                }}
              >
                Go <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
          <p style={{ color: "red" }}>{errorMessage}</p>
          <Box component="div" mt={5}>
            <Typography
              fontSize="12px"
              fontFamily="Lulo-Clean-One-Bold"
              color="#EBE8D8"
              component="h1"
              variant="h5"
            >
              Don’t have an account?
            </Typography>
            <Typography
              mt={1}
              fontSize="12px"
              fontFamily="Lulo-Clean-One-Bold"
              color="#EC6B40"
              component="h1"
              variant="h5"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/register`);
              }}
            >
              Create an account
            </Typography>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
