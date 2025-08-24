import { History, Info } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useActivityContext } from "@/context/activity.context";
import { formatDistanceToNow } from "date-fns";
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
      },
      defaults: { duration: 2 },
    });

    tl.fromTo(
      ".recent-activity-header",
      animations.dashboardSectionHeader.from,
      {
        ...animations.dashboardSectionHeader.to,
      },
    ).fromTo(
      ".recent-activity-card",
      animations.recentActivityCards.from,
      {
        ...animations.recentActivityCards.to,
      },
      "<0.3",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [recentActivityData]);

  return (
    <div className="recent-activity-section space-y-6">
      <DashboardSectionHeader
        mainIcon={<History className="size-8 stroke-3" />}
        mainHeading="Recent Activity"
        subIcon={<History className="size-5" />}
        subText="Overview of your most recent interactions and events."
        animateClassName="recent-activity-header"
      />

      <ul className="space-y-3 pr-2">
        {recentActivityData && recentActivityData.length > 0 ? (
          recentActivityData.map(
            ({ activityDescription, activityType, createdAt, metaData }, i) => {
              return (
                <li
                  key={i}
                  className="recent-activity-card bg-muted flex flex-col gap-2 rounded-xl px-4 py-3 shadow-sm"
                >
                  {/* Top: Activity Info + Icon */}
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {activityDescription}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {formatDistanceToNow(new Date(createdAt), {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </p>
                    </div>

                    <span className="my-1">
                      {getActivityIcons(activityType)}
                    </span>
                  </div>

                  {/* MetaData Section */}
                  {metaData && (
                    <div className="bg-background border-border text-muted-foreground w-full space-y-1 rounded-md border px-3 py-2 text-xs">
                      {metaData.orderId && (
                        <p>
                          <span className="text-foreground font-semibold">
                            Order ID:
                          </span>{" "}
                          {metaData.orderId}
                        </p>
                      )}
                      {metaData.totalAmount && (
                        <p>
                          <span className="text-foreground font-semibold">
                            Amount:
                          </span>{" "}
                          ${metaData.totalAmount}
                        </p>
                      )}
                      {metaData.productName && (
                        <p>
                          <span className="text-foreground font-semibold">
                            Product:
                          </span>{" "}
                          {metaData.productName}
                        </p>
                      )}
                      {metaData.quantity && (
                        <p>
                          <span className="text-foreground font-semibold">
                            Quantity:
                          </span>{" "}
                          {metaData.quantity}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              );
            },
          )
        ) : (
          <li className="recent-activity-card bg-muted flex items-start justify-between rounded-xl p-4 shadow-sm">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                No recent activity found yet. Your actions will appear here!
              </p>
            </div>
            <span className="text-muted-foreground my-auto block h-full">
              <ToolTip
                triggerValue={<Info className="h-5 w-5" />}
                tooltip="This section shows your most recent actions. Once you interact with the platform, your activity will appear here!"
              />
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
