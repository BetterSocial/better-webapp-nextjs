import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { InitChatAnonymousPayload, InitChatAnonymousResponse, initChatAnonymous } from "./initChatAnonymousServices";

const useInitChatAnonymousMutation = (
  options?: UseMutationOptions<
    InitChatAnonymousResponse,
    Error,
    InitChatAnonymousPayload,
    unknown
  >
) => {
  return useMutation({ mutationFn: initChatAnonymous, ...options });
};

export { useInitChatAnonymousMutation };
