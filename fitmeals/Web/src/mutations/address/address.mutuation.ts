import { postAddress } from "@/src/Apiservices/api/user/address";
import { addressForm } from "@/src/validators/user/address.validator";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAdressMutuation = (userId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: addressForm) => {
      return await postAddress(data);
    },
    onMutate: async (data: addressForm) => {
      await queryClient.cancelQueries({
        queryKey: ["address", userId],
      });
      const previousData = queryClient.getQueryData(["address", userId]);

      queryClient.setQueryData(["address", userId], (old: addressForm[]) => {
        if (!old) return old;
        return [...old, data];
      });
      return { previousData };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(["address", userId], context?.previousData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address", userId],
      });
    },
  });
};
