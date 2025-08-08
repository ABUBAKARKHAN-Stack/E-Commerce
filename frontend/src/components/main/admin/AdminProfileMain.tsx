import { AdminHeader } from "@/components/layout/admin";
import { Layout, SideBar } from "@/components/layout/shared";
import {
  DashboardMainHeader,
  UpdatePasswordForm,
  UpdateProfileForm,
} from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import { IdCard, Lock, User } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const AdminProfileMain = () => {
  const { user, userLoading } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const sideBarRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const tabOptions = useMemo(
    () => [
      { key: "profile", icon: User, text: "Profile Info" },
      { key: "password", icon: Lock, text: "Password" },
    ],
    [],
  );

  return (
    <>
      <AdminHeader setIsOpen={setIsOpen} />
      <div className="my-5 flex">
        <SideBar
          ref={sideBarRef}
          isDrawerOpen={isOpen}
          setIsDrawerOpen={setIsOpen}
        />
        <Layout>
          <div className="space-y-10 px-4">
            <DashboardMainHeader
              mainIcon={<User className="size-8 stroke-3" />}
              mainHeading={`Account Overview – ${userLoading ? "...." :(user?.username ?? "Admin")}`}
              subIcon={
                <IdCard className="size-5 text-cyan-100 dark:text-orange-100" />
              }
              subText="View and update your personal information, account settings, and preferences."
            />
            <div className="space-y-4 rounded px-1">
              <div className="flex h-full gap-x-10 pb-2 tracking-wide">
                {tabOptions.map(({ key, icon: Icon, text }) => (
                  <div className="group relative h-full" key={key}>
                    <Button
                      onClick={() => setActiveTab(key)}
                      variant="ghost"
                      className={`flex items-center gap-1 rounded-none !px-0 font-semibold transition-colors hover:bg-transparent ${
                        activeTab === key
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-cyan-500 dark:group-hover:text-orange-500"
                      }`}
                    >
                      <Icon size={16} />
                      {text}
                    </Button>

                    <div
                      className={`absolute inset-x-0 top-full h-0.5 transition-[width] duration-300 ${activeTab === key ? "w-full bg-cyan-500 dark:bg-orange-500" : "w-0 bg-cyan-500 group-hover:w-10 dark:bg-orange-500 dark:group-hover:bg-orange-500"}`}
                    />
                  </div>
                ))}
              </div>
              {activeTab === "profile" && <UpdateProfileForm isAdmin={true} />}
              {activeTab === "password" && (
                <UpdatePasswordForm isAdmin={true} />
              )}
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};

export default AdminProfileMain;
