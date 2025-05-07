import { CustomDropdownItemAction } from "@/core/components/ui/CustomDropdown/CustomDropdownItemAction";
import { CustomDropdownList } from "@/core/components/ui/CustomDropdown/CustomDropdownList";
import { Category } from "@/core/interfaces/category.interface";
import clsx from "clsx";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
    category: Category;
    isSelected?: boolean;
    onClick: () => void;
};

export const CategoryItem = ({ category, onClick, isSelected = false }: Props) => {

    const oldText = category.category;
    const [currentText, setCurrentText] = useState<string>(category.category);

    const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLInputElement | null>(null);

    const handleEditButton = () => {
        setIsEditorMode(true);
    };

    const handleCancelButton = () => {
        setCurrentText(oldText);
        setIsEditorMode(false);
    };

    const handleSaveChanges = () => {
        setIsEditorMode(false);
    };
    
    useEffect( () => {
        if( isEditorMode ) {
            dropdownRef.current?.focus();
        }
    }, [isEditorMode]);

    return (
        <div className={clsx(
            "flex flex-row justify-between items-center px-2 cursor-pointer shrink-0 hover:bg-light-blue-primary w-full shadow rounded-md truncate",
            isSelected ? "bg-light-blue-primary" : " bg-white"
        )}>
            {!isEditorMode && (
                <button onClick={onClick} className="p-2 flex cursor-pointer w-full h-11 min-h-11 text-left truncate">
                    <span>{category.category}</span>
                </button>)}

            {isEditorMode && (
                <div className="flex flex-row gap-2 bg-white w-full">
                    <input ref={dropdownRef} 
                        className="w-full h-11 min-h-11" 
                        placeholder={category.category}
                        value={currentText}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCurrentText(e.currentTarget.value);
                    }}></input>

                    <div className="flex flex-row gap-2">
                        <button onClick={handleSaveChanges} className="cursor-pointer p-2 rounded-md hover:bg-gray-300"><Save></Save></button>
                        <button onClick={handleCancelButton} className="cursor-pointer p-2 rounded-md hover:bg-gray-300"><X></X></button>
                    </div>
                </div>
            )}

            {!isEditorMode && (
                <CustomDropdownList icon={<Pencil size={16}></Pencil>}>
                    <CustomDropdownItemAction text="Rename" onClick={handleEditButton} icon={<Pencil size={16}></Pencil>}></CustomDropdownItemAction>
                    <CustomDropdownItemAction text="Delete" onClick={onClick} icon={<Trash2 size={16}></Trash2>}></CustomDropdownItemAction>
                </CustomDropdownList>
            )}

        </div>
    );
};