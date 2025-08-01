"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Eye, PlusCircle, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdminProductContext } from "@/context/adminProductContext";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AdminProductLoading } from "@/types/main.types";

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const { productsData, deleteProduct, loading } = useAdminProductContext();
  const navigate = useNavigate();

  const onDelete = (productId: string) => {
    deleteProduct(productId);
  };

  console.log(productsData);

  const filteredProducts = productsData?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading === AdminProductLoading.GET_ALL) {
    return <div>LOADING...</div>;
  }

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col w-full  gap-6 border-b-2 py-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
            Manage Products
          </h1>
          <p className="font-mono text-sm font-bold text-gray-900 dark:text-gray-300">
            Manage your store efficiently! 🚀
          </p>
        </div>
        <Input
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2  md:mt-0"
        />
      </div>

      <div className="rounded-lg border-2 border-dashed bg-gradient-to-b from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] p-4 shadow-md dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Rating</TableHead>
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
                      <img
                        src={product.thumbnails[0]}
                        alt={product.name}
                        className="h-12 w-12 rounded object-contain"
                      />
                    )}
                  </TableCell>
                  <TableCell className="max-w-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.name}
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell className="flex items-center gap-x-1">
                    <span>{product.avgRating}</span>
                    <Star className="size-4 fill-white" />
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.thumbnails.length}</TableCell>
                  <TableCell className="mt-1.5 flex gap-2">
                    <Button
                      onClick={() =>
                        navigate(`/admin/products/product/${product._id}`)
                      }
                      size="icon"
                      variant="outline"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() =>
                        navigate(`/admin/products/edit/${product._id}`)
                      }
                      size="icon"
                      variant="outline"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button size="icon" variant="destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete "{product.name}"?</DialogTitle>
                          <DialogDescription className="mt-3">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold">
                              {product.name}
                            </span>
                            ?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <div className="mt-6 flex w-full items-center justify-between">
                            <DialogClose>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              disabled={loading === AdminProductLoading.DELETE}
                              onClick={() => onDelete(product._id)}
                              variant="destructive"
                            >
                              {loading === AdminProductLoading.DELETE
                                ? "Deleting..."
                                : "Confirm Delete"}
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
        className="fixed right-6 bottom-6 rounded-full p-4"
        onClick={() => navigate("/admin/products/add")}
      >
        <PlusCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default AdminProducts;
