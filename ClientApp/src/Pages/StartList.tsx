import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
  InputAdornment,
} from "@mui/material";
import React, { useContext } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../components/Footer";

const StartList: React.FunctionComponent = () => {
  var user = null as any;
  user = localStorage.getItem("token");
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [year, setYear] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  const [date, setDate] = React.useState<any>("April 7, 2022");
  const [listData, setListData] = React.useState<any>({
    occasion: "",
    title: "",
    note: "",
  });

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const handleListData = (event: any) => {
    setListData({ ...listData, [event.target.name]: event.target.value });
  };
  const handleContinue = () => {
    console.log("List Data", listData);
    if (
      listData.occasion !== "" &&
      listData.title !== "" &&
      listData.date !== ""
    ) {
      setErrorMessage(false);
      navigate(
        `/MakeList/${listData.occasion}/${listData.title}/${date}/${listData.note}`
      );
    }
    setErrorMessage(true);
  };
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
                START A LIST
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
              name="occasion"
              onChange={handleListData}
              value={listData.occasion}
              label="What's the occasion?"
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
              name="title"
              onChange={handleListData}
              value={listData.title}
              label="Name Your List"
              variant="outlined"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month", "day"]}
                label=" Date of occasion?"
                showToolbar={true}
                value={year}
                onChange={(newValue) => {
                  var date = new Date(newValue?.toString() ?? "");

                  setDate(
                    date.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })
                  );
                  setYear(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarMonthIcon sx={{ color: "#EBE8D8" }} />
                        </InputAdornment>
                      ),
                    }}
                    name="date"
                    variant="outlined"
                  />
                )}
              />
            </LocalizationProvider>

            <TextareaAutosize
              aria-label="minimum height"
              minRows={6}
              placeholder="Add a note, e.g: size, fit etc.."
              style={{
                maxWidth: "sm",
                width: "100%",
                marginTop: "20px",
                borderColor: "#EBE8D8",
                background: "none",
                color: "#EBE8D8",
                borderRadius: "0px",
                paddingLeft: "10px",
                paddingTop: "10px",
                fontFamily: "Helvetica",
              }}
              name="note"
              onChange={handleListData}
              value={listData.note}
            />
            <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
              <Button
                sx={{
                  color: "#EC6B40",
                  fontSize: "16px",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
                onClick={() => {
                  handleContinue();
                }}
              >
                Continue <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
          <p style={{ color: "red", display: errorMessage ? "block" : "none" }}>
            Please fill all fields*
          </p>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default StartList;
