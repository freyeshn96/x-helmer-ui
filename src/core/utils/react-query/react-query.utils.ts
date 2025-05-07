import { QueryClient } from "@tanstack/react-query";

export function removeItemFromQueryData<T extends { id: string }>(
  queryClient: QueryClient,
  queryKey: unknown[],
  idToRemove: string
) {
  queryClient.setQueryData<T[] | undefined>(queryKey, (oldData) => {
    if (!oldData) return oldData;
    return oldData.filter((item) => item.id !== idToRemove);
  });
}
