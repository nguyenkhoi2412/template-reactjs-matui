export default {
  input: (
    tabIndex,
    id,
    field,
    label,
    renderName,
    autoFocus = false,
    type = "text",
    xs = 12,
    sm = 12
  ) => {
    return {
      tabIndex: tabIndex,
      id: id,
      field: field,
      type: type,
      label: label,
      // placeholder: "",
      // defaultValue: "",
      renderName: renderName,
      autoFocus: autoFocus,
      xs: xs,
      sm: sm,
    };
  },
  select: (
    tabIndex,
    id,
    field,
    label,
    renderName,
    showOptionEmpty = true,
    multiple = false,
    xs = 12,
    sm = 12
  ) => {
    return {
      tabIndex: tabIndex,
      id: id,
      field: field,
      type: "select",
      label: label,
      renderName: renderName,
      showOptionEmpty: showOptionEmpty,
      multiple: multiple,
      xs: xs,
      sm: sm,
      dataOptions: [],
    };
  },
};
