import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import {
  PaginationType,
  CrimesByCriminalsFormType,
  CrimesByCriminalsType,
} from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const CrimesByCriminalsKey = "crimes_by_criminal";
export const CrimesByCriminalsQueryKey = "crimes_by_criminals";

export const useCrimesByCriminalsQuery: (params: {
  crimeId: number;
}) => UseQueryResult<
  PaginationType<{ crimesByCriminals: CrimesByCriminalsType[] }>,
  unknown
> = ({ crimeId }) => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  return useQuery({
    queryKey: [CrimesByCriminalsQueryKey, crimeId, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{
          crimesByCriminals: CrimesByCriminalsType[];
        }>;
      }>(
        api_routes.crimesByCriminals +
          `/list/${crimeId}?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data.data;
    },
  });
};

export const useCrimesByCriminalQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CrimesByCriminalsType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [CrimesByCriminalsKey, id],
    queryFn: async () => {
      const response = await axios.get<{
        data: CrimesByCriminalsType;
      }>(api_routes.crimesByCriminals + `/${id}`);
      return response.data.data;
    },
    enabled,
  });
};

export const useCrimesByCriminalsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addCrimesByCriminals = (
    crimeId: number,
    newCrimesByCriminalsVal: CrimesByCriminalsType
  ) => {
    queryClient.setQueryData<
      PaginationType<{
        crimesByCriminals: CrimesByCriminalsType[];
      }>
    >(
      [
        CrimesByCriminalsQueryKey,
        crimeId,
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
            crimesByCriminals: [
              newCrimesByCriminalsVal,
              ...prev.crimesByCriminals,
            ],
          };
        }
      }
    );
  };

  const updateCrimesByCriminals = (
    id: number,
    crimeId: number,
    updateCrimesByCriminalsVal: CrimesByCriminalsType
  ) => {
    queryClient.setQueryData<
      PaginationType<{
        crimesByCriminals: CrimesByCriminalsType[];
      }>
    >([CrimesByCriminalsQueryKey, crimeId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          crimesByCriminals: prev.crimesByCriminals.map((crimesByCriminals) =>
            crimesByCriminals.id === id
              ? {
                  ...crimesByCriminals,
                  ...updateCrimesByCriminalsVal,
                }
              : crimesByCriminals
          ),
        };
      }
    });
  };

  const deleteCrimesByCriminals = (id: number, crimeId: number) => {
    queryClient.setQueryData<
      PaginationType<{
        crimesByCriminals: CrimesByCriminalsType[];
      }>
    >([CrimesByCriminalsQueryKey, crimeId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          crimesByCriminals: prev.crimesByCriminals.filter(
            (crimesByCriminals) => crimesByCriminals.id !== id
          ),
        };
      }
    });
  };

  return {
    addCrimesByCriminals,
    updateCrimesByCriminals,
    deleteCrimesByCriminals,
  };
};

export const useCrimesByCriminalQuerySetData = () => {
  const queryClient = useQueryClient();

  const addCrimesByCriminal = (
    newCrimesByCriminalsVal: CrimesByCriminalsType
  ) => {
    queryClient.setQueryData<CrimesByCriminalsType>(
      [CrimesByCriminalsKey, newCrimesByCriminalsVal.id],
      newCrimesByCriminalsVal
    );
  };

  const updateCrimesByCriminal = (
    id: number,
    updateCrimesByCriminalsVal: CrimesByCriminalsType
  ) => {
    queryClient.setQueryData<CrimesByCriminalsType>(
      [CrimesByCriminalsKey, id],
      updateCrimesByCriminalsVal
    );
  };

  const deleteCrimesByCriminal = (id: number) => {
    queryClient.setQueryData<CrimesByCriminalsType>(
      [CrimesByCriminalsKey, id],
      undefined
    );
  };

  return {
    addCrimesByCriminal,
    updateCrimesByCriminal,
    deleteCrimesByCriminal,
  };
};

export const useUpdateCrimesByCriminalsMutation = (
  id: number,
  crimeId: number
) => {
  const { axios } = useAxios();
  const { updateCrimesByCriminals } = useCrimesByCriminalsQuerySetData();
  const { updateCrimesByCriminal } = useCrimesByCriminalQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (
      updateCrimesByCriminalsVal: CrimesByCriminalsFormType
    ) => {
      const response = await axios.put<{
        data: CrimesByCriminalsType;
      }>(
        api_routes.crimesByCriminals + `/update/${id}/${crimeId}`,
        updateCrimesByCriminalsVal
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateCrimesByCriminalsVal) => {
      // ✅ update detail view directly
      updateCrimesByCriminal(id, updateCrimesByCriminalsVal);
      updateCrimesByCriminals(id, crimeId, updateCrimesByCriminalsVal);
      toastSuccess("Crimes By Criminals updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddCrimesByCriminalsMutation = (crimeId: number) => {
  const { axios } = useAxios();
  const { addCrimesByCriminal } = useCrimesByCriminalQuerySetData();
  const { addCrimesByCriminals } = useCrimesByCriminalsQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newCrimesByCriminalsVal: CrimesByCriminalsFormType) => {
      const response = await axios.post<{
        data: CrimesByCriminalsType;
      }>(
        api_routes.crimesByCriminals + `/create/${crimeId}`,
        newCrimesByCriminalsVal
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCrimesByCriminalsVal) => {
      // ✅ update detail view directly
      addCrimesByCriminal(newCrimesByCriminalsVal);
      addCrimesByCriminals(crimeId, newCrimesByCriminalsVal);
      toastSuccess("Crimes By Criminals created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteCrimesByCriminalsMutation = (
  id: number,
  crimeId: number
) => {
  const { axios } = useAxios();
  const { deleteCrimesByCriminal } = useCrimesByCriminalQuerySetData();
  const { deleteCrimesByCriminals } = useCrimesByCriminalsQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{
        data: CrimesByCriminalsType;
      }>(api_routes.crimesByCriminals + `/${id}`);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteCrimesByCriminal(id);
      deleteCrimesByCriminals(id, crimeId);
      toastSuccess("Crimes By Criminals deleted successfully.");
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
