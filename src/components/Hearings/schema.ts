import * as yup from "yup";

export type SchemaType = {
  judgeName?: string | undefined;
  actionCode?: string | undefined;
  attendance?: string | undefined;
  hearingDate?: string;
  nextHearingDate?: string;
  additionalRemarks?: string | undefined;
};

export const initialValues: SchemaType = {
  judgeName: undefined,
  actionCode: undefined,
  attendance: undefined,
  hearingDate: undefined,
  nextHearingDate: undefined,
  additionalRemarks: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object().shape({
  judgeName: yup.string().typeError("Judge Name must be a string").optional(),
  actionCode: yup.string().typeError("Action Code must be a string").optional(),
  attendance: yup.string().typeError("Attendance must be a string").optional(),
  hearingDate: yup
    .string()
    .typeError("Hearing Date must be a string")
    .optional(),
  nextHearingDate: yup
    .string()
    .typeError("Next Hearing Date must be a string")
    .optional(),
  additionalRemarks: yup
    .string()
    .typeError("Additional Remarks must be a string")
    .optional(),
});
