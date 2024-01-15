import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  Divider,
  IconButton,
  DialogContent,
  Dialog,
} from "@mui/material";
import Icon from "../Assets/Icon.png";
import Icon1 from "../Assets/Icon1.png";
import ListApi from "../services/Api/List.Api";
import { useMutation, useQuery } from "react-query";
import PageLoader from "../components/PageLoader";
import * as ModelSlice from "../models/ModelSlice";
import { useNavigate, useParams } from "react-router-dom";

const SharedList: React.FunctionComponent = () => {
  var navigate = useNavigate();
  let { id } = useParams();
  const {
    data: AList,
    isLoading: Loading,
    refetch,
    isError: Error,
  } = useQuery("getAList", () => ListApi.GetAList(id), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  const {
    mutate,
    isLoading: adding,
    data: mutationData,
  } = useMutation((body: any) => ListApi.BuyItems(body), {
    onSuccess: () => console.log("add List"),
    onError: () => console.log("Could not add List"),
  });
  const [myList, setMyList] = React.useState<any[]>([]);
  const [myLinks, setMyLinks] = React.useState<ModelSlice.List[]>([]);
  const [savedList, setSavedList] = React.useState<any>([]);
  const [itemIds, setItemIds] = React.useState<any>([]);
  const [linkIds, setLinkIds] = React.useState<any>([]);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleItemBought = (Id: any) => {
    setMyList(
      myList.map((item: any) =>
        item.id === Id ? { ...item, isBought: true } : item
      )
    );
    setItemIds([...itemIds, Id]);
  };

  const handleLinkBought = (Id: any) => {
    setMyLinks(
      myLinks.map((item: any) =>
        item.id === Id ? { ...item, isBought: true } : item
      )
    );
    setLinkIds([...linkIds, Id]);
  };

  const handleSave = () => {
    if (itemIds.length > 0 || linkIds.length > 0) {
      setErrorMessage(false);
      mutate({
        listId: savedList.id ?? "",
        itemIds: itemIds,
        linkIds: linkIds,
      });
    } else {
      setErrorMessage(true);
    }
  };
  const handleProductLink = (link: string) => {
    window.open(link, "_blank");
  };
  const handleClose = () => {
    setItemIds([]);
    setLinkIds([]);
    refetch();
    setOpen(false);
  };

  React.useEffect(() => {
    if (Error) {
      navigate("/login");
    }
  }, [Error]);

  React.useEffect(() => {
    if (mutationData) {
      if (mutationData.status === 0) {
        setOpen(true);
      }
    }
  }, [mutationData]);

  React.useEffect(() => {
    if (AList) {
      if (AList.status === 0) {
        setSavedList(AList.entity);
        setMyLinks(AList.entity.linkItems);
        setMyList(AList.entity.listItems);
      }
      console.log("Returned Data of List", AList);
    }
  }, [AList]);

  return (
    <>
      <Box
        width="xl"
        component="div"
        sx={{ backgroundColor: "#EBE8D8", minHeight: "100vh" }}
      >
        <PageLoader isLoading={Loading || adding}></PageLoader>
        <Box
          pt={8}
          style={{
            height: "auto",
            textAlign: "center",
          }}
        >
          <Box component="div">
            <Typography
              fontSize="28px"
              fontFamily="Lulo-Clean-One-Bold"
              color="black"
              component="h1"
              variant="h5"
            >
              {savedList.occasion}{" "}
            </Typography>
            <Typography
              mt={0.5}
              sx={{ fontSize: "12px" }}
              color="black"
              variant="body2"
            >
              {savedList.date}{" "}
            </Typography>
            <Typography
              mt={0.5}
              sx={{ fontSize: "12px" }}
              color="#363636"
              variant="body2"
            >
              {savedList.note}{" "}
            </Typography>
          </Box>
          <Box mt={3}>
            <Box
              sx={{
                ml: { xs: 0, md: 20 },
                mt: 3,
                p: 0,
              }}
              height="auto"
            >
              <Paper
                sx={{
                  boxShadow: "none",
                  overflow: "auto",
                  backgroundColor: "#EBE8D8",
                }}
              >
                <List
                  sx={{
                    maxHeight: 500,

                    backgroundColor: "#EBE8D8",
                  }}
                >
                  <>
                    <Grid
                      container
                      direction="row"
                      justifyContent="left"
                      textAlign="left"
                      color="black"
                      spacing={2}
                      pl="10%"
                    >
                      {myList.map((item: any, index: number) => (
                        <Grid key={index} item xs={6} md={3}>
                          <Box sx={{ opacity: item.isBought ? 0.3 : 1 }}>
                            <img
                              onClick={() => {
                                handleProductLink(item.storeLink);
                              }}
                              style={{
                                width: "129px",
                                height: "153px",
                              }}
                              alt=""
                              src={
                                "https://localhost:7216/Assets/" + item.image
                              }
                            ></img>
                            <Typography
                              onClick={() => {
                                handleProductLink(item.storeLink);
                              }}
                              noWrap
                              sx={{
                                fontSize: "14px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "17ch",
                              }}
                            >
                              {item.title}
                            </Typography>

                            <Box
                              sx={{
                                maxWidth: "129px",
                                display: "flex",
                                direction: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                }}
                              >
                                {item.price}
                              </Typography>
                              {item.isBought ? (
                                <IconButton sx={{ mt: -0.5 }}>
                                  <img src={Icon} />
                                </IconButton>
                              ) : (
                                <IconButton
                                  sx={{ mt: -0.5 }}
                                  onClick={() => {
                                    handleItemBought(item.id);
                                  }}
                                >
                                  <img src={Icon1} />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </>
                </List>
              </Paper>
              <Typography
                sx={{
                  mt: 5,
                  display: myLinks.length > 0 ? "block" : "none",
                  fontSize: "16px",
                  color: "black",
                  textAlign: "left",
                  fontFamily: "Lulo-Clean-One-Bold",
                }}
              >
                Other Items
              </Typography>
              {myLinks.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      direction: "row",
                      justifyContent: "space-between",
                      opacity: item.isBought ? 0.3 : 1,
                    }}
                  >
                    <Typography
                      onClick={() => {
                        handleProductLink(item.link);
                      }}
                      sx={{
                        fontSize: "14px",
                        color: "#363636",
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.isBought ? (
                      <IconButton sx={{ mt: -0.5 }}>
                        <img src={Icon} />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ mt: -0.5 }}
                        onClick={() => {
                          handleLinkBought(item.id);
                        }}
                      >
                        <img src={Icon1} />
                      </IconButton>
                    )}
                  </Box>
                  <Divider
                    sx={{
                      border: "0.5px solid black",
                    }}
                  />
                </React.Fragment>
              ))}
            </Box>
          </Box>
          <Box
            mt={7}
            sx={{
              justifyContent: "center",
              bottom: 0,
              textAlign: "center",
            }}
          >
            <Typography textAlign="center" fontSize="12px" color="black">
              Did you purchase the items that you checked?{" "}
            </Typography>
            <Typography
              sx={{ display: errorMessage ? "block" : "none" }}
              textAlign="center"
              fontSize="12px"
              color="red"
            >
              Please check Items to buy..
            </Typography>
            <Button
              sx={{
                mt: 2,
                mb: 2,
                maxWidth: "270px",
                fontSize: "12px",
                backgroundColor: "none",
                color: "#EC6B40",
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                border: "2px solid #EC6B40",
                borderRadius: 0,
                width: "100%",
              }}
              onClick={handleSave}
            >
              I purchased the items
            </Button>
          </Box>
        </Box>
        <Dialog
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#EBE8D8",
            },
          }}
        >
          <DialogContent>
            <Typography textAlign="center" fontSize="12px" color="black">
              Thank you for buying the items!{" "}
            </Typography>

            <Button
              sx={{
                mt: 2,
                mb: 2,
                maxWidth: "270px",
                fontSize: "12px",
                backgroundColor: "none",
                color: "#EC6B40",
                fontFamily: "Lulo-Clean-One-Bold",
                textAlign: "center",
                border: "2px solid #EC6B40",
                borderRadius: 0,
                width: "100%",
              }}
              onClick={handleClose}
            >
              BACK TO LIST{" "}
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default SharedList;
