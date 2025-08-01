import { Users, DollarSign, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/authContext";

const AdminDashboard = () => {
  const { user } = useAuthContext();

  const metrics = [
    {
      label: "Total Products",
      value: 150,
      icon: <Package className="h-6 w-6" />,
      bg: "from-green-500 to-blue-500",
    },
    {
      label: "Total Users",
      value: 1200,
      icon: <Users className="h-6 w-6" />,
      bg: "from-indigo-500 to-purple-500",
    },
    {
      label: "Total Sales",
      value: "$25,000",
      icon: <DollarSign className="h-6 w-6" />,
      bg: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-6 px-4">
      <div className="flex flex-col border-b-2 py-4 pr-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
            Welcome, Admin {user?.username || "Abubakar"}! 👋
          </h1>
          <p className="font-mono text-sm font-bold text-gray-900 dark:text-gray-300">
            Manage your store efficiently! 🚀
          </p>
        </div>
      </div>

      {/* Stats Layout */}
      <div className="xsm:grid-cols-2 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {metrics.map(({ label, icon, bg, value }, i) => (
          <Card
            key={i}
            className={`bg-gradient-to-r text-white shadow-lg ${bg}`}
          >
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
