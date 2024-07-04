import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import {
  PaginationType,
  VisitorFormType,
  VisitorType,
} from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../useToast";
import { isAxiosError } from "axios";

export const VisitorKey = "visitor";
export const VisitorsQueryKey = "visitors";
export const VisitorsSelectQueryKey = "visitors_select";

export const useVisitorsQuery: (params: {
  jailId: number;
}) => UseQueryResult<PaginationType<{ visitor: VisitorType[] }>, unknown> = ({
  jailId,
}) => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  return useQuery({
    queryKey: [VisitorsQueryKey, jailId, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{
          visitor: VisitorType[];
        }>;
      }>(
        api_routes.visitors +
          `/list/${jailId}?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data.data;
    },
  });
};

export const useVisitorsSelectQuery: (params: {
  search?: string;
  enabled?: boolean;
}) => UseQueryResult<PaginationType<{ visitor: VisitorType[] }>, unknown> = ({
  search = "",
  enabled = true,
}) => {
  const { axios } = useAxios();

  return useQuery({
    queryKey: [VisitorsSelectQueryKey, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{
          visitor: VisitorType[];
        }>;
      }>(api_routes.visitors + `/list-all?page=1&limit=20&search=${search}`);
      return response.data.data;
    },
    enabled,
  });
};

export const useVisitorQuery: (
  id: number,
  enabled: boolean
) => UseQueryResult<VisitorType, unknown> = (id, enabled) => {
  const { axios } = useAxios();
  return useQuery({
    queryKey: [VisitorKey, id],
    queryFn: async () => {
      const response = await axios.get<{
        data: VisitorType;
      }>(api_routes.visitors + `/${id}`);
      return response.data.data;
    },
    enabled,
  });
};

export const useVisitorsQuerySetData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";

  const addVisitors = (jailId: number, newVisitorVal: VisitorType) => {
    queryClient.setQueryData<
      PaginationType<{
        visitor: VisitorType[];
      }>
    >(
      [
        VisitorsQueryKey,
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
            visitor: [newVisitorVal, ...prev.visitor],
          };
        }
      }
    );
  };

  const updateVisitors = (
    id: number,
    jailId: number,
    updateVisitorVal: VisitorType
  ) => {
    queryClient.setQueryData<
      PaginationType<{
        visitor: VisitorType[];
      }>
    >([VisitorsQueryKey, jailId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          visitor: prev.visitor.map((visitor) =>
            visitor.id === id
              ? {
                  ...visitor,
                  ...updateVisitorVal,
                }
              : visitor
          ),
        };
      }
    });
  };

  const deleteVisitors = (id: number, jailId: number) => {
    queryClient.setQueryData<
      PaginationType<{
        visitor: VisitorType[];
      }>
    >([VisitorsQueryKey, jailId, page, limit, search], (prev) => {
      if (prev) {
        return {
          ...prev,
          visitor: prev.visitor.filter((visitor) => visitor.id !== id),
        };
      }
    });
  };

  return {
    addVisitors,
    updateVisitors,
    deleteVisitors,
  };
};

export const useVisitorQuerySetData = () => {
  const queryClient = useQueryClient();

  const addVisitor = (newVisitorVal: VisitorType) => {
    queryClient.setQueryData<VisitorType>(
      [VisitorKey, newVisitorVal.id],
      newVisitorVal
    );
  };

  const updateVisitor = (id: number, updateVisitorVal: VisitorType) => {
    queryClient.setQueryData<VisitorType>([VisitorKey, id], updateVisitorVal);
  };

  const deleteVisitor = (id: number) => {
    queryClient.setQueryData<VisitorType>([VisitorKey, id], undefined);
  };

  return {
    addVisitor,
    updateVisitor,
    deleteVisitor,
  };
};

export const useUpdateVisitorMutation = (id: number, jailId: number) => {
  const { axios } = useAxios();
  const { updateVisitors } = useVisitorsQuerySetData();
  const { updateVisitor } = useVisitorQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (updateVisitorVal: VisitorFormType) => {
      const response = await axios.put<{
        data: VisitorType;
      }>(api_routes.visitors + `/${id}`, updateVisitorVal);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (updateVisitorVal) => {
      // ✅ update detail view directly
      updateVisitor(id, updateVisitorVal);
      updateVisitors(id, jailId, updateVisitorVal);
      toastSuccess("Visitor updated successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useAddVisitorMutation = (jailId: number) => {
  const { axios } = useAxios();
  const { addVisitors } = useVisitorsQuerySetData();
  const { addVisitor } = useVisitorQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async (newVisitorVal: VisitorFormType) => {
      const response = await axios.post<{
        data: VisitorType;
      }>(api_routes.visitors + `/create/${jailId}`, newVisitorVal);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: (newVisitorVal) => {
      // ✅ update detail view directly
      addVisitor(newVisitorVal);
      addVisitors(jailId, newVisitorVal);
      toastSuccess("Visitor created successfully.");
    },
    onError: (error) => {
      if (!isAxiosError(error)) {
        toastError("Something went wrong. Please try again later.");
      }
    },
  });
};

export const useDeleteVisitorMutation = (id: number, jailId: number) => {
  const { axios } = useAxios();
  const { deleteVisitors } = useVisitorsQuerySetData();
  const { deleteVisitor } = useVisitorQuerySetData();
  const { toastSuccess, toastError } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete<{
        data: VisitorType;
      }>(api_routes.visitors + `/${id}`);
      return response.data.data;
    },
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      deleteVisitor(id);
      deleteVisitors(id, jailId);
      toastSuccess("Visitor deleted successfully.");
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
