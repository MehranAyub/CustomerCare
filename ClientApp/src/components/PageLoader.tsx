import { Backdrop, CircularProgress } from "@mui/material";
import { FunctionComponent } from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: FunctionComponent<PageLoaderProps> = (props) => {
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
