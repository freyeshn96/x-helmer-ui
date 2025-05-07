import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  icon?: ReactNode;
};

export const CustomDropdownList = ({ children, icon }: Props) => {
  return (
    <Menu as={"div"}>
      <MenuButton as={"button"} className={"rounded-md p-2 cursor-pointer hover:bg-gray-400"}>
        {icon}
      </MenuButton>
      <MenuItems as={"div"}  anchor="bottom" className={"w-fit h-fit bg-[#ECF5FF] text-black p-2 rounded-md"}>
        {children}
      </MenuItems>
    </Menu>
  );
}

// export const CustomDropdownList = ({ children, icon }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);


//   return (

//     <div className="relative inline-block cursor-pointer" ref={dropdownRef}>
//       <button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="p-1 rounded hover:bg-gray-200 cursor-pointer"
//       >
//         {icon && <span className="text-gray-700">{icon}</span>}
//       </button>

//       {isOpen && (
//         createPortal(<div className="absolute right-0 mt-2 w-fit p-4 justify-center flex flex-col gap-2  bg-[#ECF5FF] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] z-50">
//           {children}
//         </div>, document.body)

//       )}
//     </div>
//   )
// }