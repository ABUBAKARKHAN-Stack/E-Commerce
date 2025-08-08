import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
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
  existingThumbnails: string[];
  setExistingThumbnails: Dispatch<SetStateAction<string[]>>;
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
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileUrls, setFileUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setFileUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  useEffect(() => {
    validateThumbnails(existingThumbnails, files);
  }, [existingThumbnails, files, form]);

  const updateFieldValue = (updatedExistingThumbnails: string[], updatedFiles: File[]) => {
    const filteredFiles = updatedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    field.onChange(filteredFiles);
  };

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

    updateFieldValue(existingThumbnails, updatedFiles);
    validateThumbnails(existingThumbnails, updatedFiles);
  };

  const validateThumbnails = (updatedExistingThumbnails: string[], updatedFiles: File[]) => {
    const totalThumbnails = updatedExistingThumbnails.length + updatedFiles.length;
    if (totalThumbnails === 0) {
      form.setError("thumbnails", {
        message: "At least one thumbnail is required"
      });
    } else {
      form.clearErrors("thumbnails");
    }
  };

  const handleRemoveExistingThumbnail = (index: number) => {
    const updatedThumbnails = existingThumbnails.filter((_, i) => i !== index);
    setExistingThumbnails(updatedThumbnails);
    updateFieldValue(updatedThumbnails, files);
    validateThumbnails(updatedThumbnails, files);
  };

  const handleRemoveNewFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    updateFieldValue(existingThumbnails, updatedFiles);
    validateThumbnails(existingThumbnails, updatedFiles);
  };

  const handleRemoveExistingThumbnailFromServer = async (index: number) => {
    const updatedThumbnails = existingThumbnails.filter((_, i) => i !== index);
    setExistingThumbnails(updatedThumbnails);
    updateFieldValue(updatedThumbnails, files);
    validateThumbnails(updatedThumbnails, files);
    await removeThumbnail(product._id, index);
  };

  const { getInputProps, getRootProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 5,
    onDrop,
  });

  return (
    <div className="rounded-md border border-[#3C3C43] p-4">
      <div
        {...getRootProps()}
        className="cursor-pointer border-2 border-dashed rounded-2xl border-[#3C3C43] p-6 text-center hover:border-cyan-500 dark:hover:border-orange-500 transition-colors duration-300"
        role="button"
        tabIndex={0}
        aria-label="Click or drag and drop to upload images"
      >
        <Input {...getInputProps()} />
        <p className="xsm:text-sm text-xs sm:text-base text-center text-muted-foreground">
          Drag & drop your images here, or <span className="dark:text-orange-500 dark:hover:text-orange-600 text-cyan-500 hover:text-cyan-600 underline cursor-pointer">click to upload</span> <br />
          <span>(Up to 5 pictures allowed)</span>
        </p>
      </div>

      {/* Display Existing Thumbnails */}
      <div className="xxs:grid-cols-2 mt-5 grid grid-cols-1 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {existingThumbnails.map((url, i) => {
          return (
            <div
              key={i}
              className="group relative h-40 overflow-hidden rounded-xl border-2 border-[#3C3C43] shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={url}
                alt={`Existing product thumbnail ${i + 1}`}
                className="h-full w-full object-contain drop-shadow-8px shadow-black transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-black/60">
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  {/* Preview Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setPreviewImage(url)}
                        className="flex items-center justify-center hover:cursor-pointer size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg"
                        aria-label="Preview image"
                      >
                        <Eye size={20} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-full flex justify-center items-center h-96 max-w-[500px]">
                      <div className="h-84 w-full">
                        <img
                          src={previewImage!}
                          alt="Preview of selected thumbnail"
                          className="h-full w-full drop-shadow-8px shadow-black object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Delete Button */}
                  {!product ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingThumbnail(i)}
                      className="flex items-center justify-center size-10 rounded-full bg-red-500/20 backdrop-blur-md border border-red-400/50 text-red-300 hover:bg-red-500/30 hover:text-red-200 hover:scale-110 transition-all duration-200 shadow-lg"
                      aria-label="Remove thumbnail"
                    >
                      <CircleX size={20} />
                    </button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="flex items-center justify-center size-10 hover:cursor-pointer rounded-full bg-red-500/20 backdrop-blur-md border border-red-400/50 text-red-300 hover:bg-red-500/30 hover:text-red-200 hover:scale-110 transition-all duration-200 shadow-lg"
                          aria-label="Delete thumbnail"
                        >
                          <CircleX size={20} />
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Thumbnail?</DialogTitle>
                          <DialogDescription className="mt-3">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">this thumbnail</span>?
                            This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 flex justify-center">
                          <img
                            src={url}
                            alt="Thumbnail to be deleted"
                            className="h-40 rounded-2xl shadow-lg border"
                          />
                        </div>

                        <DialogFooter>
                          <div className="mt-6 flex w-full items-center justify-between">
                            <DialogClose>
                              <Button type="button" variant="outline">
                                Cancel
                              </Button>
                            </DialogClose>
                            <DialogClose>
                              <Button
                                type="button"
                                onClick={() => handleRemoveExistingThumbnailFromServer(i)}
                                variant="destructive"
                              >
                                Delete
                              </Button>
                            </DialogClose>
                          </div>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Image number badge */}
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-black/40 backdrop-blur-sm text-white border border-white/20">
                    #{i + 1}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Display Newly Added Files */}
        {files.map((file, i) => {
          const imageUrl = fileUrls[i];
          return (
            <div
              key={`new-file-${i}`}
              className="group relative h-40 w-full overflow-hidden rounded-xl border-2 border-[#3C3C43] shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <img
                src={imageUrl}
                alt={`New file: ${file.name}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-black/60">
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  {/* Preview Button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setPreviewImage(imageUrl)}
                        className="flex items-center justify-center hover:cursor-pointer size-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200 shadow-lg"
                        aria-label="Preview image"
                      >
                        <Eye size={20} />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-[500px]">
                      <img
                        src={previewImage!}
                        alt="Preview of selected file"
                        className="h-auto w-full rounded-2xl px-4"
                      />
                    </DialogContent>
                  </Dialog>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveNewFile(i)}
                    className="flex items-center justify-center hover:cursor-pointer size-10 rounded-full bg-red-500/20 backdrop-blur-md border border-red-400/50 text-red-300 hover:bg-red-500/30 hover:text-red-200 hover:scale-110 transition-all duration-200 shadow-lg"
                    aria-label="Remove file"
                  >
                    <CircleX size={20} />
                  </button>
                </div>

                {/* New file badge */}
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-cyan-500/80 dark:bg-orange-500/80 backdrop-blur-sm text-white border border-cyan-400/50 dark:border-orange-400/50">
                    New
                  </span>
                </div>

                {/* File name */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs text-white bg-black/50 backdrop-blur-sm rounded px-2 py-1 truncate border border-white/20">
                    {file.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default Dropzone;