import { InputButton } from "@/core/components/ui/InputButton/InputButton";
import { ModalDialog } from "@/core/components/ui/ModalDialog/ModalDialog";
import { Plus } from "lucide-react";
import { DropzoneDocuments } from "../DropzoneDocuments/DropzoneDocuments";
import { useAuth } from "@/core/hooks/useAuth";
import { useFetchDocumentCategoriesByUser } from "@/core/queries/category.query";
import { CategoryItem } from "./CategoryItem";
import { Category } from "@/core/interfaces/category.interface";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose?: () => void;
}

export const UploadDocumentModal = ({ isOpen, onClose }: Props) => {

    const { userId } = useAuth();
    const queryClient = useQueryClient();

    const { data: categoriesWithDocuments } = useFetchDocumentCategoriesByUser(userId ?? "");

    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    const handleClickSelectCategory = (category: Category) => {
        setSelectedCategory(category)
    };


    const handleAddCategory = () => {
        const newCategory: Category = {
            category: "New category",
            documents: [],
            isNewCategory: true
        }

        queryClient.setQueryData(["categories", userId], (oldData: Category[]) => [
            newCategory,
            ...(oldData ?? []),
        ]);


    }


    return (
        <ModalDialog isOpen={isOpen} onClose={onClose} title="Select a category to upload your document.">
            <div className="flex flex-row gap-4 h-full text-black">
                <div className="flex flex-col gap-2 max-h-fit">
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                        {categoriesWithDocuments?.map(cat => <CategoryItem isSelected={selectedCategory?.category == cat.category} key={cat.category} category={cat} onClick={() => handleClickSelectCategory(cat)}></CategoryItem>)}
                    </div>

                    <div className="">
                        <InputButton type="primary" text="Add category" icon={<Plus></Plus>} onClick={handleAddCategory}></InputButton>
                    </div>
                </div>

                <div className="w-full h-full">
                    <DropzoneDocuments category={selectedCategory}>

                    </DropzoneDocuments>
                </div>
            </div>
        </ModalDialog>
    );
}