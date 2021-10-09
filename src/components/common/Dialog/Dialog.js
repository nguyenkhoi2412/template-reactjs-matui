import "./Dialog.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import Transition from "@components/common/Transition";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import RenderComponent from "@components/common/RenderComponent";
import { Helpers } from "@utils/helpers";

const ModalDialog = React.forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();

  //#region state & configs
  const dialogConfig = props.configs;

  const [openDialog, setOpenDialog] = React.useState(false);
  const [fadein, setFadein] = React.useState(false);
  const [submiting, setSubmiting] = React.useState(false);

  const cancelText = dialogConfig.cancelText || t("common.cancel");
  const submitText = dialogConfig.submitText || t("common.save");
  //#endregion

  const handleCloseDialog = () => {
    setFadein(false);
    setOpenDialog(false);
  };

  const handleSubmitDialog = () => {
    setSubmiting(true);
    Helpers.simulateNetworkRequest(400).then(() => {
      setSubmiting(false);
    });

    dialogConfig.callback();
  };

  const dataReceived = (dataReceived) => {
    if (dataReceived.closeDialog) {
      setFadein(false);
      setOpenDialog(false);
    }
  };

  //#region callback event from parent
  React.useImperativeHandle(ref, () => ({
    openDialog() {
      //setDialogConfig(config);
      setFadein(true);
      setOpenDialog(true);
    },

    closeDialog() {
      handleCloseDialog();
    },
  }));
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
          <DialogContent spacing={3}>
            {props.componentConfigs ? (
              <RenderComponent
                component={props.componentConfigs.component}
                data={props.componentConfigs.data}
                containerReceivedData={dataReceived}
              />
            ) : (
              <></>
            )}
          </DialogContent>

          {dialogConfig.footerActions ? (
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                {cancelText}
              </Button>
              <Button
                onClick={() => handleSubmitDialog()}
                color="primary"
                disabled={submiting}
              >
                {submitText}
              </Button>
            </DialogActions>
          ) : (
            <></>
          )}
        </Dialog>
      </Transition>
    </>
  );
});

export default ModalDialog;
