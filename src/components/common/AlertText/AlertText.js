import { useDispatch } from "react-redux";
import { Helpers } from "@utils/helpers";

const AlertText = (props) => {
  const type = props.data.type;
  const dispatch = useDispatch();
  switch (type) {
    case "TYPE_DELETE":
      
      break;

    // case "DELETE_CUSTOMER":
    //   React.useEffect(() => {
    //     if (props.submitClicked) {
    //       dispatch(FETCHING_CUSTOMER());

    //       const customer = props.data.customer;
    //       dispatch(DELETE_CUSTOMER(customer));

    //       props.renderComponentReceivedData({
    //         submitClicked: false,
    //         closeDialog: true,
    //       });
    //     }
    //   }, [props.submitClicked]);
    //   break;

    default:
      break;
  }

  return (
    <React.Fragment>
      <span>{props.data.content}</span>
    </React.Fragment>
  );
};

export default AlertText;
