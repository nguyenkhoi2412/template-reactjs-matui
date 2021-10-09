import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { siteState } from "@redux/providers/site.reducer";
import { langState } from "@redux/providers/lang.reducer";
import { Helpers } from "@utils/helpers";
import renderForm from "@stores/render/dataForm";
import * as yup from "yup";

export default {
  initialValues: (data) => {
    const site = useSelector(siteState);
    let type = {};

    let isEdit = data !== null ? data._id : false;

    if (Helpers.checkIsNotNull(isEdit)) {
      type = data;
    } else {
      type = {
        site_ref: site.d._id,
        name: {},
        axact: false,
        public: false,
        path: "",
        component_import: "",
      };
    }

    return type;
  },
  dataForm: () => {
    const { t } = useTranslation();
    const lang = useSelector(langState);
    let inputForms = [];

    const input = renderForm.input(
      1,
      "name",
      "name." + lang.code,
      t("site.title") + "[" + lang.code.toUpperCase() + "]",
      "lang" + lang.code
    );
    input.validations = yup.string().required(t("validate.required"));
    input.autoFocus = true;

    inputForms.push(input);

    return inputForms;
  },
};
