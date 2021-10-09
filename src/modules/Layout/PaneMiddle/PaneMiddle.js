import "./PaneMiddle.scss";
import Type from "@modules/Type";
import Categories from "@modules/Categories";
import Articles from "@modules/Articles";
import Surveys from "@modules/Surveys";
import Questions from "@modules/Questions";

const PaneMiddle = () => {
  const components = {
    "/dashboard/type": <Type />,
    "/dashboard/type/categories": <Categories />,
    "/dashboard/type/articles": <Articles />,
    "/dashboard/type/surveys": <Surveys />,
    "/dashboard/type/questions": <Questions />,
  };

  return (
    <div className="pane-middle-container">
      {components[window.location.pathname]}
    </div>
  );
};

export default PaneMiddle;
