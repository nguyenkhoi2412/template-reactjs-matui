import React from "react";
import { Helpers } from "@utils/helpers";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const RenderFieldElements = ({ metadata, formik, renderName = "" }) => {
  const builder = (individualConfig) => {
    const { type, field } = individualConfig;

    const formikObj = formik;
    const errorMessage = Helpers.getValueObjects(formikObj, "errors." + field);
    const isError = errorMessage !== undefined;
    const defaultValue = Helpers.getValueObjects(formikObj, "values." + field);

    switch (type) {
      case "text":
      case "number":
      case "hidden":
      case "textarea":
        return (
          <React.Fragment key={field}>
            <RenderGridContainer config={individualConfig}>
              <TextField
                type={type}
                name={field}
                className="form-control"
                label={individualConfig.label}
                multiline={type === "textarea" ? true : false}
                // defaultValue={defaultValue === undefined ? "" : defaultValue}
                value={defaultValue === undefined ? "" : defaultValue}
                style={{ ...individualConfig.style }}
                error={isError}
                onChange={formik.handleChange}
                helperText={
                  isError ? errorMessage : individualConfig.helperText
                }
                autoFocus={individualConfig.autoFocus}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </RenderGridContainer>
          </React.Fragment>
        );

      case "select":
        // const [valueState, setValueState] = React.useState(defaultValue);

        // //funtions callback
        // const dataSelectedCalllback = (name, value) => {
        //   const arraySelected = [];

        //   // check & assign a string to array
        //   // let newValue = [];
        //   // if (isMultiple) newValue = value;
        //   // else newValue.push(value);

        //   let newValue = [];
        //   newValue.push(value);

        //   newValue.map((v) => {
        //     if (v.name === undefined) {
        //       arraySelected.push({
        //         name: name,
        //         value: v,
        //         text:
        //           v === 0 || v === ""
        //             ? ""
        //             : individualConfig.dataOptions.filter(
        //                 (f) => f.value === v
        //               )[0].text,
        //       });
        //     } else {
        //       arraySelected.push(v);
        //     }
        //   });

        //   return arraySelected;
        // };

        // const handleFieldChange = React.useCallback((e) => {
        //   const { name, value } = e.target;
        //   console.log("handleFieldChange", value);
        //   //e.persist();
        //   setValueState(
        //     e.target.type === "checkbox" ? e.target.checked : value
        //   );

        //   // // check is error after submit
        //   //  if (isError) {
        //   //    if(Helpers.checkIsNotNull(value)){
        //   //     const newCar = Object.keys(formik.errors).reduce((object, key) => {
        //   //       if (key !== select.field) {
        //   //         object[key] = formik.errors[key]
        //   //       }
        //   //       return object
        //   //     }, {})
        //   //     formik.errors = newCar;
        //   //    }
        //   //    setIsValidate(!Helpers.checkIsNotNull(value));
        //   //  }

        //   // console.log(formik.values);

        //   // pass data return to parents
        //   formik.handleChange(e);
        //   individualConfig.handleSelectData(dataSelectedCalllback(name, value));
        // }, []);

        return (
          <React.Fragment key={field}>
            <RenderGridContainer config={individualConfig}>
              <FormControl className="form-control">
                <TextField
                  select
                  name={individualConfig.field}
                  id={individualConfig.id}
                  label={individualConfig.label}
                  error={isError}
                  helperText={
                    isError ? errorMessage : individualConfig.helperText
                  }
                  SelectProps={{
                    multiple: individualConfig.multiple || false,
                    value: defaultValue,
                    onChange: formik.handleChange,
                  }}
                >
                  {individualConfig.showOptionEmpty ||
                  individualConfig.dataOptions.length === 0 ? (
                    <MenuItem key={""} value={""}>
                      <em>
                        {individualConfig.placeholder === undefined
                          ? "None"
                          : individualConfig.placeholder}
                      </em>
                    </MenuItem>
                  ) : (
                    ""
                  )}
                  {individualConfig.dataOptions.map((v) => (
                    <MenuItem key={"menuItem_" + v.value} value={v.value}>
                      {v.text}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </RenderGridContainer>
          </React.Fragment>
        );

      case "array":
        return (
          <React.Fragment key={field}>
            <RenderFieldElements
              metadata={individualConfig.children || []}
              formik={formik}
            />
          </React.Fragment>
        );

      default:
        return <div key={field}>Unsupported field</div>;
    }
  };

  return (
    <>
      {renderName === ""
        ? metadata.map((c) => {
            return builder(c);
          })
        : metadata
            .filter((f) => f.renderName === renderName)
            .map((c) => {
              return builder(c);
            })}
    </>
  );
};

export default RenderFieldElements;

const RenderGridContainer = (props) => {
  if (props.config.type === "hidden") {
    return <div className={props.config.className}>{props.children}</div>;
  }

  return (
    <Grid
      item
      xs={props.config.xs}
      sm={props.config.sm}
      className={props.config.className}
    >
      {props.children}
    </Grid>
  );
};
