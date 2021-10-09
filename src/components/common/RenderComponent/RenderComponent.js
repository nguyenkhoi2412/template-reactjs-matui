import React from "react";
import Loadable from "react-loadable";
import { Helpers } from "@utils/helpers";

//#region loadable components
const AlertText = Loadable({
  loader: () => import("@components/common/AlertText"),
  loading: () => <Helpers.Spinner />,
});

const ActionType = Loadable({
  loader: () => import("@modules/Type/Forms/Actions"),
  loading: () => <Helpers.Spinner />,
});

const ActionSurveys = Loadable({
  loader: () => import("@modules/Surveys/Forms/Actions"),
  loading: () => <Helpers.Spinner />,
});

const ActionCategories = Loadable({
  loader: () => import("@modules/Categories/Forms/Actions"),
  loading: () => <Helpers.Spinner />,
});
//#endregion

const RenderComponent = (props) => {
  const components = {
    alertText: AlertText,
    actionType: ActionType,
    actionCategory: ActionCategories,
    actionSurvey: ActionSurveys,
  };

  const RenderComponent = components[props.component];

  const dataRecievedFromChild = (childData) => {
    props.containerReceivedData(childData);
  };

  // React.useEffect(() => {});

  return (
    <React.Fragment>
      <RenderComponent
        {...props}
        data={props.data || null}
        renderComponentReceivedData={dataRecievedFromChild}
      />
    </React.Fragment>
  );
};

export default RenderComponent;
