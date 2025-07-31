import { useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Layout, SecondaryHeader, SideBar } from '@/components/layout/shared';
import { BlurFade } from '@/components/magicui/blur-fade';
import { DashboardMainHeader, UpdatePasswordForm, UpdateProfileForm } from '@/components/reusable/shared';
import { IdCard, Lock, User } from 'lucide-react';
import { useAuthContext } from '@/context/authContext';
import { Button } from '@/components/ui/button';


const UserProfileMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);
    const sideBarRef = useRef<HTMLElement>(null);
    const [activeTab, setActiveTab] = useState("profile")

    const { user } = useAuthContext()
    const tabOptions = useMemo(() => [
        { key: "profile", icon: User, text: "Profile Info" },
        { key: "password", icon: Lock, text: "Password" },
    ], [])


    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 1.5 }}

            >
                <SecondaryHeader
                    setIsOpen={setIsOpen}
                    ref={headerRef}
                />
            </motion.div >
            <div className="flex my-5">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 1.5 }}

                >
                    <SideBar ref={sideBarRef} isDrawerOpen={isOpen} setIsDrawerOpen={setIsOpen} />
                </motion.div>
                <Layout>
                    <div className="px-4 space-y-10">
                        <BlurFade
                            delay={1}
                            duration={0.5}
                            blur='50px'
                            direction="down"
                        >
                            <DashboardMainHeader
                                mainIcon={<User className="size-8 stroke-3" />}
                                mainHeading={`Account Overview – ${user?.username || "User"}`}
                                subIcon={<IdCard className="size-5 text-cyan-100 dark:text-orange-100" />}
                                subText="View and update your personal information, account settings, and preferences."
                                animateClassName="user-profile-header"
                            />
                        </BlurFade>
                        <div
                            // delay={1.5}
                            // blur='30px'
                            // duration={0.5}
                            // direction='right'
                            className='px-1 space-y-4 rounded'>
                            <div className="flex h-full tracking-wide gap-x-10 pb-2">
                                {tabOptions.map(({ key, icon: Icon, text }) => (
                                    <div className="relative h-full group" key={key}>
                                        <Button
                                            onClick={() => setActiveTab(key)}
                                            variant="ghost"
                                            className={`font-semibold flex items-center gap-1 rounded-none !px-0 transition-colors hover:bg-transparent ${activeTab === key ? "text-foreground" : "text-muted-foreground group-hover:text-cyan-500 dark:group-hover:text-orange-500"
                                                }`}
                                        >
                                            <Icon size={16} />
                                            {text}
                                        </Button>

                                        <div
                                            className={`absolute inset-x-0 top-full h-0.5 transition-[width] duration-300 ${activeTab === key ? "w-full dark:bg-orange-500 bg-cyan-500" : "w-0 group-hover:w-10 dark:bg-orange-500 bg-cyan-500 dark:group-hover:bg-orange-500"}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            {activeTab === "profile" && <UpdateProfileForm />}
                            {activeTab === "password" && <UpdatePasswordForm />}
                        </div>

                    </div>
                </Layout>
            </div>
        </>
    )
}

export default UserProfileMain