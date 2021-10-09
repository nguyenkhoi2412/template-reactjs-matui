import "./Actions.scss";
import { useTranslation, Trans } from "react-i18next";
import Title from "@components/Title";
import ControlSelect from "@components/common/ControlSelect";
import { Helpers } from "@utils/helpers";
//#region material-ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//#endregion
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import schema from "./schema";
import RenderFieldElements from "@components/common/RenderFieldElements";
import { useFormik } from "formik";
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  CATEGORY_INSERT_NEW,
  CATEGORY_UPDATE,
  categoryState,
} from "@redux/providers/category.reducer";
import { langState } from "@redux/providers/lang.reducer";
import { TOGGLE_SNACKBAR_ALERT } from "@components/common/Snackbar/snackbar.reducer";
//#endregion

const Actions = (props) => {
  const { t } = useTranslation();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const category = useSelector(categoryState);
  const refButtonClose = React.useRef();
  const initialValues = schema.initialValues(props.data);
  const dataFormActions = schema.dataForm();

  const lang = useSelector(langState);

  //#region useEffect
  React.useEffect(() => {
    // close dialog form when submitted
    if (!category.isFetching && submitting) {
      if (category.ok) {
        //Show message when insert success
        dispatch(
          TOGGLE_SNACKBAR_ALERT({
            open: true,
            message: category.message,
          })
        );

        // return params to close dialog when success
        refButtonClose.current.click();
      } else {
        //Show message when insert fail
        dispatch(
          TOGGLE_SNACKBAR_ALERT({
            open: true,
            message: category.message,
            severity: "error",
          })
        );
      }

      handleResetForm();
      setSubmitting(false);
    }
  }, [category]);
  //#endregion

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
    validationSchema: getYupSchemaFromMetaData(dataFormActions),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    validate: (values) => {},
    onSubmit: async (values) => {
      setSubmitting(true);

      // for UPDATE
      if (Helpers.checkIsNotNull(initialValues._id)) {
        values = Helpers.diffObjects(values, initialValues);
        values._id = initialValues._id;

        dispatch(CATEGORY_UPDATE(values));
      } else dispatch(CATEGORY_INSERT_NEW(values)); // for INSERT NEW
    },
  });

  //#region callback events
  const handleResetForm = React.useCallback(() => {
    formik.resetForm();
  });

  const handleSelect = (dataReceived) => {
    dataReceived = dataReceived.filter((f) => f.name === "type_ref");
    formik.values.type_ref = dataReceived[0].value;
  };
  //#endregion

  //#region render html
  const renderSelectType = dataFormActions
    .filter((filter) => filter.renderName === "type")
    .map((x) => {
      let configsSelectType = x;
      configsSelectType.handleSelectData = handleSelect;

      return (
        <RenderFieldElements
          key={x.field + Math.random()}
          metadata={[configsSelectType]}
          renderName="type"
          formik={formik}
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
            <Title>{t("button.newcategory")}</Title>
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
                  {/* {renderSelectType} */}

                  <RenderFieldElements
                    metadata={dataFormActions}
                    // renderName={lang.code}
                    formik={formik}
                  />
                </Grid>
                {/** Dialog content submit button */}
                <Grid container item className="row actions">
                  <Button
                    type="submit"
                    disabled={submitting}
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
                  <Button
                    color="primary"
                    ref={refButtonClose}
                    onClick={handleCloseDrawer}
                  >
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
