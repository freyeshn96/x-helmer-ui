import { useQuery } from "@tanstack/react-query";
import { getCategoriesByUser } from "../services/categories.service";
import { Category } from "../interfaces/category.interface";

export const useFetchDocumentCategoriesByUser = (userId: string) => {
    return useQuery<Category[], Error>({
        queryKey: ["categories", userId],
        queryFn: () => getCategoriesByUser(userId),
    });
}