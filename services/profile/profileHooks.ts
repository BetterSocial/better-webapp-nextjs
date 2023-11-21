import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPublicProfile, ProfileResponse } from "./profileServices";

const useGetProfile = (
  username: string,
  options?: UseQueryOptions<
    ProfileResponse,
    unknown,
    ProfileResponse,
    Array<string>
  >
) => {
  return useQuery({
    ...options,
    queryKey: ["profile", username],
    queryFn: () => getPublicProfile(username),
  });
};

export { useGetProfile };