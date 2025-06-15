import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from "@/schemas/authSchema";
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage

} from "@/components/ui/form";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


type Props = {
  isAdmin: boolean;
}

const ForgotPasswordForm = ({ isAdmin }: Props) => {
  const { forgotPassword, loading } = useAuthContext()
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      identifier: ""
    }
  })

  const navigate = useNavigate()

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    await forgotPassword(isAdmin, data)
  }

  return (
    <Form
      {...form}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4.5">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email or Phone
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter email address or phone number"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-x-2">
          <Button
          type="submit"
          className="w-full xsm:w-fit"
          disabled={loading}
          >
            Send Reset Link
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => navigate(-1)}
            className="w-full xsm:w-fit"
          >
            <ArrowLeft />
            Go Back
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default ForgotPasswordForm