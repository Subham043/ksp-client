import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import {
  PaginationType,
  HearingFormType,
  HearingType,
} from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const HearingKey = "hearing";
export const HearingsQueryKey = "hearings";
export const HearingsSelectQueryKey = "hearings_select";

export const useHearingsQuery: (params: {
  jailId: number;
}) => UseQueryResult<PaginationType<{ hearing: HearingType[] }>, unknown> = ({
  jailId,
}) => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  return useQuery({
    queryKey: [HearingsQueryKey, jailId, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{
          hearing: HearingType[];
        }>;
      }>(
        api_routes.hearings +
          `/list/${jailId}?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data.data;
    },
  });
};

export const useHearingsSelectQuery: (params: {
  search?: string;
  enabled?: boolean;
}) => UseQueryResult<PaginationType<{ hearing: HearingType[] }>, unknown> = ({
  search = "",
  enabled = true,
}) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: [HearingsSelectQueryKey, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{
          hearing: HearingType[];
        }>;
      }>(api_routes.hearings + `/list-all?page=1&limit=20&search=${search}`);
      return response.data.data;
    },
    enabled,
  });
};

export const useHearingQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<HearingType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [HearingKey, id],
    queryFn: async () => {
      const response = await axios.get<{
        data: HearingType;
      }>(api_routes.hearings + `/${id}`);
      return response.data.data;
    },
    enabled,
  });
};

export const useHearingsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addHearings = (jailId: number, newHearingVal: HearingType) => {
    queryClient.setQueryData<
      PaginationType<{
        hearing: HearingType[];
      }>
    >(
      [
        HearingsQueryKey,
        jailId,
        QueryInitialPageParam.toString(),
        limit,
        search,
      ],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            last_page: prev.last_page + 1,
            total: prev.total + 1,
            current_page: prev.current_page + 1,
            hearing: [newHearingVal, ...prev.hearing],
          };
        }
      }
    );
  };

  const updateHearings = (
    id: number,
    jailId: number,
    updateHearingVal: HearingType
  ) => {
    queryClient.setQueryData<
      PaginationType<{
        hearing: HearingType[];
      }>
    >([HearingsQueryKey, jailId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          hearing: prev.hearing.map((hearing) =>
            hearing.id === id
              ? {
                  ...hearing,
                  ...updateHearingVal,
                }
              : hearing
          ),
        };
      }
    });
  };

  const deleteHearings = (id: number, jailId: number) => {
    queryClient.setQueryData<
      PaginationType<{
        hearing: HearingType[];
      }>
    >([HearingsQueryKey, jailId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          hearing: prev.hearing.filter((hearing) => hearing.id !== id),
        };
      }
    });
  };

  return {
    addHearings,
    updateHearings,
    deleteHearings,
  };
};

export const useHearingQuerySetData = () => {
  const queryClient = useQueryClient();

  const addHearing = (newHearingVal: HearingType) => {
    queryClient.setQueryData<HearingType>(
      [HearingKey, newHearingVal.id],
      newHearingVal
    );
  };

  const updateHearing = (id: number, updateHearingVal: HearingType) => {
    queryClient.setQueryData<HearingType>([HearingKey, id], updateHearingVal);
  };

  const deleteHearing = (id: number) => {
    queryClient.setQueryData<HearingType>([HearingKey, id], undefined);
  };

  return {
    addHearing,
    updateHearing,
    deleteHearing,
  };
};

export const useUpdateHearingMutation = (id: number, jailId: number) => {
  const { axios } = useAxios();
  const { updateHearings } = useHearingsQuerySetData();
  const { updateHearing } = useHearingQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateHearingVal: HearingFormType) => {
      const response = await axios.put<{
        data: HearingType;
      }>(api_routes.hearings + `/${id}`, updateHearingVal);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateHearingVal) => {
      // ✅ update detail view directly
      updateHearing(id, updateHearingVal);
      updateHearings(id, jailId, updateHearingVal);
      toastSuccess("Hearing updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddHearingMutation = (jailId: number) => {
  const { axios } = useAxios();
  const { addHearings } = useHearingsQuerySetData();
  const { addHearing } = useHearingQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newHearingVal: HearingFormType) => {
      const response = await axios.post<{
        data: HearingType;
      }>(api_routes.hearings + `/create/${jailId}`, newHearingVal);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newHearingVal) => {
      // ✅ update detail view directly
      addHearing(newHearingVal);
      addHearings(jailId, newHearingVal);
      toastSuccess("Hearing created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteHearingMutation = (id: number, jailId: number) => {
  const { axios } = useAxios();
  const { deleteHearings } = useHearingsQuerySetData();
  const { deleteHearing } = useHearingQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{
        data: HearingType;
      }>(api_routes.hearings + `/${id}`);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteHearing(id);
      deleteHearings(id, jailId);
      toastSuccess("Hearing deleted successfully.");
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
