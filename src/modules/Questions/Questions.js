import "./Questions.scss";
import { useTranslation, Trans } from "react-i18next";

//#region component helper
import Title from "@components/Title";
// import DataTable from "@components/common/DataTable";
// import Dialog from "@components/common/Dialog";
import { Helpers } from "@utils/helpers";
//#endregion

const Questions = () => {
  //#region init data
  const { t } = useTranslation();
  //#endregion
  
  return (
    <>
      <div className="pane-header">
        <Title>{t("site.questionnaire")}</Title>
        {/* <Button
    edge="end"
    variant="outlined"
    color="primary"
    onClick={openFormActionType}
  >
    {t("button.newtype")}
  </Button> */}
      </div>
      <div className="pane-content"></div>
    </>
  );
};

export default Questions;
