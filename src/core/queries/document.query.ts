import { useQuery } from "@tanstack/react-query";
import { getDocumentsByUser } from "../services/document.service";
import { Document } from "../interfaces/document.interface";

export const useFetchDocumentsByUserId = (userId: string) => {
    return useQuery<Document[], Error>({
        queryKey: ["documents", userId],
        queryFn: () => getDocumentsByUser(userId),
    });
}