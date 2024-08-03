import * as yup from "yup";

enum Role {
  User = "user",
  Admin = "admin",
}

enum Status {
  Active = "active",
  Blocked = "blocked",
}

type UpdateSchema = {
  email: string;
  name: string;
  role: "user" | "admin";
  status: "active" | "blocked";
};
type CreateSchema = UpdateSchema & {
  password: string;
  confirm_password: string;
};
export type SchemaType = CreateSchema;

export const updateSchema: yup.ObjectSchema<UpdateSchema> = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  name: yup.string().required("Name is required"),
  role: yup
    .mixed<Role>()
    .oneOf(Object.values(Role), "Invalid sex")
    .required("Role is required"),
  status: yup
    .mixed<Status>()
    .oneOf(Object.values(Status), "Invalid sex")
    .required("Status is required"),
});

export const createSchema: yup.ObjectSchema<SchemaType> = updateSchema.shape({
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export type PasswordSchemaType = {
  password: string;
  confirm_password: string;
};

export const passwordSchema: yup.ObjectSchema<PasswordSchemaType> = yup
  .object()
  .shape({
    password: yup.string().required("Password is required"),
    confirm_password: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
