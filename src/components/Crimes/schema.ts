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
  gangStrength?: string;
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
  gangStrength: undefined,
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
  gangStrength: yup
    .string()
    .typeError("Gang Strength must be a string")
    .optional(),
});

export const LanguagesKnown = [
  "Kashmiri",
  "English",
  "Hindi",
  "Gujarati",
  "Marathi",
  "Kannada",
  "Tamil",
  "Telegu",
  "Bhojpuri",
  "Nepali",
  "Badaga",
  "Urdu",
  "Assamese",
  "Sadri",
  "Apatani",
];

export const PlaceAttacked = [
  "Diplomatic",
  "Commercial Establishment",
  "Residential Premises",
  "Religious Places",
  "Roadways",
  "Land Massess",
  "Government Establishment",
  "Parking Places",
  "Hospital/Health Care",
  "Educational Institutions",
  "Public Places",
  "Aerodrome",
  "River,Sea and Water Bodies",
];

export const PropertiesAttacked = [
  "Raw material",
  "Railway properties",
  "Arms and ammunition",
  "Agriculture products",
  "Animals",
  "Electrical and electronic goods",
  "Birds",
  "Jewellery",
  "Conveyance (automobiles & others)",
  "Miscellaneous",
  "Building and building materials",
  "Circle",
  "Petroleum products",
  "Cultural property",
  "Coin & currency",
  "Documents and valuable securities",
  "Other conveyance",
  "Animals - hide/skin/remains",
  "Household articles",
];

export const StyleAssumed = [
  "BROKER",
  "HOUSE KEEPER",
  "OPTICIAN",
  "ACCOUNTANT",
  "ELECTRICIAN",
  "WORKS MANAGER",
  "ADMIRAL",
  "ATTORNEY",
  "EMBLER",
  "STUDENT",
  "AGRICULTURIST",
  "BUTLER",
  "LINER",
  "ASSISTANT COMMANDANT",
  "CARRIER",
  "BAKER",
  "ADDITIONAL ASSISTANT",
  "ACCOUNTS OFFICER",
  "ASSISTANT PHOTOGRAPHER",
  "COMPANY EMPLOYEE",
  "WORKER",
  "CHEMIST",
  "AGENT",
  "DIPLOMAT",
  "DRIVER",
  "BARBER",
  "ADDITIONAL GOVT.PLEADER",
  "CLEANER",
  "CONFECTIONER",
  "ASSISTANT CONSERVATOR OF FORESTS",
  "AGRICULTURE OFFICER",
  "LABOURER",
  "ACTOR",
  "ANALYST",
  "WOOD CUTTER",
  "ADMINISTRATIVE OFFICER",
  "ARCHIRTECT",
  "AUDITOR",
  "FOREMAN",
  "COOLIE",
  "ADDITIONAL SUPERINTENDENT OF POLICE",
  "AUCTIONER",
  "BOILER MAN",
  "ACROBAT",
  "ADDITIONAL SECRETARY",
  "EMPLYOEE",
  "FARMER",
  "EXAMINER",
  "WIG/CHOWRY HAIR SELLER",
  "ARTIST",
];

export const ToolsUsed = [
  "WOODEN REEPER/CLUB",
  "LATHI",
  "BROKEN BOTTLE",
  "IRON BLADE",
  "BOULDERS",
  "BAMBOO STICKS",
  "WRENCH",
  "CHISTLE",
  "CROW BAR",
  "SCREW DRIVER",
  "VANAKE",
  "BY HAND",
  "IRON ROD",
  "BILL HOOK",
  "KNIFE",
  "AXE",
  "BLADE PIECES",
  "IRON HOOK",
  "CLUBS",
  "CHILLY POWDER",
  "PILLOW",
  "COUNTRY MADE GUN",
  "HAMMER",
  "DAGGER",
  "STONES",
  "BLADE",
  "SICKLE",
  "FALSE KEY",
  "DOUBLE BARREL GUN",
  "SAW",
];

