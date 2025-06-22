import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { useAdminProductContext } from "@/context/adminProductContext";
import { Button } from "@/components/ui/button";

const AdminViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProduct, removeThumbnail } = useAdminProductContext();
    const [product, setProduct] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    console.log(product);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProduct(id!);
                setProduct(res);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleRemoveThumbnail = async (i: number) => {
        await removeThumbnail(id!, i);
    };

    return (
        <div className="px-4 space-y-6">
            {/* Header */}
            <div className="flex border-b-2 flex-row items-center justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">
                        Product Details
                    </h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">
                        View product information in detail! 🛍️
                    </p>
                </div>
                {/* Edit Button */}
                <Button
                    onClick={() => navigate(`/admin/products/edit/${id}`)}
                    variant={"secondary"}
                    className="bg-blue-500 w-fit text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    <Pencil className="inline-block mr-2" size={18} />
                    Edit Product
                </Button>
            </div>

            {/* Product Details Section */}
            <div className="bg-gradient-to-b px-4 py-8 from-[#ffffff] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b border-4 rounded-xl dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
                {product ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {product.name}
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Rating: {product.avgRating}</p>
                        <p className="text-gray-800 dark:text-gray-200 font-bold">
                            Price: ${product.price}
                        </p>

                        {/* Thumbnails Section */}
                        {product.thumbnails.length > 0 ? (
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center gap-4">
                                {product.thumbnails.map((thumbnail: string, i: number) => (
                                    <div
                                        key={i}
                                        className="relative group w-full h-30 bg-gray-200 dark:bg-zinc-800 border-2 rounded-md overflow-hidden"
                                    >
                                        <img
                                            src={thumbnail}
                                            alt={`Existing thumbnail ${i}`}
                                            className="w-full h-full object-contain rounded-md"
                                        />

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {/* Preview Button */}
                                            <Dialog>
                                                <DialogTrigger onClick={() => setPreviewImage(thumbnail)}>
                                                    <Eye
                                                        className="text-white cursor-pointer opacity-50 hover:opacity-90 transition-opacity"
                                                        size={24}
                                                    />
                                                </DialogTrigger>
                                                <DialogContent className="w-full max-w-[500px]">
                                                    <img
                                                        src={previewImage!}
                                                        alt="Preview"
                                                        className="w-full h-auto px-4 rounded-2xl"
                                                    />
                                                </DialogContent>
                                            </Dialog>

                                            {/* Delete Button */}
                                            <Dialog>
                                                <DialogTrigger>
                                                    <button
                                                        type="button"
                                                        className="text-white mt-1 cursor-pointer opacity-50 transition-opacity hover:opacity-80"
                                                    >
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
                                                        <img
                                                            src={thumbnail}
                                                            alt="Thumbnail"
                                                            className="h-24 rounded-2xl shadow-lg"
                                                        />
                                                    </div>

                                                    <DialogFooter>
                                                        <div className="flex mt-6 w-full justify-between items-center">
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
                            <p className="text-gray-900 dark:text-gray-300">No thumbnails available.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-900 dark:text-gray-300">Loading product details...</p>
                )}
            </div>
        </div>
    );
};

export default AdminViewProduct;
