import { DocumentCategoryAdapter } from "../adapters/category.adapter";
import { Category } from "../interfaces/category.interface";

export const getCategoriesByUser = async (userId: string): Promise<Category[]> => {
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
  return DocumentCategoryAdapter(data);
};