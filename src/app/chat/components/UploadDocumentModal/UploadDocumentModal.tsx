import { InputButton } from "@/core/components/ui/InputButton/InputButton";
import { ModalDialog } from "@/core/components/ui/ModalDialog/ModalDialog";
import { Plus } from "lucide-react";
import { DropzoneDocuments } from "../DropzoneDocuments/DropzoneDocuments";
import { useAuth } from "@/core/hooks/useAuth";
import { useFetchDocumentCategoriesByUser } from "@/core/queries/category.query";
import { CategoryItem } from "./CategoryItem";
import { Category } from "@/core/interfaces/category.interface";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose?: () => void;
}

export const UploadDocumentModal = ({ isOpen, onClose }: Props) => {

    const { userId } = useAuth();
    const queryClient = useQueryClient();
    
    const { data: categoriesWithDocuments } = useFetchDocumentCategoriesByUser(userId ?? "");
    const [categories, setCategories] = useState<Category[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    const handleClickSelectCategory = (category: Category) => {
        setSelectedCategory(category)
    };


    const handleAddCategory = () => {

        if( categories.some(x => x.isNewCategory) ) {
            return;
        }
        
        const newCategory: Category = {
            category: "New category",
            documents: [],
            isNewCategory: true
        }

        setCategories([
            newCategory,
            ...categories
        ])

    }

    const handleOnSaveCategory = (categoryName: string) => {

        const currentCategoryIndex = categories.findIndex(x => x.isNewCategory);

        if( currentCategoryIndex > -1 ) {
            
            const currentCategories = categories;
            currentCategories[currentCategoryIndex].category = categoryName;
            currentCategories[currentCategoryIndex].isNewCategory = false;
            setCategories(currentCategories);

        }

    };

    useEffect( () => {
        if( categoriesWithDocuments ) {
            setCategories(categoriesWithDocuments);
        }
    }, [categoriesWithDocuments])


    return (
        <ModalDialog isOpen={isOpen} onClose={onClose} title="Select a category to upload your document.">
            <div className="flex flex-row gap-4 h-full text-black">
                <div className="flex flex-col gap-2 max-h-fit w-[250px] min-w-[250px]">
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                        {categories?.map(cat => <CategoryItem 
                            isSelected={selectedCategory?.category == cat.category} 
                            key={cat.category} 
                            category={cat} 
                            onClick={() => handleClickSelectCategory(cat)}
                            onSaveChanges={handleOnSaveCategory}></CategoryItem>)}
                    </div>

                    <div className="">
                        <InputButton type="primary" text="Add category" icon={<Plus></Plus>} onClick={handleAddCategory}></InputButton>
                    </div>
                </div>

                <div className="w-full h-full">
                    <DropzoneDocuments userId={userId ?? ""} category={selectedCategory}>

                    </DropzoneDocuments>
                </div>
            </div>
        </ModalDialog>
    );
}