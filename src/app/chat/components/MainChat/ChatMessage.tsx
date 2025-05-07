"use client";

import { CustomDropdownItemText } from "@/core/components/ui/CustomDropdown/CustomDropdownItemText";
import { CustomDropdownList } from "@/core/components/ui/CustomDropdown/CustomDropdownList";
import { CustomDropdownSeparator } from "@/core/components/ui/CustomDropdown/CustomDropdownSeparator";
import { Book } from "lucide-react";

interface Props {
  message: {
    id: string;
    sender: string;
    content: string;
    created_at: string;
    document_name: string[];
  };
}

export const ChatMessage = ({ message: msg }: Props) => {
  const isUser = msg.sender === "human";

  return (
    <div
      key={msg.id}
      className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="flex flex-col gap-1">
        {isUser && (
          <div className="flex flex-row justify-end w-full">
            <CustomDropdownList icon={<Book size={16} />}>
              <CustomDropdownItemText text={"From"}></CustomDropdownItemText>
              <CustomDropdownSeparator></CustomDropdownSeparator>
              {msg.document_name.map((doc) => (
                <CustomDropdownItemText
                  key={doc}
                  text={doc}
                ></CustomDropdownItemText>
              ))}
            </CustomDropdownList>
          </div>
        )}
        <div className="flex flex-row gap-2">
          {!isUser && (
            <div>
              {/* <Ellipse size={"32"} showAsLoading={true}></Ellipse> */}
              {/* <span>Hero</span> */}
            </div>
          )}
          <div
            className={`p-3 rounded-md ${isUser ? "max-w-xl bg-blue-100" : "w-full bg-gray-100"
              }`}
          >
            {isUser ? (
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {msg.content}
              </p>
            ) : (
              <div
                className="custom-prose"
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/```html|```/g, "").trim(),
                }}
              />
            )}

            <span className="text-xs text-gray-500 block mt-1">
              {new Date(msg.created_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
