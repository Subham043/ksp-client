import { AxiosResponse } from "axios";
import { ReactNode } from "react";

export type ChildrenType = {
  children: ReactNode;
};

export type CommonDrawerProps =
  | {
      status: boolean;
      type: "Create";
    }
  | {
      status: boolean;
      type: "Edit";
      id: number;
    };

export type UserType = {
  access_token: string;
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export type CriminalType = {
  id: number;
  name: string;
  sex: "Male" | "Female" | "Others";
  permanent_address?: string | undefined;
  present_address?: string | undefined;
  phone?: string | undefined;
  aadhar_no?: string | undefined;
  aadhar_photo?: string | undefined;
  photo?: string | undefined;
  relation_name?: string | undefined;
  relation_type?: "Father" | "Husband" | "Mother" | "Wife" | undefined;
  caste?: string | undefined;
  fpb_sl_no?: string | undefined;
  fpb_classn_no?: string | undefined;
  occupation?: string | undefined;
  educational_qualification?: string | undefined;
  native_ps?: string | undefined;
  native_district?: string | undefined;
  voice?: string | null;
  build?: string | null;
  complexion?: string | null;
  teeth?: string | null;
  hair?: string | null;
  eyes?: string | null;
  habbits?: string | null;
  burnMarks?: string | null;
  tattoo?: string | null;
  mole?: string | null;
  scar?: string | null;
  leucoderma?: string | null;
  faceHead?: string | null;
  otherPartsBody?: string | null;
  dressUsed?: string | null;
  beard?: string | null;
  face?: string | null;
  moustache?: string | null;
  nose?: string | null;
  dob?: string | null;
  createdAt: string;
};

export interface CriminalFormType
  extends Omit<CriminalType, "id" | "createdAt" | "photo" | "aadhar_photo"> {
  photo?: File | undefined;
  aadhar_photo?: File | undefined;
}

export type CrimeType = {
  id: number;
  typeOfCrime: string;
  sectionOfLaw: string;
  mobFileNo?: string | null;
  hsNo?: string | null;
  hsOpeningDate?: string | null;
  hsClosingDate?: string | null;
  aliases?: string | null;
  ageWhileOpening?: string | null;
  crimeGroup?: string | null;
  crimeHead?: string | null;
  crimeClass?: string | null;
  briefFact?: string | null;
  cluesLeft?: string | null;
  languagesKnown?: string | null;
  languagesUsed?: string | null;
  placeAttacked?: string | null;
  placeOfAssemblyAfterOffence?: string | null;
  placeOfAssemblyBeforeOffence?: string | null;
  propertiesAttacked?: string | null;
  styleAssumed?: string | null;
  toolsUsed?: string | null;
  tradeMarks?: string | null;
  transportUsedAfter?: string | null;
  transportUsedBefore?: string | null;
  gang: "Yes" | "No";
  gangStrength?: string | null;
  criminals: {
    criminal: {
      id: number;
      name: string;
    };
  }[];
  createdAt?: string | null;
};

export interface CrimeFormType
  extends Omit<CrimeType, "id" | "createdAt" | "criminals"> {
  criminals?: (number | undefined)[] | null;
}

export type CourtType = {
  id: number;
  courtName: string;
  ccScNo?: string | null | undefined;
  psName?: string | null | undefined;
  hearingDate?: Date | null;
  nextHearingDate?: Date | null;
  attendance?: string | null | undefined;
  lawyerName?: string | null | undefined;
  lawyerContact?: string | null | undefined;
  suretyProviderDetail?: string | null | undefined;
  suretyProviderContact?: string | null | undefined;
  stageOfCase?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  criminalId?: number | null | undefined;
  accused: {
    id: number;
    name: string;
  } | null;
  crimeId?: number | null | undefined;
  crime: {
    id: number;
    typeOfCrime: string | null;
    sectionOfLaw: string | null;
    mobFileNo?: string | null;
    hsNo?: string | null;
    hsOpeningDate?: Date | null;
    hsClosingDate?: Date | null;
  } | null;
  createdAt?: Date | null;
};

export interface CourtFormType
  extends Omit<CourtType, "id" | "createdAt" | "crime" | "accused"> {}

export type JailType = {
  id: number;
  lawSection?: string | null | undefined;
  policeStation?: string | null | undefined;
  jailEntryDate?: Date | null;
  jailReleaseDate?: Date | null;
  utpNo?: string | null | undefined;
  jailVisitorDetail?: string | null | undefined;
  visitorRelationship?: string | null | undefined;
  additionalRemarks?: string | null | undefined;
  criminalId?: number | null | undefined;
  accused: {
    id: number;
    name: string;
  } | null;
  crimeId?: number | null | undefined;
  crime: {
    id: number;
    typeOfCrime: string | null;
    sectionOfLaw: string | null;
    mobFileNo?: string | null;
    hsNo?: string | null;
    hsOpeningDate?: Date | null;
    hsClosingDate?: Date | null;
  } | null;
  createdAt?: Date | null;
};

export interface JailFormType
  extends Omit<JailType, "id" | "createdAt" | "crime" | "accused"> {}

export type AxiosSuccessResponseType<T> = {
  message: string;
  code: number;
  success: true;
  data?: T;
};

export type AxiosErrorResponseType = {
  message: string;
  code: number;
  success: false;
  formErrors?: Record<string, string[]>;
};

export type AxiosResponseType<T> = AxiosResponse<
  AxiosSuccessResponseType<T>,
  AxiosErrorResponseType
>;

export type ApiPaginationQueryType = {
  page?: string;
  limit?: string;
  search?: string;
};

export type UserQueryType = {
  id: number;
  name: string;
  email: string;
  status: "active" | "blocked";
  role: "user" | "admin";
  createdAt: Date;
};

export type PaginationMainType = {
  total: number;
  current_page: number;
  per_page: number;
  first_page: number;
  last_page: number;
};

export type PaginationType<T> = T & PaginationMainType;
