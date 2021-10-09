import "./LayoutTemplate.scss";
import React from "react";
import Loadable from "react-loadable";
import { Container, Grid } from "@material-ui/core";

const Header = Loadable({
  loader: () => import("@modules/_Layout/Header"),
  loading: () => <></>,
});

const Footer = Loadable({
  loader: () => import("@modules/_Layout/Footer"),
  loading: () => <></>,
});

const Content = ({ children }) => {
  return (
    <Grid container component="main" className="h-100">
      <Grid container justifyContent="center" className="wrapper">
        <Header logo="Code Management System" />
        <Container maxWidth={false} className="body-content">
          {children}
        </Container>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Content;
