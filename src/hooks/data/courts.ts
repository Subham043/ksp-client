import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { PaginationType, CourtType, CourtFormType } from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const CourtKey = "court";
export const CourtsQueryKey = "courts";

export const useCourtsQuery: () => UseQueryResult<
  PaginationType<{ court: CourtType[] }>,
  unknown
> = () => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CourtsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{ court: CourtType[] }>;
      }>(api_routes.courts + `?page=${page}&limit=${limit}&search=${search}`);
      return response.data.data;
    },
  });
};

export const useCourtQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CourtType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [CourtKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: CourtType }>(
        api_routes.courts + `/${id}`
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useCourtsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addCourts = (newCourtVal: CourtType) => {
    queryClient.setQueryData<PaginationType<{ court: CourtType[] }>>(
      [CourtsQueryKey, QueryInitialPageParam.toString(), limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            court: [newCourtVal, ...prev.court],
          };
        }
      }
    );
  };

  const updateCourts = (id: number, updateCourtVal: CourtType) => {
    queryClient.setQueryData<PaginationType<{ court: CourtType[] }>>(
      [CourtsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            court: prev.court.map((court) =>
              court.id === id ? updateCourtVal : court
            ),
          };
        }
      }
    );
  };

  const deleteCourts = (id: number) => {
    queryClient.setQueryData<PaginationType<{ court: CourtType[] }>>(
      [CourtsQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            court: prev.court.filter((court) => court.id !== id),
          };
        }
      }
    );
  };

  return {
    addCourts,
    updateCourts,
    deleteCourts,
  };
};

export const useCourtQuerySetData = () => {
  const queryClient = useQueryClient();

  const addCourt = (newCourtVal: CourtType) => {
    queryClient.setQueryData<CourtType>(
      [CourtKey, newCourtVal.id],
      newCourtVal
    );
  };

  const updateCourt = (id: number, updateCourtVal: CourtType) => {
    queryClient.setQueryData<CourtType>([CourtKey, id], (prev) => ({
      ...prev,
      ...updateCourtVal,
    }));
  };

  const deleteCourt = (id: number) => {
    queryClient.setQueryData<CourtType>([CourtKey, id], undefined);
  };

  return {
    addCourt,
    updateCourt,
    deleteCourt,
  };
};

export const useUpdateCourtMutation = (id: number) => {
  const { axios } = useAxios();
  const { updateCourts } = useCourtsQuerySetData();
  const { updateCourt } = useCourtQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateCourtVal: CourtFormType) => {
      const response = await axios.put<{ data: CourtType }>(
        api_routes.courts + `/${id}`,
        { ...updateCourtVal }
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateCourtVal) => {
      // ✅ update detail view directly
      updateCourt(id, updateCourtVal);
      updateCourts(id, updateCourtVal);
      toastSuccess("Court updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddCourtMutation = () => {
  const { axios } = useAxios();
  const { addCourts } = useCourtsQuerySetData();
  const { addCourt } = useCourtQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newCourtVal: CourtFormType) => {
      const response = await axios.post<{ data: CourtType }>(
        api_routes.courts,
        { ...newCourtVal }
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCourtVal) => {
      // ✅ update detail view directly
      addCourt(newCourtVal);
      addCourts(newCourtVal);
      toastSuccess("Court created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteCourtMutation = (id: number) => {
  const { axios } = useAxios();
  const { deleteCourts } = useCourtsQuerySetData();
  const { deleteCourt } = useCourtQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{ data: CourtType }>(
        api_routes.courts + `/${id}`
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteCourt(id);
      deleteCourts(id);
      toastSuccess("Court deleted successfully.");
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
