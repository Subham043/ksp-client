import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { PaginationType, JailType, JailFormType } from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const JailKey = "jail";
export const JailsQueryKey = "jails";

export const useJailsQuery: () => UseQueryResult<
  PaginationType<{ jail: JailType[] }>,
  unknown
> = () => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [JailsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{ jail: JailType[] }>;
      }>(api_routes.jails + `?page=${page}&limit=${limit}&search=${search}`);
      return response.data.data;
    },
  });
};

export const useJailQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<JailType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [JailKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: JailType }>(
        api_routes.jails + `/${id}`
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useJailsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addJails = (newJailVal: JailType) => {
    queryClient.setQueryData<PaginationType<{ jail: JailType[] }>>(
      [JailsQueryKey, QueryInitialPageParam.toString(), limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            jail: [newJailVal, ...prev.jail],
          };
        }
      }
    );
  };

  const updateJails = (id: number, updateJailVal: JailType) => {
    queryClient.setQueryData<PaginationType<{ jail: JailType[] }>>(
      [JailsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            jail: prev.jail.map((jail) =>
              jail.id === id ? updateJailVal : jail
            ),
          };
        }
      }
    );
  };

  const deleteJails = (id: number) => {
    queryClient.setQueryData<PaginationType<{ jail: JailType[] }>>(
      [JailsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            jail: prev.jail.filter((jail) => jail.id !== id),
          };
        }
      }
    );
  };

  return {
    addJails,
    updateJails,
    deleteJails,
  };
};

export const useJailQuerySetData = () => {
  const queryClient = useQueryClient();

  const addJail = (newJailVal: JailType) => {
    queryClient.setQueryData<JailType>([JailKey, newJailVal.id], newJailVal);
  };

  const updateJail = (id: number, updateJailVal: JailType) => {
    queryClient.setQueryData<JailType>([JailKey, id], (prev) => ({
      ...prev,
      ...updateJailVal,
    }));
  };

  const deleteJail = (id: number) => {
    queryClient.setQueryData<JailType>([JailKey, id], undefined);
  };

  return {
    addJail,
    updateJail,
    deleteJail,
  };
};

export const useUpdateJailMutation = (id: number) => {
  const { axios } = useAxios();
  const { updateJails } = useJailsQuerySetData();
  const { updateJail } = useJailQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateJailVal: JailFormType) => {
      const response = await axios.put<{ data: JailType }>(
        api_routes.jails + `/${id}`,
        { ...updateJailVal }
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateJailVal) => {
      // ✅ update detail view directly
      updateJail(id, updateJailVal);
      updateJails(id, updateJailVal);
      toastSuccess("Jail updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddJailMutation = () => {
  const { axios } = useAxios();
  const { addJails } = useJailsQuerySetData();
  const { addJail } = useJailQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newJailVal: JailFormType) => {
      const response = await axios.post<{ data: JailType }>(api_routes.jails, {
        ...newJailVal,
      });
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newJailVal) => {
      // ✅ update detail view directly
      addJail(newJailVal);
      addJails(newJailVal);
      toastSuccess("Jail created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteJailMutation = (id: number) => {
  const { axios } = useAxios();
  const { deleteJails } = useJailsQuerySetData();
  const { deleteJail } = useJailQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{ data: JailType }>(
        api_routes.jails + `/${id}`
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteJail(id);
      deleteJails(id);
      toastSuccess("Jail deleted successfully.");
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
