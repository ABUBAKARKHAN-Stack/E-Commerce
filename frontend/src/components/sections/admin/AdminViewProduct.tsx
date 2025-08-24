import { useState } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Eye, CircleX, Pencil } from "lucide-react";
import { useAdminProductContext } from "@/context/adminProduct.context";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/main.types";

const AdminViewProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { removeThumbnail } = useAdminProductContext();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const product: IProduct = useLoaderData();

  const handleRemoveThumbnail = async (i: number) => {
    await removeThumbnail(id!, i);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {/* Edit Button */}
        <Button
          onClick={() => navigate(`/admin/products/edit/${id}`)}
          variant={"secondary"}
          className="w-fit rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          <Pencil className="mr-2 inline-block" size={18} />
          Edit Product
        </Button>
      </div>

      {/* Product Details Section */}
      <div className="rounded-xl border-4 bg-gradient-to-b from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] px-4 py-8 dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
        {product ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Category:{" "}
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </p>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              Rating: {product.avgRating}
            </p>
            <p className="font-bold text-gray-800 dark:text-gray-200">
              Price: ${product.price}
            </p>

            {/* Thumbnails Section */}
            {product.thumbnails.length > 0 ? (
              <div className="xs:grid-cols-2 grid grid-cols-1 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {product.thumbnails.map((thumbnail: string, i: number) => (
                  <div
                    key={i}
                    className="group relative h-30 w-full overflow-hidden rounded-md border-2 bg-gray-200 dark:bg-zinc-800"
                  >
                    <img
                      src={thumbnail}
                      alt={`Existing thumbnail ${i}`}
                      className="h-full w-full rounded-md object-contain"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {/* Preview Button */}
                      <Dialog>
                        <DialogTrigger
                          onClick={() => setPreviewImage(thumbnail)}
                        >
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
                              src={thumbnail}
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
                                onClick={() => handleRemoveThumbnail(i)}
                                variant="destructive"
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-900 dark:text-gray-300">
                No thumbnails available.
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-900 dark:text-gray-300">
            Loading product details...
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminViewProduct;
