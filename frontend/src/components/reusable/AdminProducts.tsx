"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Pencil, Trash, Eye, PlusCircle } from "lucide-react";
import Layout from "./layout/Layout";
import { SideBar } from ".";
import { useNavigate } from "react-router-dom";

const productsData = [
    { id: 1, name: "iPhone 15", price: "$999", stock: 10, category: "Smartphones" },
    { id: 2, name: "MacBook Pro", price: "$1999", stock: 5, category: "Laptops" },
    { id: 3, name: "Sony WH-1000XM5", price: "$399", stock: 15, category: "Headphones" },
    { id: 4, name: "Samsung Galaxy S23", price: "$799", stock: 8, category: "Smartphones" },
    { id: 5, name: "Dell XPS 13", price: "$1299", stock: 3, category: "Laptops" },
    { id: 6, name: "Bose QuietComfort 35 II", price: "$299", stock: 12, category: "Headphones" },
    { id: 7, name: "Sony PlayStation 5", price: "$499", stock: 6, category: "Gaming Consoles" },
];

const AdminProducts = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredProducts = productsData.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

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
                            <TableHead>Product Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button size="icon" variant="outline">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="outline">
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
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
