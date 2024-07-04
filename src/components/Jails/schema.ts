import * as yup from "yup";

export type SchemaType = {
  lawSection?: string;
  policeStation?: string;
  jailName?: string;
  jailId?: string;
  prisonerId?: string;
  prisonerType?: string;
  ward?: string;
  barrack?: string;
  registerNo?: string;
  periodUndergone?: string;
  firstAdmissionDate?: string;
  jailEntryDate?: string;
  jailReleaseDate?: string;
  utpNo?: string;
  additionalRemarks?: string;
  criminalId?: number;
  crimeId?: number;
};

export const initialValues: SchemaType = {
  lawSection: undefined,
  policeStation: undefined,
  jailName: undefined,
  jailId: undefined,
  prisonerId: undefined,
  prisonerType: undefined,
  ward: undefined,
  barrack: undefined,
  registerNo: undefined,
  periodUndergone: undefined,
  firstAdmissionDate: undefined,
  jailEntryDate: undefined,
  jailReleaseDate: undefined,
  utpNo: undefined,
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
  jailName: yup.string().typeError("Jail Name must be a string").optional(),
  jailId: yup.string().typeError("Jail Id must be a string").optional(),
  prisonerId: yup.string().typeError("Prisoner Id must be a string").optional(),
  prisonerType: yup
    .string()
    .typeError("Prisoner Type must be a string")
    .optional(),
  ward: yup.string().typeError("Ward must be a string").optional(),
  barrack: yup.string().typeError("Barrack must be a string").optional(),
  registerNo: yup
    .string()
    .typeError("Register No. must be a string")
    .optional(),
  periodUndergone: yup
    .string()
    .typeError("Period Undergone must be a string")
    .optional(),
  firstAdmissionDate: yup
    .string()
    .typeError("First Admission Date must be a string")
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
