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
    let surveys = {};
    const isEdit = data !== null ? data._id : false;

    if (Helpers.checkIsNotNull(isEdit)) {
      surveys = data;
    } else {
      surveys = {
        _id: null,
        title: {},
        sub_title: {},
        description: {},
        type_id: "",
      };
    }

    return surveys;
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
    let listType = {
      tabIndex: 0,
      id: "type_id",
      field: "type_id",
      label: "Type",
      type: "select",
      renderName: "type",
      xs: 12,
      sm: 12,
      className: "select-container",
      data: [],
    };

    type.d.map((t) => {
      listType.data.push({
        id: t._id,
        value: t._id,
        text: t.name[lang.code],
        selected: false,
      });
    });
    inputForms.push(listType);

    // render input title, description, sub_title
    const inputTitle = renderForm.input(
      1,
      "title",
      "title." + lang.code,
      t("site.title") + " [" + lang.code.toUpperCase() + "]",
      lang.code
    );
    inputTitle.validations = yup.string().required(t("validate.required"));

    const inputSubTitle = renderForm.input(
      2,
      "sub_title",
      "sub_title" + lang.code,
      t("article.sub_title") + " [" + lang.code.toUpperCase() + "]",
      lang.code
    );

    const inputDescription = renderForm.input(
      3,
      "description",
      "description." + lang.code,
      t("article.description") + " [" + lang.code.toUpperCase() + "]",
      lang.code,
      "textarea"
    );
    inputDescription.validations = yup
      .string()
      .required(t("validate.required"));

    inputForms.push(inputTitle);
    inputForms.push(inputSubTitle);
    inputForms.push(inputDescription);

    //sort fields
    inputForms.sort((a, b) => (a.tabIndex > b.tabIndex ? 1 : -1));
    return inputForms;
  },
};
