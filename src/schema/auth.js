import * as yup from "yup";
import { Trans } from "react-i18next";

export const authSchema = () => {
  return yup.object({
    username: yup.string().required(<Trans>signin.enterusername</Trans>),
    password: yup.string().required(<Trans>signin.enterpassword</Trans>),
  });
};
