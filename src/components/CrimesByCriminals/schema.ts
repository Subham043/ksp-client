import * as yup from "yup";

export type SchemaType = {
  aliases?: string | undefined;
  ageWhileOpening?: string | undefined;
  crimeArrestOrder?: string | undefined;
  criminalId?: number;
};

export const initialValues: SchemaType = {
  aliases: undefined,
  ageWhileOpening: undefined,
  crimeArrestOrder: undefined,
  criminalId: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object().shape({
  aliases: yup.string().typeError("Aliases must be a string").optional(),
  ageWhileOpening: yup
    .string()
    .typeError("Age While Opening must be a string")
    .optional(),
  crimeArrestOrder: yup
    .string()
    .typeError("Crime Arrest Order must be a string")
    .optional(),
  criminalId: yup
    .number()
    .typeError("Criminal Id must be number")
    .required("Criminal Id is required"),
});
