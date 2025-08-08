import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinSchema } from "@/schemas";
import { FC } from "react";
import { signInFields } from "@/constants/formFields";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import { AuthLoadingStates } from "@/types/main.types";
import { ButtonLoader, PasswordVisibilityToggler } from ".";

type Props = {
  isAdmin: boolean;
  isUsingInAuthDialog?: boolean;
};

const SignInForm: FC<Props> = ({ isAdmin, isUsingInAuthDialog = false }) => {
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
  });
  const navigate = useNavigate();
  const { login, loading } = useAuthContext();

  const loginLoading = loading === AuthLoadingStates.LOGIN_LOADING;

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    login(data, isAdmin, navigate, isUsingInAuthDialog);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4.5"
      >
        {signInFields.map(({ name, label, placeholder, type }, i) => {
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

        <Button disabled={loginLoading} className="xsm:w-fit w-full" type="submit">
          {loginLoading ? <>
            <ButtonLoader
              loaderText="Signing In..."
            />
          </> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default SignInForm;
