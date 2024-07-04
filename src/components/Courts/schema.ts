import * as yup from "yup";

export type SchemaType = {
  courtName: string;
  ccScNo?: string;
  psName?: string;
  firNo?: string;
  // hearingDate?: string;
  // nextHearingDate?: string;
  // attendance?: string;
  lawyerName?: string;
  lawyerContact?: string;
  suretyProviderDetail?: string;
  suretyProviderContact?: string;
  stageOfCase?: string;
  additionalRemarks?: string;
  criminalId?: number;
  crimeId?: number;
};

export const initialValues: SchemaType = {
  courtName: "",
  ccScNo: undefined,
  psName: undefined,
  firNo: undefined,
  // hearingDate: undefined,
  // nextHearingDate: undefined,
  // attendance: undefined,
  lawyerName: undefined,
  lawyerContact: undefined,
  suretyProviderDetail: undefined,
  suretyProviderContact: undefined,
  stageOfCase: undefined,
  additionalRemarks: undefined,
  criminalId: undefined,
  crimeId: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object({
  courtName: yup
    .string()
    .typeError("Court Name must be a string")
    .required("Court Name is required"),
  ccScNo: yup.string().typeError("CC/SC No. must be a string").optional(),
  psName: yup.string().typeError("PS Name must be a string").optional(),
  firNo: yup.string().typeError("FIR No. must be a string").optional(),
  // hearingDate: yup
  //   .string()
  //   .typeError("Hearing Date must be a string")
  //   .optional(),
  // nextHearingDate: yup
  //   .string()
  //   .typeError("Next Hearing Date must be a string")
  //   .optional(),
  // attendance: yup.string().typeError("Attendance must be a string").optional(),
  lawyerName: yup.string().typeError("Lawyer Name must be a string").optional(),
  lawyerContact: yup
    .string()
    .typeError("Lawyer Contact must be a string")
    .optional(),
  suretyProviderDetail: yup
    .string()
    .typeError("Surety Provider Detail must be a string")
    .optional(),
  suretyProviderContact: yup
    .string()
    .typeError("Surety Provider Contact must be a string")
    .optional(),
  stageOfCase: yup
    .string()
    .typeError("Stage Of Case must be a string")
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
