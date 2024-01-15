import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
  Paper,
  List,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import ListApi from "./../services/Api/List.Api";
import Footer from "../components/Footer";
const MyLists: React.FunctionComponent = () => {
  let navigate = useNavigate();
  var user = null as any;
  user = localStorage.getItem("token");
  var userData = JSON.parse(user);
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
  const { data, isLoading, isError, refetch } = useQuery(
    "getMyLists",
    () => ListApi.MyLists(userData.id ?? ""),
    {
      refetchOnWindowFocus: false,
      //enabled: false,
    }
  );

  const [myLists, setMyLists] = React.useState<any[]>([]);
  React.useEffect(() => {
    if (data) {
      setMyLists(data);
      console.log("Returned data ", data);
    }
  }, [data]);
  const getList = (id: string) => {
    navigate(`/AList/${id}`);
  };
  return (
    <>
      <Container component="div" maxWidth="xs" style={{ height: "100vh" }}>
        <Box
          mt={12}
          style={{
            height: "100%",
            textAlign: "center",
          }}
        >
          <Typography
            fontSize="28px"
            fontFamily="Lulo-Clean-One-Bold"
            color="#EC6B40"
            component="h1"
            variant="h5"
          >
            My Lists
          </Typography>
          <Box mt={7} height="58vh">
            <Paper
              sx={{
                overflow: "auto",
                backgroundColor: "black",
              }}
            >
              <List
                sx={{
                  maxHeight: 400,
                  backgroundColor: "black",
                }}
              >
                {myLists.map((item: any, index: number) => (
                  <Typography
                    key={index}
                    fontSize="16px"
                    fontFamily="Lulo-Clean-One-Bold"
                    color="#EBE8D8"
                    mb={5.5}
                    onClick={() => getList(item.id)}
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    {item.title}
                  </Typography>
                ))}

                <Typography
                  display={myLists.length > 0 ? "none" : "block"}
                  mt="50%"
                  fontSize="8px"
                  fontFamily="Lulo-Clean-One-Bold"
                  color="#EBE8D8"
                >
                  You have not made any lists yet.
                </Typography>
              </List>
            </Paper>
          </Box>
          <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{
                maxWidth: "220px",
                fontSize: "12px",
                backgroundColor: "none",
                color: "#EC6B40",
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                border: "2px solid #EC6B40",
                borderRadius: 0,
                width: "100%",
              }}
              onClick={() => {
                navigate("/StartList");
              }}
            >
              start a new List
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default MyLists;
