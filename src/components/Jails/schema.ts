import * as yup from "yup";

export type SchemaType = {
  lawSection?: string;
  policeStation?: string;
  jailEntryDate?: string;
  jailReleaseDate?: string;
  utpNo?: string;
  jailVisitorDetail?: string;
  visitorRelationship?: string;
  additionalRemarks?: string;
  criminalId?: number;
  crimeId?: number;
};

export const initialValues: SchemaType = {
  lawSection: undefined,
  policeStation: undefined,
  jailEntryDate: undefined,
  jailReleaseDate: undefined,
  utpNo: undefined,
  jailVisitorDetail: undefined,
  visitorRelationship: undefined,
  additionalRemarks: undefined,
  criminalId: undefined,
  crimeId: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object({
  lawSection: yup.string().typeError("Law Section must be a string").optional(),
  policeStation: yup
    .string()
    .typeError("Police Station must be a string")
    .optional(),
  jailEntryDate: yup
    .string()
    .typeError("Jail Entry Date must be a string")
    .optional(),
  jailReleaseDate: yup
    .string()
    .typeError("Jail Release Date must be a string")
    .optional(),
  utpNo: yup.string().typeError("UTP No. must be a string").optional(),
  jailVisitorDetail: yup
    .string()
    .typeError("Jail Visitor Detail must be a string")
    .optional(),
  visitorRelationship: yup
    .string()
    .typeError("Visitor Relationship must be a string")
    .optional(),
  additionalRemarks: yup
    .string()
    .typeError("Additional Remarks must be a string")
    .optional(),
  criminalId: yup
    .number()
    .typeError("Criminal Id must be number")
    .required("Criminal Id is required"),
  crimeId: yup
    .number()
    .typeError("Crime Id must be number")
    .required("Crime Id is required"),
});
