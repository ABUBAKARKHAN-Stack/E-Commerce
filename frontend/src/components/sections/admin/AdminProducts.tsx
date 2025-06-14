"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Eye, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminProductContext } from "@/context/productContext";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminProducts = () => {
    const [search, setSearch] = useState("");
    const { products, loadingProducts, deleteProduct, deletingProduct } = useAdminProductContext();
    const navigate = useNavigate();


    const onDelete = (productId: string) => {
        deleteProduct(productId)
    }



    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loadingProducts) {
        return (
            <div>
                LOADING...
            </div>
        )
    }

    return (
        <div className="px-4 space-y-6">
            <div className="flex border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">Manage Products</h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">Manage your store efficiently! 🚀</p>
                </div>
                <Input
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-72 mt-2 md:mt-0"
                />
            </div>

            <div className="bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]  shadow-md rounded-lg border-2 border-dashed p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr No.</TableHead>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Thumbnails</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts!?.length > 0 ? (
                            filteredProducts!.map((product, i) => (
                                <TableRow key={product._id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                        {product.thumbnails.length > 0 && (
                                            <img src={product.thumbnails[0]} alt={product.name} className="w-12 h-12 object-contain rounded" />
                                        )}
                                    </TableCell>
                                    <TableCell className="overflow-hidden whitespace-nowrap text-ellipsis max-w-1">{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.thumbnails.length}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button onClick={() => navigate(`/admin/products/product/${product._id}`)} size="icon" variant="outline">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button onClick={() => navigate(`/admin/products/edit/${product._id}`)} size="icon" variant="outline">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button size="icon" variant="destructive">
                                                    <Trash className="w-4 h-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Delete "{product.name}"?
                                                    </DialogTitle>
                                                    <DialogDescription className="mt-3">
                                                        Are you sure you want to delete <span className="font-semibold">{product.name}</span>?
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <div className="flex mt-6 w-full justify-between items-center">
                                                        <DialogClose>
                                                            <Button variant="outline">Cancel</Button>
                                                        </DialogClose>
                                                        <Button disabled={deletingProduct} onClick={() => onDelete(product._id)} variant="destructive">
                                                            {
                                                                deletingProduct ? (
                                                                    "Deleting..."
                                                                ) : "Confirm Delete"
                                                            }
                                                        </Button>
                                                    </div>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Floating Add Button */}
            <Button
                size="lg"
                className="fixed bottom-6 right-6 rounded-full p-4"
                onClick={() => navigate("/admin/products/add")}
            >
                <PlusCircle className="w-6 h-6 text-white" />
            </Button>
        </div>
    );
};

export default AdminProducts;
