import { useAuth } from "@/core/hooks/useAuth";
import { CategoryDocumentItem } from "./components/CategoryDocumentItem";
import { useFetchDocumentCategoriesByUser } from "@/core/queries/category.query";
import { InputButton } from "../../ui/InputButton/InputButton";
import { Settings } from "lucide-react";

export const DocumentAsideBar = () => {

    const { userId } = useAuth();
    const { data: categories } = useFetchDocumentCategoriesByUser(userId ?? "");

    console.log("categories ", categories)
    return (

        <div
            className="w-full max-w-[280px] h-full sm:rounded-[10px]
             bg-gradient to-white
            border border-[#42566F]
            shadow-[5px_10px_20px_rgba(0,0,0,0.25)]
            box-border px-5 py-6
            flex flex-col
          "
        >
            <span className="font-bold text-xl">Select Documents to chat</span>
            <div className="mt-4 overflow-y-auto scroll-auto flex flex-col gap-2 h-full">
                {/* <DocumentCategoryList categories={categoriesData} /> */}
                {categories?.map((category) => (
                    <CategoryDocumentItem key={category.category} category={category}></CategoryDocumentItem>
                ))}
            </div>
            <div className="mt-auto mb-4"></div>

            <div className="flex flex-1 items-end">
                <InputButton className="!bg-transparent !shadow-none border-none" text="Edit categories" icon={<Settings></Settings>}></InputButton>
            </div>
        </div>

    );
}