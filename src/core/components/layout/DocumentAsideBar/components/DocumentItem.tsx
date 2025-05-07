import { Document } from "@/core/interfaces/document.interface";
import clsx from "clsx";

interface Props {
  document: Document;
  isSelected?: boolean;
  onClick?: () => void;
};

export const DocumentItem = ({ document, isSelected, onClick }: Props) => {

  return (
    <div className="flex flex-row gap-2 items-center w-full">
      <input type="checkbox" />

      <button className={clsx(
        "flex items-centerrounded-md shadow w-full p-2 overflow-hidden cursor-pointer",
        isSelected ? "bg-light-blue-primary" : "bg-white")} onClick={onClick}>
        <div className="flex-1 min-w-0">
          <span className="text-lg text-left font-semibold truncate block">
            {document.name}
          </span>
        </div>

      </button>

    </div>
  );
}