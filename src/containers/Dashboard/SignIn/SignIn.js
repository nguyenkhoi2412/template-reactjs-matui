import "./SignIn.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SnackbarmaUI from "@components/common/Snackbar";
import { TOGGLE_SNACKBAR_ALERT } from "@components/common/Snackbar/snackbar.reducer";
//#region material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
//#endregion
//#region formik
import { useFormik } from "formik";
import { authSchema } from "@schema/auth";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_SPIN_BACKDROP,
  HIDE_SPIN_BACKDROP,
} from "@components/common/BackdropSpin/backdropSpin.reducer";
import { Helpers } from "@utils/helpers";
import { VALIDATE_USER, authState } from "@redux/providers/auth.reducer";
//#endregion

function Copyright() {
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
}

const SignIn = () => {
  //#region declares variables
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(authState);
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    if (!user.isFetching) {
      dispatch(HIDE_SPIN_BACKDROP());
    }

    // show alert message after validate
    if (!user.ok) {
      dispatch(
        TOGGLE_SNACKBAR_ALERT({
          open: true,
          message: user.message,
          severity: "error",
        })
      );
    }

    if (user.authenticated) {
      history.push("/dashboard/type");
    }

    // redirect to private page if user loggedin
    if (localStorage.getItem("userLoggedIn")) history.push("/dashboard/type");
  }, [user]);
  //#endregion

  //#region useFormik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "mstudio",
      password: "rjsmstudio",
    },
    validationSchema: authSchema,
    onSubmit: (values) => {
      dispatch(SHOW_SPIN_BACKDROP());

      Helpers.simulateNetworkRequest(100).then(() => {
        dispatch(VALIDATE_USER(values));
      });
    },
  });
  //#endregion

  return (
    <Grid container component="main" className="signin h-100">
      <Grid container justifyContent="center" className="wrapper">
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          direction="row"
          elevation={6}
          square
        >
          <Grid className="paper">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("signin.signin")}
            </Typography>
            <form
              className="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label={t("signin.username")}
                defaultValue={formik.values.username}
                name="username"
                autoComplete="email"
                autoFocus
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={
                  Boolean(formik.errors.username) ? formik.errors.username : ""
                }
                onChange={formik.handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("signin.password")}
                defaultValue={formik.values.password}
                type="password"
                id="password"
                autoComplete="rjsmstudio"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={
                  Boolean(formik.errors.password) ? formik.errors.password : ""
                }
                onChange={formik.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={t("signin.rememberme")}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
                type="submit"
                disabled={user.isFetching}
              >
                {t("signin.signin")}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {t("signin.forgotpassword")}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {t("signin.register")}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
            {/** Snackbar show message results */}
            <SnackbarmaUI />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
