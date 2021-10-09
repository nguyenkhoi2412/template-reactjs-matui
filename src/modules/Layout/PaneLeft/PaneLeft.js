import "./PaneLeft.scss";
import React from "react";
import { Link } from "react-router-dom";
//#region material-ui
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import HttpIcon from "@material-ui/icons/Http";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
//#endregion
//#region redux
import { useDispatch, useSelector } from "react-redux";
import { GET_BY_SITE, typeState } from "@redux/providers/type.reducer";
import { langState } from "@redux/providers/lang.reducer";
import {
  UPDATE_MENU_ACTIVE,
  currentMenuState,
} from "@redux/utils/currentMenu.reducer";
import dashboard from "@stores/dashboard";
//#endregion

const PaneLeft = () => {
  //#region declares variable
  const dispatch = useDispatch();
  const type = useSelector(typeState);
  const currentMenu = useSelector(currentMenuState);
  //#endregion

  //#region useHooks
  // React.useEffect(() => {
  //   if ((currentMenu.topMenu !== "") & (currentMenu.topMenu !== undefined)) {
  //     dispatch(GET_BY_SITE(currentMenu.topMenu));
  //   }
  // }, [currentMenu.topMenu]);
  //#endregion

  //#region callback event
  //#endregion

  //#region render html content
  return (
    <>
      <MuiAccordion dataType={type.d} />
    </>
  );
  //#endregion
};

export default PaneLeft;

const MuiAccordion = (props) => {
  const [dataType, setDataType] = React.useState([]);
  const [expanded, setExpanded] = React.useState("type");
  const language = useSelector(langState);

  const secondaryMenu = dashboard.secondaryMenu(window.location.pathname);

  //#region callback event
  const handleChange = (panel) => (event, expanded) => {
    setExpanded(expanded ? panel : false);
  };

  return (
    <>
      {secondaryMenu.map((menu) => {
        return (
          <Accordion
            key={menu.name}
            square
            expanded
            // expanded={expanded === menu.name}
            // onChange={handleChange(menu.name)}
          >
            <AccordionSummary
              className="header"
              aria-controls="site-content"
              id="site-header"
            >
              <Typography>{menu.text}</Typography>
            </AccordionSummary>
            <AccordionDetails className="content">
              <MenuList>
                {menu.childs.map((mChild) => {
                  return (
                    <MenuItem
                      key={mChild.path}
                      className={mChild.active ? "active" : ""}
                    >
                      <ListItemIcon>{mChild.icon}</ListItemIcon>
                      <Typography variant="inherit">
                        <Link to={mChild.path}>{mChild.name}</Link>
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};
