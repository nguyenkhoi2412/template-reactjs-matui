import "./Transition.scss";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

const Transition = (props) => {
  const [type, setType] = React.useState(
    props.type !== undefined ? props.type : "fade"
  );
  let transition = <></>;

  switch (type) {
    case "grow":
      transition = <Grow {...props}>{props.children}</Grow>;
      break;

    case "slide":
      transition = <Slide {...props}>{props.children}</Slide>;
      break;

    case "zoom":
      transition = <Zoom {...props}>{props.children}</Zoom>;
      break;

    case "collapse":
      transition = <Collapse {...props}>{props.children}</Collapse>;
      break;

    default:
      transition = <Fade {...props}>{props.children}</Fade>;
      break;
  }

  return <>{transition}</>;
};

export default Transition;
