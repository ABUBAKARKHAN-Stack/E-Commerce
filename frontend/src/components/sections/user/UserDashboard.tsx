import { ShoppingBag, Clock, Heart, ShoppingCart, CheckCircle, XCircle, Handshake, Rocket } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthContext } from "@/context/authContext";
import { useOrderContext } from "@/context/orderContext";
import { useProductContext } from "@/context/productContext";
import CountUp from 'react-countup';
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'


const UserDashboard = () => {
    const { user } = useAuthContext();
    const { pendingOrders, confirmedOrders, cancelledOrders, totalOrders } = useOrderContext();
    const { cartProductsCount, wishlist } = useProductContext()
    const [countUpStarted, setCountUpStarted] = useState(false);


    const metrics = [
        {
            label: "Total Orders",
            value: totalOrders.length,
            icon: <ShoppingBag className="w-6 h-6" />,
            bg: "from-cyan-400 to-cyan-600 dark:from-orange-500 dark:to-red-500",
            shadow: "shadow-cyan-500/50 dark:shadow-orange-500/50"
        },
        {
            label: "Pending Orders",
            value: pendingOrders.length,
            icon: <Clock className="w-6 h-6" />,
            bg: "from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500",
            shadow: "shadow-orange-400/50 dark:shadow-yellow-400/50"
        },
        {
            label: "Confirmed Orders",
            value: confirmedOrders.length,
            icon: <CheckCircle className="w-6 h-6" />,
            bg: "from-green-400 to-emerald-400 dark:from-green-500 dark:to-emerald-500",
            shadow: "shadow-green-500/50 dark:shadow-emerald-500/50"
        },
        {
            label: "Cancelled Orders",
            value: cancelledOrders.length,
            icon: <XCircle className="w-6 h-6" />,
            bg: "from-gray-400 to-zinc-400 dark:from-gray-500 dark:to-zinc-700",
            shadow: "shadow-zinc-500/40 dark:shadow-zinc-700/50"
        },
        {
            label: "Wishlist Items",
            value: wishlist.length,
            icon: <Heart className="w-6 h-6" />,
            bg: "from-pink-400 to-red-400 dark:from-pink-500 dark:to-red-500",
            shadow: "shadow-pink-400/50 dark:shadow-red-500/50"
        },
        {
            label: "Cart Products",
            value: cartProductsCount,
            icon: <ShoppingCart className="w-6 h-6" />,
            bg: "from-blue-400 to-indigo-400 dark:from-blue-500 dark:to-indigo-500",
            shadow: "shadow-indigo-400/50 dark:shadow-indigo-500/50"
        }
    ];




    const recentActivity = [
        { id: 1, action: "Ordered a new laptop", time: "2 hours ago" },
        { id: 2, action: "Added AirPods to wishlist", time: "Yesterday" },
        { id: 3, action: "Completed payment for headphones", time: "2 days ago" },
    ];

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    };


    useGSAP(() => {
        const tl = gsap.timeline({
            delay: 1.75
        });

        tl
            .fromTo(
                '.dashboard-header',
                {
                    opacity: 0,
                    filter: "blur(50px)",
                    y: -10,
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 1,
                    ease: "power4.out"
                }
            )
            .fromTo(
                '.metric-card',
                {
                    scale: 0,
                    filter: "blur(50px)",
                    y: 100,
                    x: -50
                },
                {
                    scale: 1,
                    filter: "blur(0px)",
                    y: 0,
                    x: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "back.out(1.5)",
                    onComplete: () => setCountUpStarted(true)
                }
            )
    }, []);



    return (
        <div className="px-4 space-y-6">
            <div className="dashboard-header flex pr-4 border-b-2 flex-col md:flex-row md:items-center md:justify-between py-4">
                <div className="space-y-2">
                    <h1 className="text-3xl text-gray-950 dark:text-white font-bold flex items-center gap-2">
                        <Handshake className="size-8 stroke-3" />
                        Welcome back, {user?.username || "Abubakar"}!
                    </h1>
                    <p className="text-gray-900 dark:text-gray-300 font-bold font-mono text-sm flex items-center gap-1 mt-1">
                        <Rocket className="size-5 text-gray-900 dark:text-gray-300" />
                        Let’s make today productive!
                    </p>
                </div>
            </div>

            {/* Stats Layout */}
            <div className="grid grid-cols-1 xsm:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map(({ label, icon, bg, value, shadow }, i) => (
                    <Card key={i} className={`metric-card text-white shadow-lg border-none ${shadow} bg-gradient-to-r ${bg}`}>
                        <CardHeader className="flex flex-row items-center gap-x-4">
                            <CardTitle>{icon}</CardTitle>
                            <CardTitle className="text-xl font-semibold">{label}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-right">
                            {
                                countUpStarted ? <CountUp
                                    end={value}
                                    className="text-3xl font-bold"
                                    duration={0.5}
                                    separator=","
                                    easingFn={easeInOutQuad}
                                /> : <span className="text-3xl font-bold">0</span>
                            }
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
}


export default UserDashboard;
