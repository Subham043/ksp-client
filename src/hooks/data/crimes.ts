import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { PaginationType, CrimeType, CrimeFormType } from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const CrimeKey = "crime";
export const CrimesQueryKey = "crimes";

export const useCrimesQuery: () => UseQueryResult<
  PaginationType<{ crime: CrimeType[] }>,
  unknown
> = () => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [CrimesQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{ crime: CrimeType[] }>;
      }>(api_routes.crimes + `?page=${page}&limit=${limit}&search=${search}`);
      return response.data.data;
    },
  });
};

export const useCrimeQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<CrimeType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [CrimeKey, id],
    queryFn: async () => {
      const response = await axios.get<{ data: CrimeType }>(
        api_routes.crimes + `/${id}`
      );
      return response.data.data;
    },
    enabled,
  });
};

export const useCrimesQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addCrimes = (newCrimeVal: CrimeType) => {
    queryClient.setQueryData<PaginationType<{ crime: CrimeType[] }>>(
      [CrimesQueryKey, QueryInitialPageParam.toString(), limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            crime: [newCrimeVal, ...prev.crime],
          };
        }
      }
    );
  };

  const updateCrimes = (id: number, updateCrimeVal: CrimeType) => {
    queryClient.setQueryData<PaginationType<{ crime: CrimeType[] }>>(
      [CrimesQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            crime: prev.crime.map((crime) =>
              crime.id === id ? updateCrimeVal : crime
            ),
          };
        }
      }
    );
  };

  const deleteCrimes = (id: number) => {
    queryClient.setQueryData<PaginationType<{ crime: CrimeType[] }>>(
      [CrimesQueryKey, page, limit, search],
      (prev) => {
        if (prev) {
          return {
            ...prev,
            crime: prev.crime.filter((crime) => crime.id !== id),
          };
        }
      }
    );
  };

  return {
    addCrimes,
    updateCrimes,
    deleteCrimes,
  };
};

export const useCrimeQuerySetData = () => {
  const queryClient = useQueryClient();

  const addCrime = (newCrimeVal: CrimeType) => {
    queryClient.setQueryData<CrimeType>(
      [CrimeKey, newCrimeVal.id],
      newCrimeVal
    );
  };

  const updateCrime = (id: number, updateCrimeVal: CrimeType) => {
    queryClient.setQueryData<CrimeType>([CrimeKey, id], (prev) => ({
      ...prev,
      ...updateCrimeVal,
    }));
  };

  const deleteCrime = (id: number) => {
    queryClient.setQueryData<CrimeType>([CrimeKey, id], undefined);
  };

  return {
    addCrime,
    updateCrime,
    deleteCrime,
  };
};

export const useUpdateCrimeMutation = (id: number) => {
  const { axios } = useAxios();
  const { updateCrimes } = useCrimesQuerySetData();
  const { updateCrime } = useCrimeQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateCrimeVal: CrimeFormType) => {
      const response = await axios.put<{ data: CrimeType }>(
        api_routes.crimes + `/${id}`,
        { ...updateCrimeVal }
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateCrimeVal) => {
      // ✅ update detail view directly
      updateCrime(id, updateCrimeVal);
      updateCrimes(id, updateCrimeVal);
      toastSuccess("Crime updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddCrimeMutation = () => {
  const { axios } = useAxios();
  const { addCrimes } = useCrimesQuerySetData();
  const { addCrime } = useCrimeQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newCrimeVal: CrimeFormType) => {
      const response = await axios.post<{ data: CrimeType }>(
        api_routes.crimes,
        { ...newCrimeVal }
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newCrimeVal) => {
      // ✅ update detail view directly
      addCrime(newCrimeVal);
      addCrimes(newCrimeVal);
      toastSuccess("Crime created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteCrimeMutation = (id: number) => {
  const { axios } = useAxios();
  const { deleteCrimes } = useCrimesQuerySetData();
  const { deleteCrime } = useCrimeQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{ data: CrimeType }>(
        api_routes.crimes + `/${id}`
      );
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteCrime(id);
      deleteCrimes(id);
      toastSuccess("Crime deleted successfully.");
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
