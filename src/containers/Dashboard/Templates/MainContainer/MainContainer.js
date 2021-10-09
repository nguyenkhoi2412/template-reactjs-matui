import React from "react";
import "./MainContainer.scss";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
//#region utils
import Loadable from "react-loadable";
import { Helpers } from "@utils/helpers";
//#endregion
import Breadcrumbs from "@components/common/Breadcrumbs";
const PaneLeft = Loadable({
  loader: () => import("@modules/_Layout/PaneLeft"),
  loading: () => <></>,
});

const PaneMiddle = Loadable({
  loader: () => import("@modules/_Layout/PaneMiddle"),
  loading: () => <></>,
});


const MainContainer = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Grid container item className="splitpane h-100">
        <Grid item xs={4} sm={4} md={3} lg={2} className="split left">
          <div className="row h-100">
            <PaneLeft />
          </div>
        </Grid>
        <Grid item xs={8} sm={8} md={9} lg={10} className="split middle">
          <div className="row h-100">
            <Breadcrumbs />
            <PaneMiddle />
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={2} className="split right">
          Right
        </Grid> */}
      </Grid>
    </>
  );
};

export default MainContainer;
