import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LaunchIcon from "@mui/icons-material/Launch";
import { pink } from "@mui/material/colors";
import LayersIcon from "@mui/icons-material/Layers";

export const TotalOrders = (props) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              TOTAL Orders
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {props.count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                bgcolor: pink[500],
                height: 56,
                width: 56,
              }}
            >
              <LayersIcon />
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
              navigate("/orderList");
            }}
          />
          <Typography color="textSecondary" variant="caption">
            &nbsp; Go to Orders
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
