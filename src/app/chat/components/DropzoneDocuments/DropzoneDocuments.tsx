import { Category } from "@/core/interfaces/category.interface";
import { FileUp, Upload } from "lucide-react";
import { useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface Props {
    category?: Category
};

export const DropzoneDocuments = ({ category }: Props) => {

    const [acceptedFiles] = useState<File[]>([]);

    const options: DropzoneOptions = {
        noClick: true,
        maxFiles: 1,
        multiple: false,
        noKeyboard: true,
        accept: {
            'application/pdf': ['.pdf'],
        },
    };

    const handleOnDrop = () => {
       
    }

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: handleOnDrop,
        ...options
    });

    return (
        <div
            {...getRootProps()}
            className="w-full h-full bg-[#ECF5FF] border-[#000000] border-1 rounded-md flex flex-col justify-center items-center p-4 gap-4">
            <input {...getInputProps()} />
            <div className="flex flex-col gap-2 items-center">
                <div className="w-full h-full flex flex-row items-center justify-center text-black">
                    <div className="flex flex-col items-center">
                        {!category && (
                            <span>First, you need to select a category</span>
                        )}
                        {acceptedFiles?.length == 0 && category && (<>
                            <FileUp className="text-[#BDDDFF]" size={89}></FileUp>
                            <span>Drag & drop file to upload or</span>
                            <button onClick={() => open()} className="cursor-pointer bg-[#ABD1F5] w-full p-2 h-8 rounded-md flex flex-row justify-between items-center gap-2">
                                <span>Upload</span>
                                <Upload></Upload>
                            </button>
                        </>)}
                    </div>
                </div>
            </div>

            {/* <ul>{files}</ul> */}
        </div>
    );
}