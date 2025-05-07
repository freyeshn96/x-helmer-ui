import { Category } from "@/core/interfaces/category.interface";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { DocumentItem } from "./DocumentItem";
import clsx from "clsx";
import { useDocumentStore } from "@/core/stores/document.store";
import { Document } from "@/core/interfaces/document.interface";
import { useFetchDocumentCategoriesByUser } from "@/core/queries/category.query";
import { useAuth } from "@/core/hooks/useAuth";

interface Props {
  category: Category;
}

export const CategoryDocumentItem = ({ category }: Props) => {

  const selectedDocuments = useDocumentStore((state) => state.selectedDocuments);
  const setSelectedDocuments = useDocumentStore((state) => state.setSelectedDocuments);

  const [allDocumentsIsSelected, setAllDocumentsIsSelected] = useState<boolean>(false);

  const { userId } = useAuth();
  const { data: documents } = useFetchDocumentCategoriesByUser(userId ?? "")

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleToogleSelectDocumentsFromCategory = (category: string) => {
    const currentDocuments: Category[] = documents ?? [];
    const newDocuments: Document[] = [];

    const categoryDocs = currentDocuments.find(x => x.category === category)?.documents ?? [];

    categoryDocs.forEach(doc => {
      const alreadySelected = selectedDocuments.some(c => c.doc_id === doc.doc_id);
      if (!alreadySelected) {
        newDocuments.push(doc);
      }
    });

    const selectAllCategory = categoryDocs.every(x => selectedDocuments.some(p => p.doc_id == x.doc_id) );

    if( selectAllCategory ) {
      const documentsUpdated = selectedDocuments.filter(x => x.category != category);
      setSelectedDocuments(documentsUpdated);
    } else {
      setSelectedDocuments(
        [
          ...selectedDocuments,
          ...newDocuments
        ]      
      )

    }

    
  };

  const handleToogleSelectDocument = (doc: Document) => {
    const currentDocuments: Document[] = selectedDocuments;
    const documentIsCurrentSelected = currentDocuments.some(x => x.doc_id == doc.doc_id);

    let documents: Document[] = [];
    if (documentIsCurrentSelected) {
      documents = currentDocuments.filter(currentDoc => currentDoc.doc_id != doc.doc_id);
    } else {
      documents = [
        ...currentDocuments,
        doc
      ];
    }

    setSelectedDocuments(documents);
  }

  useEffect(() => {
    const categoryDocs = category.documents ?? [];
    const allSelected = categoryDocs.length > 0 && categoryDocs.every(doc =>
      selectedDocuments.some(selected => selected.doc_id === doc.doc_id)
    );
    setAllDocumentsIsSelected(allSelected);
  }, [selectedDocuments, category.documents]);

  return (
    <>
      <div className="flex flex-row gap-2 items-center w-full">
        <input type="checkbox" defaultChecked={allDocumentsIsSelected} />

        <div className={clsx(
          "flex items-centerrounded-md shadow w-full p-2 overflow-hidden",
          allDocumentsIsSelected ? "bg-light-blue-primary" : "bg-white"
        )}>
          <button className="flex-1 min-w-0 text-left  cursor-pointer" onClick={() => handleToogleSelectDocumentsFromCategory(category.category)}>
            <span className="text-lg font-semibold truncate block">
              {category.category}
            </span>
          </button>
          <button onClick={handleCollapsed} className="ml-2 shrink-0 cursor-pointer hover:text-light-blue-primary">
            {isCollapsed ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>

      </div>

      {!isCollapsed && <div className="w-full h-fit flex flex-col gap-4 pl-4">
        {category.documents?.map(doc => <DocumentItem key={doc.doc_id} document={doc} isSelected={selectedDocuments.some(x => x.doc_id == doc.doc_id)} onClick={() => handleToogleSelectDocument(doc)}></DocumentItem>)}
      </div>}
    </>
  );


}