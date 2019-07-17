import React from "react";
import Snaggle from "../images/snaggle404.png";
import { CssBaseline } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function NotFound() {
  return (
    <div>
      <CssBaseline />
      <Grid container justify="center" style={{ marginTop: 50 }}>
        <Grid item xs={12}>
          <Typography align="center" variant="h1">
            404
          </Typography>
        </Grid>
        <img src={Snaggle} />
        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            You've interrupted Snaggle's workout!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
