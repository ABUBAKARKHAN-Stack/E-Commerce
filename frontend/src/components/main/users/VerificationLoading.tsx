import { PartyPopperIcon } from "lucide-react";
import { FC } from "react";
type Props = {
  email: string;
};

const VerificationLoading: FC<Props> = ({ email }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-6 animate-pulse text-cyan-500 hover:text-cyan-600/90 dark:text-orange-500 dark:hover:text-orange-600/90">
        <PartyPopperIcon className="h-24 w-24" />
      </div>
      <h1 className="mb-2 text-center text-2xl font-bold text-[#1B1B1F] dark:text-white">
        Please Wait...
      </h1>
      <p className="xs:text-lg mb-6 text-center text-xs text-nowrap text-[#17171b] dark:text-gray-200">
        Verifying your Email: <span className="font-semibold">{email}</span>
      </p>
    </div>
  );
};

export default VerificationLoading;
