import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <Typography
      component={props.component ? props.component : "h2"}
      variant="h6"
      color="primary"
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}
