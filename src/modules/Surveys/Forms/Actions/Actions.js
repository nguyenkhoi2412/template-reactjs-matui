import "./Actions.scss";
import { useTranslation, Trans } from "react-i18next";
import Title from "@components/Title";
import ControlSelect from "@components/common/ControlSelect";
//#region material-ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//#endregion
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import surveySchema from "./surveySchema";
import RenderFieldElements from "@components/common/RenderFieldElements";
import { useFormik } from "formik";
//#region redux
import { useDispatch, useSelector } from "react-redux";
import siteReducer, { siteState } from "@redux/providers/site.reducer";
import { langState } from "@redux/providers/lang.reducer";
//#endregion

const Actions = (props) => {
  const { t } = useTranslation();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [valuesSelected, setValuesSelected] = React.useState([]);
  const initialValues = surveySchema.initialValues(props.data);
  const dataFormActions = surveySchema.dataForm();

  const site = useSelector(siteState);
  const lang = useSelector(langState);

  //#region Drawer
  const handleCloseDrawer = (event) => {
    props.renderComponentReceivedData({
      event: event,
      anchor: "right",
      hideDrawer: true,
    });
  };
  //#endregion

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validate: (values) => {
      console.log("values", values);
    },
    validationSchema: getYupSchemaFromMetaData(dataFormActions),
    validateOnChange: enableValidation,
    // validateOnBlur: enableValidation,
    onSubmit: async (values) => {
      console.log("submit", values);
    },
  });

  //#region callback events
  const handleResetForm = React.useCallback(() => {
    formik.resetForm();
  });

  const handleSelect = React.useCallback((dataReceived) => {
    let tempHighClass = [];
    console.log(dataReceived);
    // dataReceived.value.map((price) => {
    //   tempHighClass.push({
    //     value: price,
    //     text: dataReceived.text,
    //     quantity: 1,
    //     name: dataReceived.name,
    //   });
    // });

    // setValuesSelected({
    //   ...valuesSelected,
    //   [dataReceived.name]: tempHighClass,
    // });
  });
  //#endregion

  //#region render html
  const renderSelectType = dataFormActions
    .filter((filter) => filter.renderName === "type")
    .map((x) => {
      const configsSelectType = {
        multiple: false,
        id: x.id,
        field: x.field,
        label: x.label,
        showOptionEmpty: false,
        dataOptions: x.data,
        xs: 12,
        sm: 12,
        handleSelectData: handleSelect,
      };

      return (
        <ControlSelect
          key={x.field + Math.random()}
          configs={configsSelectType}
        />
      );
    });
  //#endregion

  return (
    <>
      <Grid
        container
        item
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        className="panel-survey drawer"
      >
        <Grid item className="row h-100" xs={12}>
          <Grid item className="item-header">
            <Title>{t("button.newsurvey")}</Title>
          </Grid>
          <hr />
          <Grid item className="item-content">
            <form
              noValidate
              autoComplete="off"
              className="form"
              onSubmit={(e) => {
                setEnableValidation(true);
                formik.handleSubmit(e);
              }}
            >
              <Grid
                container
                item
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Grid container item className="row fields" spacing={2}>
                  {renderSelectType}

                  <RenderFieldElements
                    metadata={dataFormActions}
                    renderName={lang.code}
                    formik={formik}
                  />
                </Grid>
                {/** Dialog content submit button */}
                <Grid container item className="row actions">
                  <Button
                    type="submit"
                    //disabled={type.isFetching}
                    variant="contained"
                    color="primary"
                  >
                    {t("common.save")}
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    onClick={handleResetForm}
                  >
                    {t("common.reset")}
                  </Button>
                  <Button color="primary" onClick={handleCloseDrawer}>
                    {t("common.close")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Actions;