export const TradeMarks = [
  "MASKED FACE",
  "BY USING FALSE KEY",
  "OPERATING ALONG WITH ASSOCIATES",
  "BY ASSURING EMPLOYMENT",
  "BY REMOVING DOOR LATCH",
  "SURYEING TARGETS BEFORE COMMISSION",
  "FALSE KEY TO COMMIT OFFENCE(AUTOMOBILE)",
  "TRADE",
  "BLACKMAILING THE VICTIM",
  "BY ISSUING CHEQUES WITHOUT BANK BALANCE",
  "BY REMOVING THE DOOR",
  "TAKING AWAY THE VEHICLE KEY",
  "BOLTING THE NEIGHBOURS DOORS",
  "COMMITING OFFENCE POSING AS HOTEL SERVER",
  "BREAKING THE DOOR USING CLUBS",
  "COMMITING OFFENCE POSING AS TRAVEL AGENT",
  "ADDING POISON TO THE FOOD",
  "BREAKING THE DOOR USING BOULDERS",
  "BEATING THE VICTIMS MERCILESSLY",
  "BREAKING THE VEHICLE LOCK USING IRON BAR",
  "ASSAULTING USING HANDS ONLY",
  "THEFT OF ARTICLES - BY TRAIN.",
  "HIRING THE VEHICLE FOR THEFT",
  "BY PLANTING NAILS ON THE ROAD",
  "BLOCKING THE ROAD USING VEHICLES",
  "INMATES PRESENT BUT AWAKE",
  "BY USINGS BRICKS TO HIT",
  "CALLING THE VICTIM BY NAME",
  "ASSAULTING THE VICTIMS WITH WEAPONS",
  "BREAKING THE DOOR USING IRON RODS",
  "CONSUMING FOOD/DRINK AT THE SCENE",
  "THREAT OF HARM OR INJURY",
  "BY POSING AS GARDENER/CROP CUTTER",
  "CHEATING-FAIL STUDENTS TO PASS THE EXAM",
  "FORCIBLY OPENING THE DOOR",
];
export const TransportUsed = [
  "AIRCRAFT",
  "Animal Drawn Vehicle",
  "AUTO RICKSHAW",
  "Bike",
  "MOTOR CYCLE",
  "By Walk",
  "Car",
  "JEEP",
  "BICYCLE",
  "AMBULANCE",
  "LORRY",
  "BUS",
];
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
export const CluesLeft = [
  "INCREASING VOLUME OF RADIO",
  "DEFLATING TYRE",
  "ACCOMPLICE/SERVANT FACILITATING ENTRY",
  "SURVEYING TARGETS BEFORE COMMISSION",
  "CONSUMING LIQUOR AT THE SCENE",
  "MAKING SOUNDS TO VERIFY ALERTNESS OF INMATES",
  "EXIT-BY SAME WAY AS ENTRY",
  "COMMITTING AFTER MAKING ADEQUATE PREPARATION",
  "USING SIGNAL BEFORE/DURING/AFTER OPERATION",
  "GLOVES USE OF",
  "CHEWS GUM WHILE COMMITTING CRIME",
  "BOGUS ENQUIRY/MESSAGE",
  "PROFESSIONAL",
  "LATHI/DANDA USE OR SHOW OF",
  "ANAESTHETICS OR DRUGS USE OF ON VICTIM",
  "DEFILING /EASING AT THE SCENE OF OFFENCE",
  "DRUNK WHILE COMMITTING OFFENCE",
  "DURING ABSENCE OF MALE MEMBER",
  "SAFE BREAKING BY OTHER METHOD",
  "INMATES PRESENT BUT AWAKE WHILE",
  "DECAPACITATION TO CONCEAL IDENTITY",
  "BOLTING ROOMS OF THE HOUSE",
  "ASSAULTING PHYSICALLY (BEATING)",
  "BULLET PROOF VEST - USE OF",
  "ASSAULTING WITH IMPLEMENTS",
  "VIOLENCE USE OF FOR ESCAPE",
  "ARRANGING BAIL/DEFENCE OF CRIMINAL",
  "DISGUISE USE OF",
  "CONSUMING FOOD AT THE SCENE",
  "WEARING UNDER GARMENT ONLY",
  "BOLTING NEIGHBOURS DOOR",
  "CODES USING OF WHILE OPERATING",
  "LOCATION-END/CORNER OF STREET",
  "INMATE PRESENT BUT ASLEEP",
  "DECEIT",
  "ABANDONING VEHICLE",
  "INCREASING VOLUME OF TV",
  "KILLING VICTIMS",
  "FABRICATING ALIBI OR OTHER EVIDENCE TO COMMIT",
  "CASH CLOSING AND COUNTING TIMINGS",
  "ADHESIVE TAPES USE OF",
  "LOCATION MIDDLE OF STREET",
  "LIMITED SEARCH FOR VALUABLES",
  "ABSTRACTION FROM MOVING VEHICLE",
  "POISONING - OPIUM",
  "DISPLAYING WEAPON",
  "BEHAVIOUR - AGGRESSIVE",
  "JAMMING THE CYCLE WITH STRING/ROD",
  "TEA SHOP",
];
