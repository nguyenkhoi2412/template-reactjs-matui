import { combineReducers } from "redux";
//#region helpers
import backdropSpinReducer from "@components/common/BackdropSpin/backdropSpin.reducer";
import snackbarReducer from "@components/common/Snackbar/snackbar.reducer";
import linearReducer from "@components/common/Linear/linear.reducer";
//#endregion
import authReducer from "@redux/providers/auth.reducer";
import siteReducer from "@redux/providers/site.reducer";
import typeReducer from "@redux/providers/type.reducer";
import categoryReducer from "@redux/providers/category.reducer";
import currentMenuReducer from "@redux/utils/currentMenu.reducer";
import langReducer from "@redux/providers/lang.reducer";

const rootReducer = combineReducers({
  backdropSpin: backdropSpinReducer,
  snackbar: snackbarReducer,
  linear: linearReducer,
  auth: authReducer,
  site: siteReducer,
  type: typeReducer,
  category: categoryReducer,
  currentMenu: currentMenuReducer,
  lang: langReducer,
});

export default rootReducer;
