import "./ModalDialog.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import Transition from "@components/common/Transition";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RenderComponent from "@components/common/RenderComponent";
// import Slide from "@material-ui/core/Slide";

// const Transition = React.forwardRef(function Transition(props, ref, {children}) {
//   return <Slide direction={props.direction !== undefined ? props.direction : "down"} ref={ref} {...props}>{children}</Slide>;
// });

const ModalDialog = React.forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  //#region state & configs
  const [openDialog, setOpenDialog] = React.useState(false);
  const [submitClicked, setSubmitClicked] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState(props.dialogConfig);
  const [fadein, setFadein] = React.useState(false);

  const componentConfig = {
    component: dialogConfig.component.name || null,
    data: dialogConfig.component.data || null,
    submitClicked: submitClicked,
  };

  const cancelText = dialogConfig.cancelText || t("common.cancel");
  const submitText = dialogConfig.submitText || t("common.save");
  //#endregion

  const handleCloseDialog = () => {
    setFadein(false);
    setOpenDialog(false);
  };

  const changeStatusSubmited = (dataReceived) => {
    setSubmitClicked(dataReceived.submitClicked);
    if (dataReceived.closeDialog) {
      setFadein(false);
      setOpenDialog(false);
    }
  };

  //#region callback event from parent
  React.useImperativeHandle(ref, () => ({
    openDialog(config) {
      setDialogConfig(config);
      setFadein(true);
      setOpenDialog(true);
    },
  }));
  //#endregion

  //#region render html content
  //#region button submit
  let buttonSaveRender;
  if (submitClicked) {
    buttonSaveRender = (
      <Button color="primary" disabled={submitClicked}>
        {submitText}
      </Button>
    );
  } else {
    buttonSaveRender = (
      <Button onClick={() => setSubmitClicked(true)} color="primary">
        {submitText}
      </Button>
    );
  }
  //#endregion

  //#region component content
  let renderComponent;
  if (componentConfig.component != null) {
    renderComponent = (
      <RenderComponent
        componentConfig={componentConfig}
        containerReceivedData={changeStatusSubmited}
      />
    );
  } else {
    renderComponent = componentConfig.contentText;
  }
  //#endregion
  //#endregion

  return (
    <>
      <Transition
        in={fadein}
        direction={dialogConfig.direction}
        type={dialogConfig.transition}
      >
        <Dialog
          open={openDialog}
          keepMounted
          onClose={handleCloseDialog}
          aria-labelledby="form-dialog-title"
          className={dialogConfig.className}
          maxWidth={dialogConfig.maxWidth ? dialogConfig.maxWidth : "sm"}
        >
          <DialogTitle id="form-dialog-title">{dialogConfig.title}</DialogTitle>
          <DialogContent spacing={3}>{renderComponent}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              {cancelText}
            </Button>
            {buttonSaveRender}
          </DialogActions>
        </Dialog>
      </Transition>
    </>
  );
});

export default ModalDialog;
