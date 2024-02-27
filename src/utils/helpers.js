import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email("invalidEmail").required("requiredEmail"),
  country: yup.string().required(),
  city: yup.string().required(),
  house: yup.string().required(),
  code: yup.string().required(),
});
