import * as yup from "yup";

enum Sex {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}

enum RelationType {
  Father = "Father",
  Husband = "Husband",
  Mother = "Mother",
  Wife = "Wife",
}

export type SchemaType = {
  name: string;
  sex: "Male" | "Female" | "Others";
  permanent_address?: string | undefined;
  present_address?: string | undefined;
  phone?: string | undefined;
  aadhar_no?: string | undefined;
  aadhar_photo?: File | undefined;
  photo?: File | undefined;
  relation_name?: string | undefined;
  relation_type?: "Father" | "Husband" | "Mother" | "Wife" | undefined;
  caste?: string | undefined;
  fpb_sl_no?: string | undefined;
  fpb_classn_no?: string | undefined;
  occupation?: string | undefined;
  educational_qualification?: string | undefined;
  native_ps?: string | undefined;
  native_district?: string | undefined;
};

export const initialValues: SchemaType = {
  name: "",
  sex: "Male",
  permanent_address: undefined,
  present_address: undefined,
  phone: undefined,
  aadhar_no: undefined,
  aadhar_photo: undefined,
  photo: undefined,
  relation_name: undefined,
  relation_type: undefined,
  caste: undefined,
  fpb_sl_no: undefined,
  fpb_classn_no: undefined,
  occupation: undefined,
  educational_qualification: undefined,
  native_ps: undefined,
  native_district: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object({
  name: yup
    .string()
    .typeError("Name must be a string")
    .required("Name is required"),
  permanent_address: yup
    .string()
    .typeError("Permanent Address must be a string")
    .optional(),
  present_address: yup
    .string()
    .typeError("Present Address must be a string")
    .optional(),
  phone: yup.string().typeError("Phone must be a string").optional(),
  aadhar_no: yup
    .string()
    .typeError("Aadhar Number must be a string")
    .optional(),
  relation_name: yup
    .string()
    .typeError("Relation Name must be a string")
    .optional(),
  caste: yup.string().typeError("Caste must be a string").optional(),
  fpb_sl_no: yup.string().typeError("FPB Sl.No must be a string").optional(),
  fpb_classn_no: yup
    .string()
    .typeError("FPB Classn.No must be a number")
    .optional(),
  occupation: yup.string().typeError("Occupation must be a string").optional(),
  educational_qualification: yup
    .string()
    .typeError("Educational Qualification must be a string")
    .optional(),
  native_ps: yup.string().typeError("Native PS must be a string").optional(),
  native_district: yup
    .string()
    .typeError("Native District must be a string")
    .optional(),
  sex: yup
    .mixed<Sex>()
    .oneOf(Object.values(Sex), "Invalid sex")
    .required("Sex is required"),
  relation_type: yup
    .mixed<RelationType>()
    .oneOf(Object.values(RelationType), "Invalid relation type")
    .optional(),
  aadhar_photo: yup
    .mixed<File>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .test("fileFormat", "Please select a valid aadhar photo file", (value) => {
      if (value) {
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          value.type
        );
      }
      return true;
    })
    .optional(),
  photo: yup
    .mixed<File>()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .test("fileFormat", "Please select a valid photo file", (value) => {
      if (value) {
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          value.type
        );
      }
      return true;
    })
    .optional(),
});
