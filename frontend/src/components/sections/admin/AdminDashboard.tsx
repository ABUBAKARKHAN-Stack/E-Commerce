import { Users, DollarSign, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/authContext";

const AdminDashboard = () => {
    const { user } = useAuthContext();

    const metrics = [
        { label: "Total Products", value: 150, icon: <Package className="w-6 h-6" />, bg: "from-green-500 to-blue-500" },
        { label: "Total Users", value: 1200, icon: <Users className="w-6 h-6" />, bg: "from-indigo-500 to-purple-500" },
        { label: "Total Sales", value: "$25,000", icon: <DollarSign className="w-6 h-6" />, bg: "from-yellow-500 to-orange-500" },
    ];

    return (
        <div className="px-4 space-y-6">

            <div className="flex pr-4 border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div>
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold">Welcome, Admin {user?.username || "Abubakar"}! 👋</h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm">Manage your store efficiently! 🚀</p>
                </div>
            </div>

            {/* Stats Layout */}
            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
    );
};

export default AdminDashboard;
