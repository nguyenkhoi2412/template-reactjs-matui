import "./Drawer.scss";
import { useTranslation, Trans } from "react-i18next";
import { SwipeableDrawer, Tooltip } from "@material-ui/core";
import RenderComponent from "@components/common/RenderComponent";
import CloseIcon from "@material-ui/icons/Close";

const Drawer = React.forwardRef((props, ref) => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchor, setAnchor] = React.useState("bottom");
  const [drawerConfig, setDrawerConfig] = React.useState(props.configs);

  const toggleDrawer = (event, _anchor, open) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAnchor(_anchor);
    setState({ ...state, [_anchor]: open });
  };

  //#region callback event from parent
  React.useImperativeHandle(ref, () => ({
    openDrawer: (_event, _anchor, dConfig) => {
      setDrawerConfig(dConfig !== undefined ? dConfig : drawerConfig);

      toggleDrawer(_event, _anchor, true);
    },

    hideDrawer(_event, _anchor) {
      toggleDrawer(_event, anchor, false);
    },
  }));
  //#endregion

  const handleToggleDrawer = (dataReceived) => {
    if (dataReceived.hideDrawer) {
      toggleDrawer(
        dataReceived.event,
        dataReceived.anchor,
        !dataReceived.hideDrawer
      );
    }
  };

  return (
    <>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={(event) => toggleDrawer(event, anchor, false)}
        onOpen={(event) => toggleDrawer(event, anchor, true)}
      >
        {drawerConfig.showCloseIcon ? (
          <Tooltip title={<Trans>common.close</Trans>}>
            <CloseIcon
              className="drawer-close"
              color="action"
              fontSize="medium"
              onClick={(event) => toggleDrawer(event, anchor, false)}
            />
          </Tooltip>
        ) : (
          <></>
        )}
        <RenderComponent
          component={props.componentConfigs.component}
          data={props.componentConfigs.data}
          containerReceivedData={handleToggleDrawer}
        />
      </SwipeableDrawer>
    </>
  );
});

export default Drawer;
