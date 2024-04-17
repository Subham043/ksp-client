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
  relation_type?: "Father" | "Husband" | undefined;
  caste?: string | undefined;
  fpb_sl_no?: string | undefined;
  fpb_classn_no?: string | undefined;
  occupation?: string | undefined;
  educational_qualification?: string | undefined;
  native_ps?: string | undefined;
  native_district?: string | undefined;
  createdAt: string;
};

export interface CriminalFormType
  extends Omit<CriminalType, "id" | "createdAt" | "photo" | "aadhar_photo"> {
  photo?: File | undefined;
  aadhar_photo?: File | undefined;
}

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
