export interface DocumentStatus {
    doc_id: string;
    percentage?: number;
    statusCode: number;
    status?: {
        percentage?: number;
        messages?: string[];
    }
}