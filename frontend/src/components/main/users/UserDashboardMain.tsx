import { useLayoutEffect, useRef, useState } from "react";
import { Layout, SecondaryHeader, SideBar } from "@/components/layout/shared";
import {
  Metrics,
  QuickActions,
  RecentActivity,
} from "@/components/sections/user/dashboard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DashboardMainHeader } from "@/components/reusable/shared";
import { Handshake, Sparkles } from "lucide-react";
import { useAuthContext } from "@/context/auth.context";
import { animations } from "@/utils/animations/animations";
import { Link } from "react-router-dom";
import { BlurFade } from "@/components/magicui/blur-fade";
gsap.registerPlugin(ScrollTrigger);

const UserDashboardMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const sideBarRef = useRef<HTMLElement>(null);
  const { user, userLoading } = useAuthContext();
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "power4.out",
      },
    });

    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0 },
    ).fromTo(
      sideBarRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0 },
      "<0.3",
    );

    gsap.fromTo(".welcome-header", animations.dashboardSectionHeader.from, {
      ...animations.dashboardSectionHeader.to,
      scrollTrigger: {
        trigger: ".welcome-header",
        start: "top 90%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
      delay: 1.75,
    });
  }, []);

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <SecondaryHeader setIsOpen={setIsOpen} ref={headerRef} />
      <div className="relative my-5 flex">
        <SideBar
          isDrawerOpen={isOpen}
          setIsDrawerOpen={setIsOpen}
          ref={sideBarRef}
        />
        <Layout>
          <div className="space-y-10 px-4">
            <DashboardMainHeader
              mainIcon={<Handshake className="size-8 stroke-3" />}
              mainHeading={
                userLoading
                  ? "Welcome back, ..."
                  : `Welcome back, ${user?.username || "Guest"}!`
              }
              subIcon={
                <Sparkles className="size-5 text-cyan-100 dark:text-orange-100" />
              }
              subText="Glad you're here! Let’s catch up on your orders and favorites."
              animateClassName="welcome-header"
            />
            <Metrics />
            <RecentActivity />
            <QuickActions />
            <BlurFade
              inView
              inViewMargin="-50px"
              blur="30px"
              direction="down"
              duration={0.75}
              once={false}
            >
              <p className="text-muted-foreground mt-10 text-center text-sm">
                Need help with something?{" "}
                <Link to="/contact" className="underline">
                  Contact support
                </Link>{" "}
                anytime. <br />
                Thank you for shopping with{" "}
                <strong className="text-cyan-500 dark:text-orange-500">
                  ShopNex
                </strong>
                !
              </p>
            </BlurFade>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default UserDashboardMain;
