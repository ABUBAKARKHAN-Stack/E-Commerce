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
import {
  adminUpdateProfileSchema,
  updateProfileSchema,
} from "@/schemas/update-ProfileSchema";
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

  const schema = isAdmin ? adminUpdateProfileSchema : updateProfileSchema;
  type FormSchema = z.infer<typeof schema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      ...(isAdmin ? {} : { address: "" }),
    } as any,
  });

  useEffect(() => {
    if (!user) return;

    form.setValue("username", user.username);
    form.setValue("email", user.email);
    form.setValue("phone", user.phone);

    if (!isAdmin && "address" in user) {
      form.setValue("address", user.address || "");
    }
  }, [user, isAdmin]);

  const onSubmit = async (data: FormSchema) => {
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filteredFields.map(({ label, name, placeholder, type }, i) => (
            <FormField
              key={i}
              control={form.control}
              name={name as keyof FormSchema}
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
                      className={!isEditing ? "bg-muted cursor-not-allowed" : ""}
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
