import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { CircleX, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
    form: any;
    field: any;
    setFiles: Dispatch<SetStateAction<File[]>>;
    files: File[];
};

const Dropzone: FC<Props> = ({ field, setFiles, files, form }) => {

    const onDrop = (acceptedFiles: File[]) => {
        if (files.length + acceptedFiles.length > 5) {
            form.setError("thumbnails", {
                message: "You can only upload up to 5 images."
            })
        }
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        field.onChange([...files, ...acceptedFiles]);

        // Reset the form error if there's no error
        form.clearErrors("thumbnails");
    };

    const { getInputProps, getRootProps } = useDropzone({
        accept: { "image/*": [] },
        multiple: true,
        maxFiles: 5,
        onDrop,
    });
    const [previewImage, setPreviewImage] = useState<string | null>(null);


    return (
        <div className="border border-[#3C3C43] rounded-md p-4">
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-[#3C3C43] p-6 cursor-pointer text-center"
            >
                <Input {...getInputProps()} />
                <p className="text-xs xsm:text-sm sm:text-base">Drag & drop images here, or click to select (Max: 5)</p>
            </div>
            <div className="mt-5 grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-4">
                {files.length > 0 &&
                    files.map((file, i) => (
                        <div key={i} className="relative group w-full h-30 bg-gray-200 dark:bg-zinc-800 border-2 rounded-md overflow-hidden">
                            {/* Image */}
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full aspect-video rounded-md"
                            />

                            {/* Overlay (Hidden by default, shows on hover) */}
                            <div className="absolute inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Preview Button */}
                                <Dialog>
                                    <DialogTrigger onClick={() => setPreviewImage(URL.createObjectURL(file))}>
                                        <Eye className="text-white cursor-pointer opacity-50 hover:opacity-90 transition-opacity" size={24} />
                                    </DialogTrigger>
                                    <DialogContent className="w-full max-w-[500px]">
                                        <img src={previewImage!} alt="Preview" className="w-full h-auto px-4 rounded-2xl" />
                                    </DialogContent>
                                </Dialog>

                                {/* Delete Button */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const filteredImages = files.filter((_, f) => f !== i);
                                        field.onChange([...filteredImages]);
                                        setFiles([...filteredImages]);
                                    }}
                                    className="text-white cursor-pointer opacity-50 transition-opacity hover:opacity-80"
                                >
                                    <CircleX size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Dropzone;
