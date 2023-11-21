import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { GenerateAnonUserInfoPayload, GenerateAnonUserInfoResponse, generateAnonUserInfo } from "./generateAnonUserInfoServices";

const useGenerateAnonUserInfoMutation = (
  options?: UseMutationOptions<
    GenerateAnonUserInfoResponse,
    Error,
    GenerateAnonUserInfoPayload,
    unknown
  >
) => {
  return useMutation({ mutationFn: generateAnonUserInfo, ...options });
};

export { useGenerateAnonUserInfoMutation };
