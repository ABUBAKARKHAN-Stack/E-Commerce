import { DashboardSectionHeader } from "@/components/reusable/shared";
import { useAuthContext } from "@/context/authContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Heart,
  HelpCircle,
  LogOut,
  ShoppingBag,
  Settings,
  Zap,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { animations } from "@/utils/animations/animations";
gsap.registerPlugin(ScrollTrigger);

const QuickActions = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const quickLinks = [
    {
      id: 1,
      title: "My Orders",
      icon: ShoppingBag,
      href: "/orders",
      description: "View and track your past orders",
    },
    {
      id: 3,
      title: "Wishlist",
      icon: Heart,
      href: "/wishlist",
      description: "Your saved products",
    },
    {
      id: 4,
      title: "Account Settings",
      icon: Settings,
      href: "/me",
      description: "Update your profile and preferences",
    },
    {
      id: 5,
      title: "Contact",
      icon: HelpCircle,
      href: "/contact",
      description: "Need help? Contact us",
    },
    {
      id: 8,
      title: "Logout",
      icon: LogOut,
      onClick: async () => await logout(navigate),
      description: "Sign out of your account",
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".quick-actions-section",
        start: "top 85%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse",
      },
      defaults: { duration: 2 },
    });

    tl.fromTo(".quick-actions-header", animations.dashboardSectionHeader.from, {
      ...animations.dashboardSectionHeader.to,
    }).fromTo(
      ".quick-action-card",
      animations.quickActionsCards.from,
      {
        ...animations.quickActionsCards.to,
      },
      "<0.3",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="quick-actions-section space-y-6">
      <DashboardSectionHeader
        mainIcon={<Zap className="size-8 stroke-3" />}
        mainHeading="Quick Actions"
        subIcon={<Zap className="size-5" />}
        subText="Perform important tasks swiftly with just a few clicks."
        animateClassName="quick-actions-header"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {quickLinks.map(
          ({ id, title, icon: Icon, href, description, onClick }) => {
            const sharedClasses =
              "h-50 w-full shadow flex flex-col justify-center gap-y-3 items-center rounded-sm dark:bg-orange-500 bg-cyan-500 dark:hover:bg-orange-600/90 hover:bg-cyan-600/90 transition-[colors] ease-linear border-0 hover:border-[1.5px] dark:hover:border-orange-600/70 hover:border-cyan-600/50 duration-300 text-white quick-action-card ";

            if (onClick) {
              return (
                <button
                  key={id}
                  onClick={onClick}
                  className={`${sharedClasses} cursor-pointer`}
                >
                  <Icon size={40} />
                  <h4 className="px-2 text-center font-semibold text-wrap uppercase">
                    {title}
                  </h4>
                  <p className="mx-auto max-w-[90%] text-center text-xs text-white">
                    {description}
                  </p>
                </button>
              );
            }

            return (
              <Link key={id} to={href} className={sharedClasses}>
                <Icon size={40} />
                <h4 className="px-2 text-center font-semibold text-wrap uppercase">
                  {title}
                </h4>
                <p className="mx-auto max-w-[90%] text-center text-xs text-white">
                  {description}
                </p>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
};

export default QuickActions;
