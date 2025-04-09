import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "../ui/input";
import { CircleX, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

type Props = {
    form: any;
    field: any;
    setFiles: Dispatch<SetStateAction<File[]>>;
    files: File[];
    existingThumbnails: string[]; // Existing product thumbnails from backend
    setExistingThumbnails: Dispatch<SetStateAction<string[]>>; // Update existing thumbnails
    removeThumbnail: (productId: string, thumbnailIndex: number) => Promise<void>;
    product: any;
};

const Dropzone: FC<Props> = ({ field, setFiles, files, form, existingThumbnails, setExistingThumbnails, removeThumbnail, product }) => {




    const onDrop = (acceptedFiles: File[]) => {

        const totalFiles = files?.length + (existingThumbnails?.length) + acceptedFiles.length;
        if (totalFiles > 5) {
            form.setError("thumbnails", { message: "You can only upload up to 5 images." });
            return;
        }

        const updatedFiles = [...files, ...acceptedFiles];
        setFiles(updatedFiles);

        const filteredThumbnails = updatedFiles.filter((file) => file.type.startsWith("image/"));
        console.log("filteredThumbnails:", filteredThumbnails);

        // Update form value while maintaining existing thumbnails
        field.onChange([...filteredThumbnails]);
        form.clearErrors("thumbnails");
    };

    const handleRemoveThumbnail = (index: number) => {
        const updatedThumbnails = existingThumbnails.filter((_, i) => i !== index);
        setExistingThumbnails(updatedThumbnails);
        field.onChange([...updatedThumbnails, ...files]);
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

            {/* Display Existing Thumbnails */}
            <div className="mt-5 grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-4">
                {existingThumbnails.map((url, i) => {

                    return (<div key={i} className="relative group w-full h-30 bg-gray-200 dark:bg-zinc-800 border-2 rounded-md overflow-hidden">
                        <img src={url} alt={`Existing thumbnail ${i}`} className="w-full h-full aspect-video rounded-md" />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Preview Button */}
                            <Dialog>
                                <DialogTrigger onClick={() => setPreviewImage(url)}>
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
                                    setExistingThumbnails(existingThumbnails.filter((_, index) => index !== i));
                                    field.onChange([...existingThumbnails.filter((_, index) => index !== i), ...files]);
                                }}
                                className="text-white cursor-pointer opacity-50 transition-opacity hover:opacity-80"
                            >
                            </button>

                            {product && <Dialog>
                                <DialogTrigger>
                                    <button
                                        type="button"
                                        className="text-white mt-1 cursor-pointer opacity-50 transition-opacity hover:opacity-80">
                                        <CircleX size={20} />
                                    </button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Delete?</DialogTitle>
                                        <DialogDescription className="mt-3">
                                            Are you sure you want to delete <span className="font-semibold">Thumbnail</span>?
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="flex justify-center mt-4">
                                        <img src={url} alt="Thumbnail" className="h-24 rounded-2xl shadow-lg" />
                                    </div>

                                    <DialogFooter>
                                        <div className="flex mt-6 w-full justify-between items-center">
                                            <DialogClose>
                                                <Button type="button" variant="outline">Cancel</Button>
                                            </DialogClose>
                                            <Button
                                                type="button"
                                                onClick={async () => {
                                                    setExistingThumbnails(existingThumbnails.filter((_, index) => index !== i));
                                                    field.onChange([...existingThumbnails.filter((_, index) => index !== i), ...files]);
                                                    await removeThumbnail(product._id, i)
                                                }}
                                                variant="destructive">
                                                Delete
                                            </Button>
                                        </div>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            }
                        </div>
                    </div>)
                }
                )}

                {/* Display Newly Added Files */}

                {files.map((file, i) => {
                    const imageUrl = URL.createObjectURL(file);

                    return (
                        <div key={i} className="relative group w-full h-30 bg-gray-200 dark:bg-zinc-800 border-2 rounded-md overflow-hidden">
                            <img src={imageUrl} alt={file.name} className="w-full h-full aspect-video rounded-md" />

                            <div className="absolute inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Dialog>
                                    <DialogTrigger onClick={() => setPreviewImage(imageUrl)}>
                                        <Eye className="text-white cursor-pointer opacity-50 hover:opacity-90 transition-opacity" size={24} />
                                    </DialogTrigger>
                                    <DialogContent className="w-full max-w-[500px]">
                                        <img src={previewImage!} alt="Preview" className="w-full h-auto px-4 rounded-2xl" />
                                    </DialogContent>
                                </Dialog>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveThumbnail(i)}
                                    className="text-white cursor-pointer opacity-50 transition-opacity hover:opacity-80"
                                >
                                    <CircleX size={20} />
                                </button>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default Dropzone;
