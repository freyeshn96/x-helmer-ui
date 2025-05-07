import { DocumentRaw } from "../interfaces/document-raw.interface";
import { Document } from "../interfaces/document.interface"

export const documentAdapter = (raw: DocumentRaw): Document[] => {
    return Object.entries(raw.documents).flatMap(
        ([categoryName, documents]) => {
            return documents.map((document) => ({
                category: categoryName,
                doc_id: document.doc_id,
                name: document.name,
                status: document.status,
            }));
        }
    );
}