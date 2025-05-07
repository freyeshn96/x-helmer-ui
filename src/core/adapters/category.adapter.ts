import { Category } from "../interfaces/category.interface";
import { DocumentRaw } from "../interfaces/document-raw.interface";
import { Document } from "../interfaces/document.interface";
import { removeDuplicates } from "../utils/array/array.utils";
import { documentAdapter } from "./document.adapter";

export const DocumentCategoryAdapter = (rawResponse: DocumentRaw): Category[] => {

    const documents: Document[] = documentAdapter(rawResponse);
    const categoriesAsString: string[] = documents.map(x => x.category);

    return removeDuplicates<string>(categoriesAsString).map(c => ({
        category: c,
        documents: documents.filter(x => x.category == c)
    }));
}