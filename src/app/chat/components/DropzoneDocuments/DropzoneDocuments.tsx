import { Category } from "@/core/interfaces/category.interface";
import { DocumentUpload } from "@/core/interfaces/document-upload.interface";
import { getStatusDocument, uploadDocument } from "@/core/services/document.service";
import { FileUp, Upload } from "lucide-react";
import { useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface Props {
    userId: string,
    category?: Category
};

export const DropzoneDocuments = ({ userId, category }: Props) => {

    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [currentProgress, setCurrentProgress] = useState<number>(0);

    const options: DropzoneOptions = {
        noClick: true,
        maxFiles: 1,
        multiple: false,
        noKeyboard: true,
        accept: {
            'application/pdf': ['.pdf'],
        },
    };

    const handleOnDrop = (acceptedFiles: File[]) => {
        setAcceptedFiles(acceptedFiles);
        handleUploadAndTrackStatus(acceptedFiles[0])
    }

    const { getRootProps, getInputProps, open } = useDropzone({
        onDrop: handleOnDrop,
        ...options
    });

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));


    const handleUploadAndTrackStatus = async (file: File) => {
        if (!userId || !category) return;

        const uploadResponse = await uploadDocument(userId, category.category, file);
        console.log("Upload response:", uploadResponse);

        const documentId = uploadResponse.doc_id;

        console.log("Subiendo archivo con id:", documentId);
        console.log("Categoria:", category.category);
        console.log("Usuario:", userId);
        while (true) {
            const statusResponse = await getStatusDocument(documentId);

            console.log("Status response:", statusResponse);

            if (statusResponse.statusCode == 200 && statusResponse.status?.percentage == undefined) {
                setCurrentProgress(100);
                setAcceptedFiles([]); // Reset the accepted files state
                break;
            }

            setCurrentProgress(statusResponse.status?.percentage ?? 0);


            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again
        }
    }


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

                        {acceptedFiles?.length > 0 && category && (<>
                            <span>Uploading ({currentProgress}%).</span>
                            <span>--</span>
                        </>)}

                        <ul>{files}</ul>
                    </div>
                </div>
            </div>

            {/* <ul>{files}</ul> */}
        </div>
    );
}