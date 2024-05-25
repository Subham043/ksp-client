import * as yup from "yup";

enum Gang {
  Yes = "Yes",
  No = "No",
}

export type SchemaType = {
  criminals: (number | undefined)[];
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
  gang: "Yes" | "No";
  gangStrength?: string;
};

export const initialValues: SchemaType = {
  criminals: [],
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
  gang: "No",
  gangStrength: undefined,
};

export const schema: yup.ObjectSchema<SchemaType> = yup.object({
  criminals: yup
    .array()
    .typeError("Criminal must be an array")
    .of(yup.number())
    .min(1, "Criminal is required")
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
