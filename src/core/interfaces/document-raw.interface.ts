import { Document } from "./document.interface"

export interface DocumentRaw {
    documents: {
        [categoryName: string]: Document[];
    }
}