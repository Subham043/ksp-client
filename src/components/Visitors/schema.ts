import * as yup from "yup";

export type SchemaType = {
  name?: string | undefined;
  relation?: string | undefined;
  visitonDate?: string;
  additionalRemarks?: string | undefined;
};

export const initialValues: SchemaType = {
  name: undefined,
  relation: undefined,
  visitonDate: undefined,
  additionalRemarks: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object().shape({
  name: yup.string().typeError("Name must be a string").optional(),
  relation: yup.string().typeError("Relation must be a string").optional(),
  visitonDate: yup
    .string()
    .typeError("Visiting Date must be a string")
    .optional(),
  additionalRemarks: yup
    .string()
    .typeError("Additional Remarks must be a string")
    .optional(),
});
