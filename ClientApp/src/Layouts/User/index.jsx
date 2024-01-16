import React from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { Box } from "@mui/system";

const index = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarComponent />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "rgb(249, 250, 240)",
          p: 3,
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
};
export default index;
