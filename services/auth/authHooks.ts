import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import {
  CheckExchangeTokenPayload,
  CheckExchangeTokenResponse,
  checkExchangeToken,
} from "./authServices";
import { AxiosResponse } from "axios";
import { User } from "../initChatAnonymous/initChatAnonymousServices";

const useCheckExchangeTokenMutation = (
  options?: UseMutationOptions<
    AxiosResponse<User> & CheckExchangeTokenResponse,
    Error,
    CheckExchangeTokenPayload,
    unknown
  >
) => {
  return useMutation({ mutationFn: checkExchangeToken, ...options });
};

export { useCheckExchangeTokenMutation };
