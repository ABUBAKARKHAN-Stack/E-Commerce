import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProfileFields } from "@/constants/formFields";
import { useAuthContext } from "@/context/authContext";
import { updateProfileSchema } from "@/schemas/update-ProfileSchema";
import { IAdmin, IUser, RoleType } from "@/types/main.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  isAdmin?: boolean;
};

const UpdateProfileForm: FC<Props> = ({ isAdmin = false }) => {
  const { user, updateProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      address: "",
      email: "",
      phone: "",
      username: "",
    },
  });

  useEffect(() => {
    const currentUser = user as IUser;
    const currentAdmin = user as IAdmin;

    if (!isAdmin && currentUser) {
      form.setValue("username", currentUser.username);
      form.setValue("email", currentUser.email);
      form.setValue("phone", currentUser.phone);
      form.setValue("address", currentUser.address || "");
    }

    if (isAdmin && currentAdmin) {
      form.setValue("username", currentAdmin.username);
      form.setValue("email", currentAdmin.email);
      form.setValue("phone", currentAdmin.phone);
    }
  }, [user, isAdmin]);

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    console.log(data);

    if (!user) return;
    const res = await updateProfile(isAdmin, data, user.role as RoleType);
    if (!res) return;
    setIsEditing(false);
    form.reset(data);
  };

  const filteredFields = isAdmin
    ? updateProfileFields.filter((field) => field.name !== "address")
    : updateProfileFields;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative space-y-6"
      >
        {/* Edit button at top-right */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          <Button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="!bg-accent-foreground text-accent"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredFields.map(({ label, name, placeholder, type }, i) => (
            <FormField
              key={i}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      type={type}
                      placeholder={placeholder}
                      {...field}
                      readOnly={!isEditing}
                      disabled={!isEditing}
                      className={
                        !isEditing ? "bg-muted cursor-not-allowed" : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        {isEditing && (
          <div className="flex justify-start pt-2">
            <Button
              type="submit"
              disabled={!form.formState.isDirty}
              className="w-fit"
            >
              Update Profile
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
