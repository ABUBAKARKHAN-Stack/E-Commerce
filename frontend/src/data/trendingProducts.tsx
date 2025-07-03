import { Eye, Heart } from "lucide-react";

interface StaticTrendingProductsData {
    name:string
    thumbnail: string;
    category: string;
    price: number;
    avgRating: number;
    totalReviews: number;
}


const staticTrendingProductsData: StaticTrendingProductsData[] = [
    {
        name: "Alienware",
        thumbnail: '/products/gamingpc.webp',
        category: "gaming",
        price: 2000,
        avgRating: 4.5,
        totalReviews: 10
    },
    {
        name: "Iphone X",
        thumbnail: '/products/smartphone.webp',
        category: "smartphones",
        price: 200,
        avgRating: 4.9,
        totalReviews: 21,
    },
    {
        name: "Lenovo 5825U",
        thumbnail: '/products/laptop.webp',
        category: "laptops",
        price: 1000,
        avgRating: 4.5,
        totalReviews: 41
    },
]

const cardActionButtonsData = [
        {
            icon: <Heart size={18} className='m-auto' />,
            tooltip: "Add to Wishlist"
        },
        {
            icon: <Eye size={18} className='m-auto' />,
            tooltip: "View Details"
        }
    ]

export {
    staticTrendingProductsData,
    cardActionButtonsData
}