import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from "@/schemas/authSchema";
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage

} from "../ui/form";


type Props = {
  isAdmin: boolean;
}

const ForgotPassword = ({ isAdmin }: Props) => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      identifier: ""
    }
  })

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(onSubmit);
  }

  return (
    <Form
      {...form}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email of Phone
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter Email or Phone"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>
          Reset Password
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPassword