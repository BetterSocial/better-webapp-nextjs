import api from "shared/fetcher";

export interface ProfileResponse {
  user_id: string;
  country_code: string;
  username: string;
  profile_pic_path: string;
  profile_pic_asset_id: null;
  profile_pic_public_id: null;
  bio: null;
  is_anonymous: boolean;
  allow_anon_dm: boolean;
  only_received_dm_from_user_following: boolean;
  verified_status: string;
  following_symbol: string;
  follower_symbol: string;
}

const getPublicProfile = async (username: string) => {
  const { data } = await api.get<ProfileResponse>(
    `/api/v1/profiles/get-profile-public/${username}`
  );
  return data;
};

export { getPublicProfile };
