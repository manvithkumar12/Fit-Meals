import { UpdateTargets } from "@/app/api/actions/Tracker/UpdateData";
import { targetDataType } from "@/src/types/Trackers/TargetData.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeTargets = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: targetDataType) => UpdateTargets(newData, userId),

    onMutate: async (newData: targetDataType) => {
      await queryClient.cancelQueries({
        queryKey: ["targetData", userId],
      });

      const previousData = queryClient.getQueryData(["targetData", userId]);

      queryClient.setQueryData(["targetData", userId], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          targets: newData, 
        };
      });

      return { previousData };
    },

    onError: (err, newData, context) => {
      queryClient.setQueryData(["targetData", userId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["targetData", userId],
      });
    },
  });
};
