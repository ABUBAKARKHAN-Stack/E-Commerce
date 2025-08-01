import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/schemas/authSchema";
import { z } from "zod";
import { Button } from "../../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PasswordVisibilityToggler from "./PasswordVisibilityToggler";

type Props = {
  isAdmin: boolean;
  queryParameters: object | null;
};
const ResetPasswordForm: FC<Props> = ({ isAdmin, queryParameters }) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const navigate = useNavigate();

  const { resetPassword, loading } = useAuthContext();

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    await resetPassword(isAdmin, data, navigate, queryParameters);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4.5"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordVisibilityToggler
                  name="password"
                  placeholder="Enter New Password"
                  field={field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Button type="submit" className="xsm:w-fit w-full" disabled={loading}>
            Reset Password
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() =>
              navigate(isAdmin ? "/admin/forgot-password" : "/forgot-password")
            }
            className="xsm:w-fit w-full"
          >
            <ArrowLeft />
            Go Back
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
