import { useRef, useState } from "react";
import { Layout, SecondaryHeader, SideBar } from "@/components/layout/shared";
import { UserDashboard } from '@/components/sections/user';
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";


const UserDashboardMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: {
                duration: 1.5,
                delay:0.25,
                ease: "power4.out"
            }
        });

        tl
            .fromTo(
                headerRef.current,
                { opacity: 0, y: -100 },
                { opacity: 1, y: 0  },
             
            )
            .fromTo(
                sideBarRef.current,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0 },
                0.3
            );
    }, []);


    return (
        <>
            <SecondaryHeader
                setIsOpen={setIsOpen}
                ref={headerRef}
            />
            <div className="flex my-5">
                <SideBar
                    isDrawerOpen={isOpen}
                    setIsDrawerOpen={setIsOpen}
                    ref={sideBarRef}
                />
                <Layout>
                    <UserDashboard />
                </Layout>
            </div>
        </>
    );
};

export default UserDashboardMain;