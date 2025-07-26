import { History, Info } from "lucide-react";
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useActivityContext } from "@/context/activityContext";
import { formatDistanceToNow } from 'date-fns'
import { DashboardSectionHeader, ToolTip } from "@/components/reusable/shared";
import { getActivityIcons } from "@/utils/getActivityIcons";
import { animations } from "@/utils/animations/animations";

gsap.registerPlugin(ScrollTrigger);

const RecentActivity = () => {

    const { recentActivityData } = useActivityContext();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".recent-activity-section",
                start: "top 85%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse",
                markers: true,
            },
            defaults: { duration: 2 }
        });

        tl.fromTo(
            ".recent-activity-header",
            animations.dashboardSectionHeader.from,
            {
                ...animations.dashboardSectionHeader.to,
            }
        ).fromTo(
            ".recent-activity-card",
            animations.recentActivityCards.from,
            {
                ...animations.recentActivityCards.to,

            },
            "<0.3"
        );

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, [recentActivityData]);


    return (
        <div className="space-y-6 recent-activity-section">
            <DashboardSectionHeader
                mainIcon={<History className="size-8 stroke-3" />}
                mainHeading="Recent Activity"
                subIcon={<History className="size-5" />}
                subText="Overview of your most recent interactions and events."
                animateClassName="recent-activity-header"
            />

            <ul className="space-y-3 pr-2" >
                {recentActivityData && recentActivityData.length > 0 ? (
                    recentActivityData.map(({ activityDescription, activityType, createdAt, metaData }, i) => {
                        return (
                            <li
                                key={i}
                                className="recent-activity-card bg-muted px-4 py-3 rounded-xl shadow-sm flex flex-col gap-2"
                            >
                                {/* Top: Activity Info + Icon */}
                                <div className="flex items-start justify-between w-full gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">{activityDescription}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(createdAt), { addSuffix: true, includeSeconds: true })}
                                        </p>
                                    </div>

                                    <span className="my-1">{getActivityIcons(activityType)}</span>
                                </div>

                                {/* MetaData Section */}
                                {metaData && (
                                    <div className="bg-background border border-border rounded-md px-3 py-2 text-xs text-muted-foreground space-y-1 w-full">
                                        {metaData.orderId && (
                                            <p>
                                                <span className="font-semibold text-foreground">Order ID:</span> {metaData.orderId}
                                            </p>
                                        )}
                                        {metaData.totalAmount && (
                                            <p>
                                                <span className="font-semibold text-foreground">Amount:</span> ${metaData.totalAmount}
                                            </p>
                                        )}
                                        {metaData.productName && (
                                            <p>
                                                <span className="font-semibold text-foreground">Product:</span> {metaData.productName}
                                            </p>
                                        )}
                                        {metaData.quantity && (
                                            <p>
                                                <span className="font-semibold text-foreground">Quantity:</span> {metaData.quantity}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </li>
                        )
                    })
                ) : (
                    <li
                        className="recent-activity-card bg-muted p-4 rounded-xl shadow-sm flex justify-between items-start"
                    >
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                No recent activity found yet. Your actions will appear here!
                            </p>
                        </div>
                        <span className="block h-full my-auto text-muted-foreground">
                            <ToolTip
                                triggerValue={<Info className="w-5 h-5" />}
                                tooltip="This section shows your most recent actions. Once you interact with the platform, your activity will appear here!"
                            />
                        </span>
                    </li>
                )}
            </ul>
        </div>


    );
}

export default RecentActivity;