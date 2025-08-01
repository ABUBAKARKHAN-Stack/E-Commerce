import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { FC } from "react";

const FormHeader: FC = () => {
  return (
    <div className="xs:max-w-[95%] mb-6 flex w-full max-w-full items-center justify-between">
      <Logo width="w-32 sm:w-40 md:w-48" />
      <Link to="/">
        <Button
          className="xxs:text-xs xsm:text-sm xsm:py-5 rounded-full text-[10px] transition-all duration-300 ease-linear hover:scale-105 hover:underline"
          variant="default"
        >
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default FormHeader;
