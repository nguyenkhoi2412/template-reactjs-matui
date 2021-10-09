import "./DropdownButtonSelect.scss";
import { FormControl, Button, Select, MenuItem } from "@material-ui/core";

import store from "@utils/store";
import { useEffect } from "react";

const DropdownButtonSelect = (props) => {
  const [order, setOrder] = React.useState(props.order);
  const taskTodos = store.TASK_TODOS();

  useEffect(() => {
    setOrder(props.order);
  }, [props.order]);

  const handleChangeTask = (e) => {
    setOrder({
      ...order,
      todo: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <div
        data-id={"order" + order.id}
        className="dropdown-btn-select"
        data-todo={order.todo}
      >
        <Button variant="contained">
          {order.name}
          <small>01/05/2021</small>
        </Button>
        <FormControl className="fc_Select">
          <Select onChange={handleChangeTask} value={order.todo} displayEmpty>
            {taskTodos.map((task, indexTask) => (
              <MenuItem key={task.id + task.todo} value={task.todo}>
                {task.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </React.Fragment>
  );
};
export default DropdownButtonSelect;
