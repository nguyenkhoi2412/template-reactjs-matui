import "./Footer.scss";
import { Typography, Link } from "@material-ui/core";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        material dashboard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => {
  //#region render html content
  return (
    <React.Fragment>
      <footer className="fixed-bottom">
        <Copyright />
      </footer>
    </React.Fragment>
  );
};

export default Footer;
