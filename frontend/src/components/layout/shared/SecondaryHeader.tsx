import { Dispatch, forwardRef, SetStateAction } from "react";
import Layout from "./Layout";
import { Logo } from "@/components/reusable/shared";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuthContext } from "@/context/auth.context";

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const SecondaryHeader = forwardRef<HTMLElement, Props>(({ setIsOpen }, ref) => {
  const { user } = useAuthContext();

  return (
    <header
      ref={ref}
      className="h-18 w-full border-b-2 shadow-lg dark:bg-[#1B1B1F]"
    >
      <Layout className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-x-2.5">
          <Button className="rounded-full p-4" variant="default" size="icon">
            <span className="text-base font-bold">
              {user?.username.charAt(0)}
            </span>
          </Button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border p-1.5 xl:hidden"
          >
            <Menu className="h-9 w-9 text-gray-900 dark:text-gray-200" />
          </button>
        </div>
      </Layout>
    </header>
  );
});

SecondaryHeader.displayName = "SecondaryHeader";

export default SecondaryHeader;
