import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useAxios } from "../useAxios";
import { PaginationType, InstallationQueryType } from "../../utils/types";
import { api_routes } from "../../utils/api_routes";
import { QueryInitialPageParam, QueryTotalCount } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";

export const InstallationsQueryKey = "installations";

export const useInstallationsQuery: () => UseQueryResult<
  PaginationType<{ installation: InstallationQueryType[] }>,
  unknown
> = () => {
  const { axios } = useAxios();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || QueryInitialPageParam.toString();
  const limit = searchParams.get("limit") || QueryTotalCount.toString();
  const search = searchParams.get("search") || "";
  return useQuery({
    queryKey: [InstallationsQueryKey, page, limit, search],
    queryFn: async () => {
      const response = await axios.get<{
        data: PaginationType<{ installation: InstallationQueryType[] }>;
      }>(
        api_routes.installations +
          `?page=${page}&limit=${limit}&search=${search}`
      );
      return response.data.data;
    },
  });
};
