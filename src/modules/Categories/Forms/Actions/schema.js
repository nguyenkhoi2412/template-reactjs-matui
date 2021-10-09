import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { siteState } from "@redux/providers/site.reducer";
import { langState } from "@redux/providers/lang.reducer";
import { TYPE_GET_BY_SITE, typeState } from "@redux/providers/type.reducer";
import { Helpers } from "@utils/helpers";
import renderForm from "@stores/render/dataForm";
import * as yup from "yup";
import React from "react";

export default {
  initialValues: (data) => {
    let objData = {};
    const isEdit = data !== null ? data._id : false;

    if (Helpers.checkIsNotNull(isEdit)) {
      objData = data;
    } else {
      const site = useSelector(siteState);

      objData = {
        title: {},
        description: {},
        ancestors: [],
        childrens: [],
        type_ref: "",
        site_ref: site.d._id,
      };
    }

    return objData;
  },
  dataForm: () => {
    const { t } = useTranslation();
    const site = useSelector(siteState);
    const type = useSelector(typeState);
    const lang = useSelector(langState);
    const dispatch = useDispatch();

    // TYPE_GET_BY_SITE
    React.useEffect(() => {
      dispatch(TYPE_GET_BY_SITE(site.d._id));
    }, []);

    let inputForms = [];

    // render select type
    let selectType = renderForm.select(
      0,
      "type_ref",
      "type_ref",
      t("site.types"),
      "type",
      false,
      false
    );

    type.d.map((t) => {
      selectType.dataOptions.push({
        id: t._id,
        value: t._id,
        text: t.name[lang.code],
        selected: type.d.length === 1 ? true : false,
      });
    });
    selectType.validations = yup.string().required(t("validate.required"));
    // selectType.validations = yup.array().min(1, t("validate.required"));

    // render input title
    const inputTitle = renderForm.input(
      1,
      "title",
      "title." + lang.code,
      t("site.title") + " [" + lang.code.toUpperCase() + "]",
      lang.code,
      true
    );
    inputTitle.validations = yup.string().required(t("validate.required"));

    // render input description
    const inputDescription = renderForm.input(
      3,
      "description",
      "description." + lang.code,
      t("site.description") + " [" + lang.code.toUpperCase() + "]",
      lang.code,
      false,
      "textarea"
    );

    // push all to array
    inputForms.push(selectType);
    inputForms.push(inputTitle);
    inputForms.push(inputDescription);

    //sort fields by index
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
