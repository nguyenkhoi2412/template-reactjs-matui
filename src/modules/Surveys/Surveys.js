import "./surveys.scss";
import { useTranslation, Trans } from "react-i18next";
//#region material-ui
import Button from "@material-ui/core/Button";
//#endregion
//#region component helper
import Title from "@components/Title";
import DrawerSurveys from "@components/common/Drawer";
// import DataTable from "@components/common/DataTable";
// import Dialog from "@components/common/Dialog";
import { Helpers } from "@utils/helpers";
//#endregion

const Surveys = () => {
  //#region init data
  const { t } = useTranslation();
  //#endregion

  //#region drawer config
  const refDrawerSurveys = React.useRef();
  const [componentConfigs, setComponentConfigs] = React.useState({
    component: "actionSurvey",
    data: {},
  });

  const handleOpenDrawerNewSurveys = (event) => {
    refDrawerSurveys.current.openDrawer(event, "right");
  };
  //#endregion

  return (
    <>
      <div className="pane-header">
        <Title>{t("site.surveys")}</Title>
        <Button
          edge="end"
          variant="outlined"
          color="primary"
          onClick={handleOpenDrawerNewSurveys}
        >
          {t("button.newsurvey")}
        </Button>
      </div>
      <div className="pane-content"></div>
      <DrawerSurveys
        ref={refDrawerSurveys}
        configs={{ showCloseIcon: false }}
        componentConfigs={componentConfigs}
      />
    </>
  );
};

export default Surveys;
