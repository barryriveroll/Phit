import React from "react";
import Typography from "@material-ui/core/Typography";
import "./loading.css";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "fixed",
        top: "50vh",
        left: "calc(50% - 95px)"
      }}
    >
      <Typography align="center">Loading</Typography>
      <div className="lds-css ng-scope">
        <div
          style={{ width: "100%", height: "100%" }}
          className="lds-double-ring"
        >
          <div />
          <div />
          <div>
            <div />
          </div>
          <div>
            <div />
          </div>
        </div>
      </div>
      <a
        style={{ textDecoration: "none" }}
        className="aTag"
        href="https://loading.io/spinner/double-ring"
        target="_blank"
      >
        <Typography align="center">Proudly made with Loading.io</Typography>
      </a>
    </div>
  );
}
