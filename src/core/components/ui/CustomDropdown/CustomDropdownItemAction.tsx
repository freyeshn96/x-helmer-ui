import { MenuItem } from "@headlessui/react";
import { ReactNode } from "react";

type Props = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  
  export const CustomDropdownItemAction = ({ text, onClick, icon }: Props) => {
    return (
      <MenuItem as={"div"} onClick={onClick} className={"flex flex-row gap-2 items-center cursor-pointer p-2"}>
        {icon && <span className="mr-2 font-semibold">{icon}</span>}
        <span className="font-semibold text-[1rem]">{text}</span>
      </MenuItem>
    );
    // return (
    //   <button
    //     onClick={(e) => {
    //       alert("desdeDentro")
    //       e.stopPropagation();
    //       onClick();
    //     }}
    //     className="flex flex-row items-center gap-1 hover:bg-[#D9E8FF] rounded-[10px] w-full  p-2 text-black cursor-pointer"
    //     disabled={disabled}
    //   >
    //     {icon && <span className="mr-2 font-semibold">{icon}</span>}
    //     <span className="font-semibold text-[1rem]">{text}</span>
    //   </button>
    // );
  };
  