import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { CircleX, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

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

const Dropzone: FC<Props> = ({
  field,
  setFiles,
  files,
  form,
  existingThumbnails,
  setExistingThumbnails,
  removeThumbnail,
  product,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    const totalFiles =
      files?.length + existingThumbnails?.length + acceptedFiles.length;
    if (totalFiles > 5) {
      form.setError("thumbnails", {
        message: "You can only upload up to 5 images.",
      });
      return;
    }

    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);

    const filteredThumbnails = updatedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );
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
    <div className="rounded-md border border-[#3C3C43] p-4">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed border-[#3C3C43] p-6 text-center"
      >
        <Input {...getInputProps()} />
        <p className="xsm:text-sm text-xs sm:text-base">
          Drag & drop images here, or click to select (Max: 5)
        </p>
      </div>

      {/* Display Existing Thumbnails */}
      <div className="xxs:grid-cols-2 mt-5 grid grid-cols-1 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {existingThumbnails.map((url, i) => {
          return (
            <div
              key={i}
              className="group relative h-30 w-full overflow-hidden rounded-md border-2 bg-gray-200 dark:bg-zinc-800"
            >
              <img
                src={url}
                alt={`Existing thumbnail ${i}`}
                className="h-full w-full rounded-md object-contain p-1"
              />

              {/* Overlay */}
              <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {/* Preview Button */}
                <Dialog>
                  <DialogTrigger onClick={() => setPreviewImage(url)}>
                    <Eye
                      className="cursor-pointer text-white opacity-50 transition-opacity hover:opacity-90"
                      size={24}
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[500px]">
                    <img
                      src={previewImage!}
                      alt="Preview"
                      className="h-auto w-full rounded-2xl px-4"
                    />
                  </DialogContent>
                </Dialog>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => {
                    setExistingThumbnails(
                      existingThumbnails.filter((_, index) => index !== i),
                    );
                    field.onChange([
                      ...existingThumbnails.filter((_, index) => index !== i),
                      ...files,
                    ]);
                  }}
                  className="cursor-pointer text-white opacity-50 transition-opacity hover:opacity-80"
                ></button>

                {product && (
                  <Dialog>
                    <DialogTrigger>
                      <button
                        type="button"
                        className="mt-1 cursor-pointer text-white opacity-50 transition-opacity hover:opacity-80"
                      >
                        <CircleX size={20} />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete?</DialogTitle>
                        <DialogDescription className="mt-3">
                          Are you sure you want to delete{" "}
                          <span className="font-semibold">Thumbnail</span>?
                        </DialogDescription>
                      </DialogHeader>

                      <div className="mt-4 flex justify-center">
                        <img
                          src={url}
                          alt="Thumbnail"
                          className="h-24 rounded-2xl shadow-lg"
                        />
                      </div>

                      <DialogFooter>
                        <div className="mt-6 flex w-full items-center justify-between">
                          <DialogClose>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            type="button"
                            onClick={async () => {
                              setExistingThumbnails(
                                existingThumbnails.filter(
                                  (_, index) => index !== i,
                                ),
                              );
                              field.onChange([
                                ...existingThumbnails.filter(
                                  (_, index) => index !== i,
                                ),
                                ...files,
                              ]);
                              await removeThumbnail(product._id, i);
                            }}
                            variant="destructive"
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          );
        })}

        {/* Display Newly Added Files */}

        {files.map((file, i) => {
          const imageUrl = URL.createObjectURL(file);

          return (
            <div
              key={i}
              className="group relative h-30 w-full overflow-hidden rounded-md border-2 bg-gray-200 dark:bg-zinc-800"
            >
              <img
                src={imageUrl}
                alt={file.name}
                className="aspect-video h-full w-full rounded-md"
              />

              <div className="bg-opacity-30 absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Dialog>
                  <DialogTrigger onClick={() => setPreviewImage(imageUrl)}>
                    <Eye
                      className="cursor-pointer text-white opacity-50 transition-opacity hover:opacity-90"
                      size={24}
                    />
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-[500px]">
                    <img
                      src={previewImage!}
                      alt="Preview"
                      className="h-auto w-full rounded-2xl px-4"
                    />
                  </DialogContent>
                </Dialog>

                <button
                  type="button"
                  onClick={() => handleRemoveThumbnail(i)}
                  className="cursor-pointer text-white opacity-50 transition-opacity hover:opacity-80"
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
