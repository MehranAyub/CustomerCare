import {
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const TotalProducts = (props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL Products
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <ShoppingCartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2,
          }}
        >
          <LaunchIcon
            fontSize="small"
            color="success"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/addProducts");
            }}
          />
          <Typography color="textSecondary" variant="caption">
            &nbsp; Go to Products
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
