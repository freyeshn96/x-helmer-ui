import { ReactNode } from "react";

interface Props {
    className?: string;
    text: string;
    icon?: ReactNode;
}

export const CustomDropdownItemText = ({ text, className, icon }: Props) => {
    return (
        <div className={`flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer ${className}`}>
            <div className="flex flex-row gap-2 min-w-0">
                {icon && <span className="text-gray-700">{icon}</span>}
                <span className="text-sm truncate">{text}</span>
            </div>
        </div>
    );
}