import { AxiosResponse } from "axios";
import apiAnonymous from "@shared/fetcherAnonymous";

type User = {
  user_id: string;
  human_id: string;
  country_code: string;
  username: string;
  real_name: null;
  last_active_at: string;
  profile_pic_path: string;
  profile_pic_asset_id: string;
  profile_pic_public_id: string;
  status: string;
  bio: string;
  is_banned: boolean;
  is_anonymous: boolean;
  allow_anon_dm: boolean;
  only_received_dm_from_user_following: boolean;
  is_backdoor_user: boolean;
  verified_status: string;
  anon_user_info_color_code: string;
  anon_user_info_color_name: string;
  anon_user_info_emoji_code: string;
  anon_user_info_emoji_name: string;
};

type Message = {
  id: string;
  text: string;
  html: string;
  type: string;
  user: any;
  attachments: [];
  latest_reactions: [];
  own_reactions: [];
  reaction_counts: {};
  reaction_scores: {};
  reply_count: number;
  deleted_reply_count: number;
  message: string;
};

type InitChatAnonymousResponse = {
  message: Message;
  durationg: string;
  members: User[];
};

type InitChatAnonymousPayload = {
  anon_user_info_color_code: string;
  anon_user_info_color_name: string;
  anon_user_info_emoji_code: string;
  anon_user_info_emoji_name: string;
  members: string[];
  message: string;
};

const initChatAnonymous = async (
  payload: InitChatAnonymousPayload
): Promise<InitChatAnonymousResponse> => {
  const { data } = await apiAnonymous.post<AxiosResponse<InitChatAnonymousResponse>>(
    "/api/v1/chat/init-chat-anonymous",
    payload
  );
  return data.data;
};

export { initChatAnonymous };
export type { InitChatAnonymousResponse, InitChatAnonymousPayload, User };
