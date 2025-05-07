import { documentAdapter } from "../adapters/document.adapter";
import { DocumentStatus } from "../interfaces/document-status.interface";
import { DocumentUpload } from "../interfaces/document-upload.interface";
import { Document } from "../interfaces/document.interface";

export const uploadDocument = async (userId: string, categoryName: string, file: File): Promise<DocumentUpload> => {
  const formData = new FormData();
  formData.append("uid", userId);
  formData.append("category", categoryName);
  formData.append("file", file);

  const response = await fetch(
    "https://uploadvkg-production.up.railway.app/upload",

    {
      method: "POST",
      headers: {
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload document");
  }

  const data = await response.json();
  return {
    doc_id: data.doc_id,
    message: data.message,
    statusCode: response.status,
  };
};

export const getStatusDocument = async (documentId: string): Promise<DocumentStatus> => {
   const response = await fetch(
     `https://uploadvkg-production.up.railway.app/status/${documentId}`,
     {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
         "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
       },
     }
   );
 
   if (!response.ok) {
     throw new Error("Failed to fetch categories");
   }
 
   const data: DocumentStatus = await response.json();
   return {
      doc_id: data.doc_id,
      statusCode: response.status,
      status: {
        percentage: data.status?.percentage,
        messages: data.status?.messages,
      }
   };
}

export const getDocumentsByUser = async (userId: string): Promise<Document[]> => {
  const response = await fetch(
    `https://uploadvkg-production.up.railway.app/users/${userId}/documents`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": "40b27ff5-665d-4ad6-8c06-e1ea17a3d996",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await response.json();
  return documentAdapter(data);
};