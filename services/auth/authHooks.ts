import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { User } from "@services/initChatAnonymous/initChatAnonymousServices";
import {
  CheckExchangeTokenPayload,
  CheckExchangeTokenResponse,
  checkExchangeToken,
} from "@services/auth/authServices";

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
