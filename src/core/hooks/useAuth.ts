import { useQuery } from "@tanstack/react-query";
import { User } from "../interfaces/user.interface";

export const useAuth = () => {
  const {
    data,
    isLoading,
    isError,
    status,
    isSuccess,
  } = useQuery<User, Error>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      const data = await response.json();
      const user: User = {
        user_id: data.data.id,
        email: data.data.email,
      }

      return user;
    },
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = isSuccess && status === "success";
  const userId = isAuthenticated ? data?.user_id : null;

  return {
    isLoading,
    isError,
    isAuthenticated,
    userId,
  };
};
