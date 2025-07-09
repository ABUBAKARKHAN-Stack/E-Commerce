import { ICartedProduct } from "@/types/main.types";
import { useEffect, useState } from "react";

const useCartQuantityHandler = (products: ICartedProduct[]) => {

    const [quantityInputs, setQuantityInputs] = useState<{ [key: string]: string }>({});
    const [newAddedQuantities, setNewAddedQuantities] = useState<{ [key: string]: number }>({});


    useEffect(() => {
        const initialInputs: { [key: string]: string } = {};
        const initialNewAdded: { [key: string]: number } = {};
        products.forEach(product => {
            initialInputs[product._id] = product.cartedProductQunatity.toString();
            initialNewAdded[product._id] = 0;
        });

        setQuantityInputs(initialInputs);
        setNewAddedQuantities(initialNewAdded);
    }, [products]);

    const handleIncrement = (productId: string, product: any) => {
        const currentInputValue = parseInt(quantityInputs[productId] || "0");

        if (currentInputValue < product.quantity) {
            const newValue = currentInputValue + 1;

            setQuantityInputs(prev => ({
                ...prev,
                [productId]: newValue.toString()
            }));

            setNewAddedQuantities(prev => ({
                ...prev,
                [productId]: newValue - product.cartedProductQunatity
            }));
        }
    };

    const handleDecrement = (productId: string, product: any) => {
        const currentInputValue = parseInt(quantityInputs[productId] || "0");

        if (currentInputValue > 1) {
            const newValue = currentInputValue - 1;

            setQuantityInputs(prev => ({
                ...prev,
                [productId]: newValue.toString()
            }));

            setNewAddedQuantities(prev => ({
                ...prev,
                [productId]: newValue - product.cartedProductQunatity
            }));
        }
    };

    const handleInputChange = (productId: string, value: string, product: any) => {
        const numericValue = value.replace(/[^0-9]/g, '');

        if (numericValue === '' || numericValue === '0') {
            setQuantityInputs(prev => ({
                ...prev,
                [productId]: '1'
            }));
            setNewAddedQuantities(prev => ({
                ...prev,
                [productId]: 1 - product.cartedProductQunatity
            }));
            return;
        }

        const parsedValue = parseInt(numericValue);

        if (parsedValue <= product.quantity) {
            setQuantityInputs(prev => ({
                ...prev,
                [productId]: parsedValue.toString()
            }));

            setNewAddedQuantities(prev => ({
                ...prev,
                [productId]: parsedValue - product.cartedProductQunatity
            }));
        }
    };

    const getCurrentQuantity = (productId: string): number => {
        return parseInt(quantityInputs[productId] || "0");
    };

    const getSubtotal = (product: any): number => {
        const currentQty = getCurrentQuantity(product._id);
        return product.price * currentQty;
    };

    return {
        handleIncrement,
        handleDecrement,
        handleInputChange,
        getCurrentQuantity,
        getSubtotal,
        newAddedQuantities,
        quantityInputs,
    }
}

export {
    useCartQuantityHandler
}