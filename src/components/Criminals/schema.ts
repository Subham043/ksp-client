import * as yup from "yup";

enum Sex {
  Male = "Male",
  Female = "Female",
  Others = "Others",
}

export type SchemaType = {
  name: string;
  sex: "Male" | "Female" | "Others";
  dob?: string;
  permanent_address?: string | undefined;
  present_address?: string | undefined;
  phone?: string | undefined;
  aadhar_no?: string | undefined;
  aadhar_photo?: File | undefined;
  photo?: File | undefined;
  father_name?: string | undefined;
  mother_name?: string | undefined;
  spouse_name?: string | undefined;
  religion?: string | undefined;
  caste?: string | undefined;
  fpb_sl_no?: string | undefined;
  fpb_classn_no?: string | undefined;
  occupation?: string | undefined;
  educational_qualification?: string | undefined;
  native_ps?: string | undefined;
  native_district?: string | undefined;
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
};

export const initialValues: SchemaType = {
  name: "",
  sex: "Male",
  dob: undefined,
  permanent_address: undefined,
  present_address: undefined,
  phone: undefined,
  aadhar_no: undefined,
  aadhar_photo: undefined,
  photo: undefined,
  father_name: undefined,
  mother_name: undefined,
  spouse_name: undefined,
  religion: undefined,
  caste: undefined,
  fpb_sl_no: undefined,
  fpb_classn_no: undefined,
  occupation: undefined,
  educational_qualification: undefined,
  native_ps: undefined,
  native_district: undefined,
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
  dob: yup.string().typeError("Date of Birth must be a string").optional(),
  phone: yup.string().typeError("Phone must be a string").optional(),
  aadhar_no: yup
    .string()
    .typeError("Aadhar Number must be a string")
    .optional(),
  father_name: yup
    .string()
    .typeError("Father Name must be a string")
    .optional(),
  mother_name: yup
    .string()
    .typeError("Mother Name must be a string")
    .optional(),
  spouse_name: yup
    .string()
    .typeError("Spouse Name must be a string")
    .optional(),
  religion: yup.string().typeError("Religion must be a string").optional(),
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

export const Voice = [
  "Feminine",
  "Soft spoken",
  "Deep/heavy/guttoral",
  "Loud spoken",
  "Nasal",
  "Fast",
  "Slow",
];
export const Build = [
  "Fat (stout/strong)",
  "Normal (muscular)",
  "Thin (lanky)",
];
export const Complexion = ["Fair", "Dark", "Wheatish/sallow", "Very fair"];
export const Teeth = [
  "Metal tooth silver (capping)",
  "Gaps in teeth",
  "Stained",
  "Metal tooth",
  "Metal tooth gold (capping)",
  "Protruding",
  "Normal (even)",
  "Broken",
  "Missing tooth/teeth",
  "False tooth/teeth",
];
export const Hair = [
  "Bald full",
  "Straight-hair",
  "Normal - black",
  "Normal - black & grey",
  "Normal - grey",
  "Curly - grey",
  "Curly - black & grey",
  "Bald partial",
  "White & grey",
  "Brown",
  "Wig - use of",
  "Long",
  "White hair",
  "White & Black",
  "Curly - black",
  "Side burns",
];
export const Eyes = [
  "Eye artificial right",
  "Eye brows - straight",
  "Eye sunken",
  "Eye brows - arched/curved",
  "Eye brows - thick",
  "Eye brown",
  "Eye normal",
  "Eye markedly wide set",
  "Eye artificial left",
  "Eye blue",
  "Eye brows - artificial",
  "Eye reddish",
  "Eye brows - thin",
];
export const Habbits = [
  "Chews supari",
  "Nail biting",
  "Eyes blinking",
  "Chews pan masala",
  "Gambler",
  "Chews tobacco",
  "Lip biting",
  "Bragging",
  "Smoker",
  "Race-goer",
  "Drug addict",
  "Chews gum",
  "Cinema crazy",
  "Lottery player",
  "Eyes shifting",
  "Drinks liquor",
  "Stretching",
  "Chews betal/pan",
];
export const BurnMarks = [
  "Chest left side",
  "Chin",
  "Chest middle",
  "Back right side",
  "Leg right",
  "Ear right",
  "Foot left",
  "Foot right",
  "Face",
  "Forehead",
  "Cheek left",
  "Nose",
  "Hand right",
  "Eye brow right",
  "Cheek right",
  "Ear left",
  "Back left side",
  "Leg left",
  "Hand left",
  "Eye brow left",
];
export const Scar = [
  "Chest right side",
  "Chest middle",
  "Neck",
  "Shoulder right",
  "Palm right",
  "Ear right",
  "Face",
  "Nose",
  "Back left side",
  "Back right side",
  "Eye brow left",
  "Hand left",
  "Hand right",
  "Leg left",
  "Cheek left",
  "Foot right",
  "Forehead",
  "Stomach",
  "Lip upper",
  "Ear left",
  "Chest left side",
  "Cheek right",
  "Chin",
];
export const Mole = [
  "Chest right side",
  "Nose",
  "Forehead",
  "Back right side",
  "Back left side",
  "Eye brow right",
  "Face",
  "Ear right",
  "Stomach",
  "Cheek right",
  "Ear left",
  "Neck",
  "Foot right",
  "Cheek left",
  "Chest middle",
  "Chin",
  "Foot left",
  "Eye brow left",
  "Hand right",
  "Chest left side",
  "Leg left",
];
export const Tattoo = [
  "Cheek right",
  "Head",
  "Ear left",
  "Chin",
  "Foot right",
  "Eye brow left",
  "Chest middle",
  "Back left side",
  "Palm right",
  "Hand left",
  "Hand right",
  "Chest right side",
  "Shoulder right",
  "Cheek left",
  "Face",
  "Chest left side",
  "Foot left",
  "Back right side",
  "Eye brow right",
];
export const Leucoderma = [
  "Thigh left",
  "Back left side",
  "Face",
  "Neck",
  "Cheek right",
  "Chest right side",
  "Eye brow left",
  "Chest left side",
  "Chin",
  "Shoulder right",
  "Back right side",
  "Cheek left",
  "Ear left",
  "Hand left",
  "Nose",
  "Chest middle",
  "Foot right",
  "Palm left",
  "Ear right",
];
export const FaceHead = [
  "Nose peculiar",
  "Hare lips",
  "Deaf",
  "Ear deformed -right",
  "Ear deformed - both",
  "Protruding face",
  "Ear missing - right",
  "Eyes squint",
  "Ear markedly large",
  "Ear deformed -left",
  "One eyed",
  "Eyes blind one",
  "Ear markedly small",
  "Ear missing - left",
];
export const Face = [
  "Dimpled chin",
  "Prominent cheek",
  "Square/heavy jaw",
  "High cheek",
  "Oval",
  "Forehead narrow",
  "Poxpitted",
  "Dimpled cheek",
  "Double chin",
  "Round",
  "Long",
  "Forehead broad",
  "Wrinkled",
];
export const OtherParts = [
  "Leg missing - left",
  "Left foot missing",
  "Leg missing - right",
  "Finger(s) missing - left",
  "Arm missing - right",
  "Knee knocked",
  "Finger(s) extra - right",
  "Goitre",
  "Left hand missing",
  "Eunuch",
  "Right hand missing",
  "Finger(s) extra - left",
  "Leg limping",
  "Leprosy",
  "Leg - elephantiasis",
  "Right foot missing",
  "Bow legged - left",
];
export const DressUsed = [
  "Shirt-pant",
  "Native attire",
  "Sherwani",
  "Kurta pajama",
  "Saree",
  "Lungi (tehmat)",
  "Kurta - pant",
  "Blouse/choli",
  "Kurta - dhoti",
  "Dhoti",
  "Bushirt - pant",
  "Bushirt - dhoti",
  "Shirt",
  "T-shirt",
  "Langoti",
  "Pant",
  "Shirt - pyjama",
  "Jeans",
  "Chorni-bandi",
  "Banian",
  "Bushirt",
  "Nighty",
];
export const Beard = [
  "Bearded",
  "Rolled & tied (sikh type)",
  "Short/trimmed - thick",
  "Short/trimmed - thin",
  "Imperial/rajputi",
  "Long - thick",
  "Clean shaven",
  "Long flowing",
  "Long - thin",
  "Goatee (french/bulganin)",
];
export const Moustaches = [
  "Pencil",
  "Turned up",
  "Droopping",
  "Clipped",
  "Fly type",
  "Tooth brush",
  "Half moustache (hitler type)",
  "Handle bar",
];
export const Nose = [
  "Bulbous",
  "Long",
  "Hooked (parrot type)",
  "Turned up nostrils",
  "Pierced",
  "Pointed",
  "Snub /pug",
  "Broad nostrils (markedly dilated)",
];
