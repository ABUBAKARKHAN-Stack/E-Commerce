import { ShoppingBag, Clock, Heart, ShoppingCart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/authContext";

const UserDashboard = () => {
    const { user } = useAuthContext();

    const metrics = [
        { label: "Total Orders", value: 10, icon: <ShoppingBag className="w-6 h-6" />, bg: "from-orange-500 to-red-500" },
        { label: "Pending Orders", value: 3, icon: <Clock className="w-6 h-6" />, bg: "from-yellow-500 to-orange-500" },
        { label: "Wishlist Items", value: 5, icon: <Heart className="w-6 h-6" />, bg: "from-pink-500 to-red-500" },
        { label: "Cart Products", value: 7, icon: <ShoppingCart className="w-6 h-6" />, bg: "from-blue-500 to-indigo-500" },
    ];

    const recentActivity = [
        { id: 1, action: "Ordered a new laptop", time: "2 hours ago" },
        { id: 2, action: "Added AirPods to wishlist", time: "Yesterday" },
        { id: 3, action: "Completed payment for headphones", time: "2 days ago" },
    ];

    return (
        <div className="px-4 space-y-6">   
            <div className="flex pr-4 border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">Welcome back, {user?.username || "Abubakar"}! 👋</h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">Let’s make today productive! 🚀</p>
                </div>
            </div>

            {/* Stats Layout */}
            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map(({ label, icon, bg, value }, i) => (
                    <Card key={i} className={`text-white shadow-lg bg-gradient-to-r ${bg}`}>
                        <CardHeader className="flex flex-row items-center gap-x-4">
                            <CardTitle>{icon}</CardTitle>
                            <CardTitle className="text-xl font-semibold">{label}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            <p className="text-3xl font-bold">{value}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity Section */}
            <div className="bg-gradient-to-b border-2 from-[#F3F4F6] via-[#E5E7EB] to-[#F3F4F6] dark:bg-gradient-to-b dark:from-[#1B1B1F] dark:via-[#27272A] dark:to-[#1B1B1F] shadow-md p-5 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">📌 Recent Activity</h2>
                <ul className="space-y-2">
                    {recentActivity.map(({ id, action, time }) => (
                        <li key={id} className="flex justify-between text-sm border-b pb-2">
                            <span>{action}</span>
                            <span className="text-">{time}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
