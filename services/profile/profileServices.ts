import api from "shared/fetcher";

const getPublicProfile = async (username: string) => {
  const { data } = await api.get(
    `/api/v1/profiles/get-profile-public/${username}`
  );
  return data;
};

export { getPublicProfile };
