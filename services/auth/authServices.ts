import { AxiosResponse } from "axios";
import api from "../../shared/fetcher";
import { User } from "../initChatAnonymous/initChatAnonymousServices";

type CheckExchangeTokenResponse = {
  code: number;
  data: boolean;
  message: string;
  token: string;
  anonymousToken: string;
  refresh_token: string;
};

type CheckExchangeTokenPayload = { exchangeToken: string };

const checkExchangeToken = async (
  payload: CheckExchangeTokenPayload
): Promise<AxiosResponse<User> & CheckExchangeTokenResponse> => {
  const { data } = await api.post<AxiosResponse<User> & CheckExchangeTokenResponse>(
    "/api/v1/users/authenticate-web",
    payload
  );
  return data;
};

export { checkExchangeToken };
export type { CheckExchangeTokenResponse, CheckExchangeTokenPayload };
