import { Users, DollarSign, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const AdminDashboard = () => {

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
  );
};

export default AdminDashboard;
