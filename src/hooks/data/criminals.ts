import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import {
  PaginationType,
  CriminalType,
  CriminalFormType,
} from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const CriminalKey = "criminal";
export const CriminalsQueryKey = "criminals";

export const useCriminalsQuery: () => UseQueryResult<
  PaginationType<{ criminal: CriminalType[] }>,
  unknown
> = () => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CriminalsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{ criminal: CriminalType[] }>;
      }>(
        api_routes.criminals + `?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data.data;
    },
  });
};

export const useCriminalQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CriminalType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [CriminalKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: CriminalType }>(
        api_routes.criminals + `/${id}`
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useCriminalsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addCriminals = (newCriminalVal: CriminalType) => {
    queryClient.setQueryData<PaginationType<{ criminal: CriminalType[] }>>(
      [CriminalsQueryKey, QueryInitialPageParam.toString(), limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            criminal: [newCriminalVal, ...prev.criminal],
          };
        }
      }
    );
  };

  const updateCriminals = (id: number, updateCriminalVal: CriminalType) => {
    queryClient.setQueryData<PaginationType<{ criminal: CriminalType[] }>>(
      [CriminalsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            criminal: prev.criminal.map((criminal) =>
              criminal.id === id ? updateCriminalVal : criminal
            ),
          };
        }
      }
    );
  };

  const deleteCriminals = (id: number) => {
    queryClient.setQueryData<PaginationType<{ criminal: CriminalType[] }>>(
      [CriminalsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            criminal: prev.criminal.filter((criminal) => criminal.id !== id),
          };
        }
      }
    );
  };

  return {
    addCriminals,
    updateCriminals,
    deleteCriminals,
  };
};

export const useCriminalQuerySetData = () => {
  const queryClient = useQueryClient();

  const addCriminal = (newCriminalVal: CriminalType) => {
    queryClient.setQueryData<CriminalType>(
      [CriminalKey, newCriminalVal.id],
      newCriminalVal
    );
  };

  const updateCriminal = (id: number, updateCriminalVal: CriminalType) => {
    queryClient.setQueryData<CriminalType>([CriminalKey, id], (prev) => ({
      ...prev,
      ...updateCriminalVal,
    }));
  };

  const deleteCriminal = (id: number) => {
    queryClient.setQueryData<CriminalType>([CriminalKey, id], undefined);
  };

  return {
    addCriminal,
    updateCriminal,
    deleteCriminal,
  };
};

const criminalFormData: (data: CriminalFormType) => FormData = (data) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("sex", data.sex);
  if (data.permanent_address) {
    formData.append("permanent_address", data.permanent_address);
  }
  if (data.present_address) {
    formData.append("present_address", data.present_address);
  }
  if (data.phone) {
    formData.append("phone", data.phone);
  }
  if (data.aadhar_no) {
    formData.append("aadhar_no", data.aadhar_no);
  }
  if (data.relation_name) {
    formData.append("relation_name", data.relation_name);
  }
  if (data.relation_type) {
    formData.append("relation_type", data.relation_type);
  }
  if (data.caste) {
    formData.append("caste", data.caste);
  }
  if (data.fpb_sl_no) {
    formData.append("fpb_sl_no", data.fpb_sl_no);
  }
  if (data.fpb_classn_no) {
    formData.append("fpb_classn_no", data.fpb_classn_no);
  }
  if (data.occupation) {
    formData.append("occupation", data.occupation);
  }
  if (data.educational_qualification) {
    formData.append(
      "educational_qualification",
      data.educational_qualification
    );
  }
  if (data.native_ps) {
    formData.append("native_ps", data.native_ps);
  }
  if (data.native_district) {
    formData.append("native_district", data.native_district);
  }
  if (data.aadhar_photo) {
    formData.append("aadhar_photo", data.aadhar_photo);
  }
  if (data.photo) {
    formData.append("photo", data.photo);
  }
  return formData;
};

export const useUpdateCriminalMutation = (id: number) => {
  const { axios } = useAxios();
  const { updateCriminals } = useCriminalsQuerySetData();
  const { updateCriminal } = useCriminalQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateCriminalVal: CriminalFormType) => {
      const response = await axios.put<{ data: CriminalType }>(
        api_routes.criminals + `/${id}`,
        criminalFormData(updateCriminalVal)
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateCriminalVal) => {
      // ✅ update detail view directly
      updateCriminal(id, updateCriminalVal);
      updateCriminals(id, updateCriminalVal);
      toastSuccess("Criminal updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddCriminalMutation = () => {
  const { axios } = useAxios();
  const { addCriminals } = useCriminalsQuerySetData();
  const { addCriminal } = useCriminalQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newCriminalVal: CriminalFormType) => {
      const response = await axios.post<{ data: CriminalType }>(
        api_routes.criminals,
        criminalFormData(newCriminalVal)
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCriminalVal) => {
      // ✅ update detail view directly
      addCriminal(newCriminalVal);
      addCriminals(newCriminalVal);
      toastSuccess("Criminal created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteCriminalMutation = (id: number) => {
  const { axios } = useAxios();
  const { deleteCriminals } = useCriminalsQuerySetData();
  const { deleteCriminal } = useCriminalQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{ data: CriminalType }>(
        api_routes.criminals + `/${id}`
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteCriminal(id);
      deleteCriminals(id);
      toastSuccess("Criminal deleted successfully.");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error?.response?.data?.message) {
          toastError(error.response.data.message);
        }
      } else {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};
