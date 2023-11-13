import { AxiosResponse } from "axios";
import apiAnonymous from "@shared/fetcherAnonymous";

type GenerateAnonUserInfoResponse = {
  targetUserId: string;
  myAnonUserId: string;
  anon_user_info_emoji_name: string;
  anon_user_info_emoji_code: string;
  anon_user_info_color_name: string;
  anon_user_info_color_code: string;
};

type GenerateAnonUserInfoPayload = {
  userId: string;
};

const generateAnonUserInfo = async (
  payload: GenerateAnonUserInfoPayload
): Promise<GenerateAnonUserInfoResponse> => {
  const { data } = await apiAnonymous.post<
    AxiosResponse<GenerateAnonUserInfoResponse>
  >(`/api/v1/chat/users/${payload.userId}`, {});
  return data.data;
};

export { generateAnonUserInfo };
export type { GenerateAnonUserInfoResponse, GenerateAnonUserInfoPayload };
