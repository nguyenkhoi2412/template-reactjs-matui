import "./Header.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
//#region material-ui
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
//#endregion
//#region formik
// import { useFormik } from "formik";
// import { siteSchema } from "@schema/site";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import { SITE_GET_BY_NAME, siteState } from "@redux/providers/site.reducer";
import { SIGN_OUT } from "@redux/providers/auth.reducer";
import { langState } from "@redux/providers/lang.reducer";
import { UPDATE_MENU_ACTIVE } from "@redux/utils/currentMenu.reducer";

//#endregion
const Header = (props) => {
  //#region declares variables
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const site = useSelector(siteState);
  const language = useSelector(langState);
  //#endregion

  //#region useHooks
  React.useEffect(() => {
    dispatch(SITE_GET_BY_NAME());
  }, []);

  React.useEffect(() => {
    if (site.d._id > 0) {
      const temptype = site.d.types.filter((t) => t.default_active == true);

      // set menu top active
      if (temptype.length)
        dispatch(
          UPDATE_MENU_ACTIVE({ topMenu: temptype[0]._id, childMenu: "" })
        );
    }
  }, [site.d._id]);
  //#endregion

  //#region callback event
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(SIGN_OUT());

    history.push("/login");
  };
  //#endregion

  //#region render html content
  const renderButtonType = site.d.types.map((t) => {
    if (t.sort > 0) {
      return (
        <Button key={t._id} color="inherit">
          {t.name[language.code]}
        </Button>
      );
    }
  });

  return (
    <>
      <AppBar position="fixed" className="dark">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {props.logo}
          </Typography>
          <Typography component="div" className="settings">
            {renderButtonType}
            <Button color="inherit" className="signout" onClick={handleSignOut}>
              {t("signin.signout")}
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
  //#endregion
};

export default Header;
