import "./ControlSelect.scss";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import { Helpers } from "@utils/helpers";
import { FormControl, MenuItem } from "@material-ui/core";

const ControlSelect = ({ metadata, formik }) => {
  let select = metadata;
  // const errorMessage = Helpers.getValueObjects(
  //   formik,
  //   "errors." + select.field
  // );
  // const isError = errorMessage !== undefined;
  // const defaultValue = Helpers.getValueObjects(
  //   formik,
  //   "values." + select.field
  // );

  // const [isValidate, setIsValidate] = React.useState(isError);

  const showOptionEmpty =
    select.showOptionEmpty !== undefined ? select.showOptionEmpty : true;
  const isMultiple = select.multiple !== undefined ? select.multiple : false;

  //funtions callback
  const dataSelectedCalllback = (name, value) => {
    const arraySelected = [];

    // check & assign a string to array
    let newValue = [];
    if (isMultiple) newValue = value;
    else newValue.push(value);

    newValue.map((v) => {
      if (v.name === undefined) {
        arraySelected.push({
          name: name,
          value: v,
          text:
            v === 0 || v === ""
              ? ""
              : select.dataOptions.filter((f) => f.value === v)[0].text,
        });
      } else {
        arraySelected.push(v);
      }
    });

    return arraySelected;
  };

  const [formState, setFormState] = React.useState({
    [select.field]: isMultiple ? [] : "",
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    e.persist();
    setFormState((formState) => ({
      ...formState,
      [name]: e.target.type === "checkbox" ? e.target.checked : value,
    }));
    
    // // check is error after submit
    //  if (isError) {
    //    if(Helpers.checkIsNotNull(value)){
    //     const newCar = Object.keys(formik.errors).reduce((object, key) => {
    //       if (key !== select.field) {
    //         object[key] = formik.errors[key]
    //       }
    //       return object
    //     }, {})
    //     formik.errors = newCar;
    //    }
    //    setIsValidate(!Helpers.checkIsNotNull(value));
    //  }

    // console.log(formik.values);

    // pass data return to parents
    select.handleSelectData(dataSelectedCalllback(name, value));
  };

  return (
    <React.Fragment key={select.field + "_" + Math.random()}>
      <RenderGridContainer configs={select}>
        <FormControl className="form-control">
          <TextField
            select
            name={select.field}
            id={select.id}
            label={select.label}
            // error={isValidate}
            // helperText={isValidate ? errorMessage : select.helperText}
            SelectProps={{
              multiple: isMultiple,
              value: formState[select.field],
              onChange: handleFieldChange,
            }}
          >
            {showOptionEmpty || select.dataOptions.length === 0 ? (
              <MenuItem key={""} value={""}>
                <em>
                  {select.placeholder === undefined
                    ? "None"
                    : select.placeholder}
                </em>
              </MenuItem>
            ) : (
              ""
            )}
            {select.dataOptions.map((v) => (
              <MenuItem key={"menuItem_" + v.value} value={v.value}>
                {v.text}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </RenderGridContainer>
    </React.Fragment>
  );
};

export default ControlSelect;

const RenderGridContainer = (props) => {
  return (
    <Grid
      item
      xs={props.configs.xs}
      sm={props.configs.sm}
      className={props.configs.className}
    >
      {props.children}
    </Grid>
  );
};
