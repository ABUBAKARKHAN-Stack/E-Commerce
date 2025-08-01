import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../../ui/input";
import { FormDescription } from "../../ui/form";

type PasswordVisibilityTogglerProps = {
  name: string;
  type: string;
  placeholder: string;
  field: object;
};

const PasswordVisibilityToggler: FC<PasswordVisibilityTogglerProps> = ({
  name,
  type,
  placeholder,
  field,
}) => {
  const [isEyeOn, setIsEyeOn] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const eyeToggler = () => {
    setIsEyeOn((prev) => !prev);
    setIsPassVisible(!isPassVisible);
  };

  const handleButtonHovered = () => {
    setIsButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setIsButtonHovered(false);
  };

  return (
    <div>
      <Input
        type={type === "password" && isPassVisible ? "text" : type}
        placeholder={placeholder}
        {...field}
      />
      {(name === "password" ||
        name === "oldPassword" ||
        name === "newPassword") && (
        <FormDescription>
          <div className="relative text-[#1B1B1F] dark:text-gray-200">
            <button
              onMouseEnter={handleButtonHovered}
              onMouseLeave={handleButtonLeave}
              type="button"
              className="absolute -top-[73px] right-0 block cursor-pointer rounded-full p-1 transition-colors duration-200 ease-linear hover:bg-black/30"
              onClick={eyeToggler}
            >
              <div
                className={`${isButtonHovered ? "scale-90" : "scale-100"} transition-transform duration-200 ease-linear`}
              >
                {!isEyeOn ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
            </button>
          </div>
        </FormDescription>
      )}
    </div>
  );
};

export default PasswordVisibilityToggler;
