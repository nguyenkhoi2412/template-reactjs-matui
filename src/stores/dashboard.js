//import { useTranslation } from "react-i18next";
import HttpIcon from "@material-ui/icons/Http";
import MergeTypeIcon from "@material-ui/icons/MergeType";
import CategoryIcon from "@material-ui/icons/Category";
import AssignmentIcon from "@material-ui/icons/Assignment";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

export default {
  secondaryMenu: (pathName) => {
    return [
      {
        name: "site",
        text: "Site management",
        childs: [
          {
            icon: <HttpIcon fontSize="small" />,
            name: "Site",
            path: "/dashboard/site",
            active: "/dashboard/site" === pathName ? true : false,
          },
        ],
      },
      {
        name: "type",
        text: "Type management",
        childs: [
          {
            icon: <MergeTypeIcon fontSize="small" />,
            name: "Types",
            path: "/dashboard/type",
            active: "/dashboard/type" === pathName ? true : false,
          },
          {
            icon: <CategoryIcon fontSize="small" />,
            name: "Categories",
            path: "/dashboard/type/categories",
            active: "/dashboard/type/categories" === pathName ? true : false,
          },
          {
            icon: <AssignmentIcon fontSize="small" />,
            name: "Surveys",
            path: "/dashboard/type/surveys",
            active: "/dashboard/type/surveys" === pathName ? true : false,
          },
          {
            icon: <QuestionAnswerIcon fontSize="small" />,
            name: "Questions",
            path: "/dashboard/type/questions",
            active: "/dashboard/type/questions" === pathName ? true : false,
          },
        ],
      },
    ];
  },
};
