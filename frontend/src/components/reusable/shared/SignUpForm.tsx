import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signupSchema } from "@/schemas";
import { signUpFields } from "@/constants/formFields";
import { createUser } from "@/API/userApi";
import { FC, useState } from "react";
import { successToast, errorToast } from "@/utils/toastNotifications";
import { createAdmin } from "@/API/adminApi";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";
import { ButtonLoader } from "@/components/Skeleton&Loaders/loaders";
import { useNavigate } from "react-router-dom";

type Props = {
  isAdmin: boolean;
};

const SignUpForm: FC<Props> = ({ isAdmin }) => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      setLoading(true);
      const res = isAdmin ? await createAdmin(data) : await createUser(data);
      console.log(res);
      if (res.status === 201) {
        successToast(res.data.message);
        isAdmin ? navigate("/admin/sign-in") : navigate("/sign-in");
      }
    } catch (error: any) {
      const errorMsg = error.response.data.message;
      errorToast(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4.5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {signUpFields.map((field, i) => {
          const { label, name, type, placeholder } = field;
          return (
            <FormField
              key={i}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <PasswordVisibilityToggler
                      name={name}
                      type={type}
                      field={field}
                      placeholder={placeholder}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
        <Button disabled={loading} className="xsm:w-fit w-full" type="submit">
          {loading ? <ButtonLoader loaderText="Sign Up..." /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
