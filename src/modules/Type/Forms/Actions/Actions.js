import "./Actions.scss";
import { useTranslation } from "react-i18next";
//#region material-ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
//#endregion
//#region useHook

//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import {
  TYPE_INSERT_NEW,
  TYPE_UPDATE,
  typeState,
} from "@redux/providers/type.reducer";
import { TOGGLE_SNACKBAR_ALERT } from "@components/common/Snackbar/snackbar.reducer";
//#endregion
import { useFormik } from "formik";
import typeSchema from "./TypeSchema";
import { getYupSchemaFromMetaData } from "@utils/yupSchemaCreator.js";
import RenderFieldElements from "@components/common/RenderFieldElements";
import { Helpers } from "@utils/helpers";
import React from "react";

const ActionType = (props) => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = React.useState(false);
  const dispatch = useDispatch();
  const type = useSelector(typeState);

  //#region useEffect
  React.useEffect(() => {
    // close dialog form when submitted
    if (!type.isFetching && submitting) {
      if (type.ok) {
        // return params to close dialog when success
        props.renderComponentReceivedData({
          closeDialog: true,
        });

        //Show message when insert success
        dispatch(
          TOGGLE_SNACKBAR_ALERT({
            open: true,
            message: type.message,
          })
        );
      } else {
        //Show message when insert fail
        dispatch(
          TOGGLE_SNACKBAR_ALERT({
            open: true,
            message: type.message,
            severity: "error",
          })
        );
      }
      handleResetForm();
      setSubmitting(false);
    }
  }, [type]);
  //#endregion
  //#region function event
  const handleCloseDialog = () => {
    // close dialog
    props.renderComponentReceivedData({
      closeDialog: true,
    });
  };

  // reset form
  const handleResetForm = () => {
    formik.resetForm();
  };
  //#endregion

  const initialValues = typeSchema.initialValues(props.data);
  const dataForm = typeSchema.dataForm();
  const [enableValidation, setEnableValidation] = React.useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validate: (values) => {
      // reset button click status
      props.renderComponentReceivedData({
        submitClicked: false,
        closeDialog: false,
      });
    },
    validationSchema: getYupSchemaFromMetaData(dataForm),
    validateOnChange: enableValidation,
    validateOnBlur: enableValidation,
    onSubmit: (values) => {
      setSubmitting(true);

      Helpers.simulateNetworkRequest(400).then(() => {
        // for UPDATE
        if (Helpers.checkIsNotNull(initialValues._id)) {
          values = Helpers.diffObjects(values, initialValues);
          values._id = initialValues._id;

          dispatch(TYPE_UPDATE(values));
        } else dispatch(TYPE_INSERT_NEW(values)); // for INSERT NEW
      });
    },
  });

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        className="form col-2-fields"
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
            <RenderFieldElements metadata={dataForm} formik={formik} />
          </Grid>
          {/** Dialog content submit button */}
          <Grid container item className="row actions">
            <Button
              type="submit"
              disabled={submitting}
              variant="contained"
              color="primary"
            >
              {type.isFetching ? t("common.saving") : t("common.save")}
            </Button>
            <Button type="reset" variant="contained" onClick={handleResetForm}>
              {t("common.reset")}
            </Button>
            <Button color="primary" onClick={handleCloseDialog}>
              {t("common.close")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ActionType;
