import * as yup from "yup";

export const SignupValidationSchema = yup.object({
  username: yup.string().min(3).max(20).required("Please enter your username"),
  email: yup
    .string()
    .lowercase()
    .email("Invalid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(30, "Password too long")
    .required("Please enter your password"),
});

export const SigninValidationSchema = yup.object({
  email: yup
    .string()
    .lowercase()
    .email("Invalid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .max(30, "Password too long")
    .required("Please enter your password"),
});

export const UserValidation = yup.object({
  username: yup.string().min(3).max(20).required("Please enter your username"),
  slug: yup.string().min(3).max(10).required("Please enter your slug"),
});
