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
import { useMutation, useQuery } from "react-query";
import UserApi from "../../services/Api/User.Api";
import Footer from "../../components/Footer";

const SignUp: React.FunctionComponent = () => {
  const { mutate, isLoading, data } = useMutation((body) =>
    UserApi.createUser(body)
  );

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");
  const [userData, setUserData] = React.useState<any>({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });

  const handleUserData = (event: any) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const comparePassword = (value: any) => {
    if (userData.password !== value) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage("");
    }
  };
  const handleContinue = () => {
    console.log("User", userData);
    if (
      userData.email !== "" &&
      userData.password !== "" &&
      userData.fName !== "" &&
      userData.lName !== "" &&
      userData.password === confPassword
    ) {
      return mutate(userData);
    }
    setErrorMessage("Please fill all fields correctly");
  };
  React.useEffect(() => {
    console.log("returned Data", data);

    if (data) {
      console.log("returned Data", data);
      if (data.entity && data.status === 0) {
        localStorage.setItem("token", JSON.stringify(data.entity));
        navigate(`/StartList`);
      } else if (data.status === 404) {
        setErrorMessage("Username Already Exists");
      } else {
        setErrorMessage("Server Error, please try again");
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
                Create an account
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
              name="fName"
              onChange={handleUserData}
              value={userData.fName}
              label="First Name"
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
              name="lName"
              onChange={handleUserData}
              value={userData.lName}
              label="Last Name"
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
              name="email"
              onChange={handleUserData}
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
              onChange={handleUserData}
              value={userData.password}
              label="Password"
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
              name="password"
              onChange={(e) => {
                setConfPassword(e.target.value);
                comparePassword(e.target.value);
              }}
              type="password"
              value={confPassword}
              label="Confirm Password"
              variant="outlined"
            />
            <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                disabled={isLoading}
                sx={{
                  color: "#EC6B40",
                  fontSize: "16px",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  handleContinue();
                }}
              >
                Sign Up <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SignUp;
