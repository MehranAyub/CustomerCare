import { Backdrop, CircularProgress } from "@mui/material";

export const PageLoader = (props) => {
  return (
    <>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1300 }}
          open={props.isLoading}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    </>
  );
};

export default PageLoader;
