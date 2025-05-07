export interface ChatMessage {
    id: string;
    chat_id: string;
    sender: "human" | "assistant" | "system";
    content: string;
    created_at: string;
    document_name?: string[]; // Optional field for document names
}