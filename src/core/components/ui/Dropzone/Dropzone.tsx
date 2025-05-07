import { FileDropzone } from "@/core/interfaces/file-dropzone.interface";
import { ReactNode } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface Props {
    options?: DropzoneOptions;
    onDrop?: (files: File[]) => void;
    acceptedFiles?: FileDropzone[];
    children: ReactNode; 
}

export const Dropzone = ({ options, onDrop, acceptedFiles = [], children }: Props) => {

    const handleOnDrop = (files: File[]) => {
        if (onDrop) {
            onDrop(files);
        }
    }

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: handleOnDrop,
        ...options
    });


    const files = acceptedFiles?.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes - Progress: {file.progress ?? 0}%
        </li>
    ));

    return (<div
        {...getRootProps()}
        className="w-full h-full bg-[#ECF5FF] border-[#000000] border-1 rounded-md flex flex-col justify-center items-center p-4 gap-4">
        <input {...getInputProps()} />
        <div className="flex flex-col gap-2 items-center">
           {children}
        </div>

        <ul>{files}</ul>
    </div>
    );
}