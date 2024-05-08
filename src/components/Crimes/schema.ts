import * as yup from "yup";

enum Gang {
  Yes = "Yes",
  No = "No",
}

export type SchemaType = {
  criminal: number;
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string;
  hsNo?: string;
  hsOpeningDate?: string;
  hsClosingDate?: string;
  aliases?: string;
  ageWhileOpening?: string;
  crimeGroup?: string;
  crimeHead?: string;
  crimeClass?: string;
  briefFact?: string;
  cluesLeft?: string;
  languagesKnown?: string;
  languagesUsed?: string;
  placeAttacked?: string;
  placeOfAssemblyAfterOffence?: string;
  placeOfAssemblyBeforeOffence?: string;
  propertiesAttacked?: string;
  styleAssumed?: string;
  toolsUsed?: string;
  tradeMarks?: string;
  transportUsedAfter?: string;
  transportUsedBefore?: string;
  voice?: string;
  build?: string;
  complexion?: string;
  teeth?: string;
  hair?: string;
  eyes?: string;
  habbits?: string;
  burnMarks?: string;
  tattoo?: string;
  mole?: string;
  scar?: string;
  leucoderma?: string;
  faceHead?: string;
  otherPartsBody?: string;
  dressUsed?: string;
  beard?: string;
  face?: string;
  moustache?: string;
  nose?: string;
  gang: "Yes" | "No";
  gangStength?: string;
};

export const initialValues: SchemaType = {
  criminal: 0,
  typeOfCrime: "",
  sectionOfLaw: "",
  mobFileNo: undefined,
  hsNo: undefined,
  hsOpeningDate: undefined,
  hsClosingDate: undefined,
  aliases: undefined,
  ageWhileOpening: undefined,
  crimeGroup: undefined,
  crimeHead: undefined,
  crimeClass: undefined,
  briefFact: undefined,
  cluesLeft: undefined,
  languagesKnown: undefined,
  languagesUsed: undefined,
  placeAttacked: undefined,
  placeOfAssemblyAfterOffence: undefined,
  placeOfAssemblyBeforeOffence: undefined,
  propertiesAttacked: undefined,
  styleAssumed: undefined,
  toolsUsed: undefined,
  tradeMarks: undefined,
  transportUsedAfter: undefined,
  transportUsedBefore: undefined,
  voice: undefined,
  build: undefined,
  complexion: undefined,
  teeth: undefined,
  hair: undefined,
  eyes: undefined,
  habbits: undefined,
  burnMarks: undefined,
  tattoo: undefined,
  mole: undefined,
  scar: undefined,
  leucoderma: undefined,
  faceHead: undefined,
  otherPartsBody: undefined,
  dressUsed: undefined,
  beard: undefined,
  face: undefined,
  moustache: undefined,
  nose: undefined,
  gang: "No",
  gangStength: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object({
  criminal: yup
    .number()
    .typeError("Criminal must be a number")
    .required("Criminal is required"),
  typeOfCrime: yup
    .string()
    .typeError("Type of Crime must be a string")
    .required("Type of Crime is required"),
  sectionOfLaw: yup
    .string()
    .typeError("Section Of Law must be a string")
    .required("Section Of Law is required"),
  mobFileNo: yup
    .string()
    .typeError("Mob. File No. must be a string")
    .optional(),
  hsNo: yup.string().typeError("HS. No. must be a string").optional(),
  hsOpeningDate: yup
    .string()
    .typeError("HS. Opening Date must be a string")
    .optional(),
  hsClosingDate: yup
    .string()
    .typeError("HS. Closing Date must be a string")
    .optional(),
  aliases: yup.string().typeError("Aliases must be a string").optional(),
  ageWhileOpening: yup
    .string()
    .typeError("Age While Opening must be a string")
    .optional(),
  crimeGroup: yup.string().typeError("Crime Group must be a string").optional(),
  crimeHead: yup.string().typeError("Crime Head must be a string").optional(),
  crimeClass: yup.string().typeError("Crime Class must be a string").optional(),
  briefFact: yup
    .string()
    .typeError("Brief Facts of the case(s) must be string")
    .optional(),
  cluesLeft: yup.string().typeError("Clues Left must be a string").optional(),
  languagesKnown: yup
    .string()
    .typeError("Languages Known must be a string")
    .optional(),
  languagesUsed: yup
    .string()
    .typeError("Languages Used must be a string")
    .optional(),
  placeAttacked: yup
    .string()
    .typeError("Place Attacked must be a string")
    .optional(),
  placeOfAssemblyAfterOffence: yup
    .string()
    .typeError("Place of Assembly After Offence must be a string")
    .optional(),
  placeOfAssemblyBeforeOffence: yup
    .string()
    .typeError("Place of Assembly Before Offence must be a string")
    .optional(),
  propertiesAttacked: yup
    .string()
    .typeError("Properties Attacked must be a string")
    .optional(),
  styleAssumed: yup
    .string()
    .typeError("Style Assumed must be a string")
    .optional(),
  toolsUsed: yup.string().typeError("Tools Used must be a string").optional(),
  tradeMarks: yup.string().typeError("Trade Marks must be a string").optional(),
  transportUsedAfter: yup
    .string()
    .typeError("Transport Used After must be a string")
    .optional(),
  transportUsedBefore: yup
    .string()
    .typeError("Transport Used Before must be a string")
    .optional(),
  voice: yup.string().typeError("Voice must be a string").optional(),
  build: yup.string().typeError("Build must be a string").optional(),
  complexion: yup.string().typeError("Complexion must be a string").optional(),
  teeth: yup.string().typeError("Teeth must be a string").optional(),
  hair: yup.string().typeError("Hair must be a string").optional(),
  eyes: yup.string().typeError("Eyes must be a string").optional(),
  habbits: yup.string().typeError("Habbits must be a string").optional(),
  burnMarks: yup.string().typeError("Burn Marks must be a string").optional(),
  tattoo: yup.string().typeError("Tattoo must be a string").optional(),
  mole: yup.string().typeError("Mole must be a string").optional(),
  scar: yup.string().typeError("Scar must be a string").optional(),
  leucoderma: yup.string().typeError("Leucoderma must be a string").optional(),
  faceHead: yup.string().typeError("Face/Head must be a string").optional(),
  otherPartsBody: yup
    .string()
    .typeError("Other Parts of Body must be a string")
    .optional(),
  dressUsed: yup.string().typeError("Dress Used must be a string").optional(),
  beard: yup.string().typeError("Beard must be a string").optional(),
  face: yup.string().typeError("Face must be a string").optional(),
  moustache: yup.string().typeError("Moustache must be a string").optional(),
  nose: yup.string().typeError("Nose must be a string").optional(),
  gang: yup
    .mixed<Gang>()
    .oneOf(Object.values(Gang), "Invalid gang")
    .required("Gang is required"),
  gangStength: yup
    .string()
    .typeError("Gang Strength must be a string")
    .optional(),
});
