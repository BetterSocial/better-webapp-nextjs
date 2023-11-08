import { useQuery, UseQueryOptions } from "react-query";
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
  return useQuery(
    ["profile", username],
    () => getPublicProfile(username),
    options
  );
};

export { useGetProfile };
