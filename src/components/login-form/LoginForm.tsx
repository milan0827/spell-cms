import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { loginSchema, LoginSchemaType } from "./schema/loginSchema";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const navigate = useNavigate();

  const { handleGetCredentials, isAuthenticated } = useAuthStore();

  useEffect(() => {
    localStorage.setItem(
      "credentials",
      JSON.stringify({
        username: "Milan",
        password: "milan",
      })
    );
  }, []);

  function onSubmit() {
    handleGetCredentials();
    if (isAuthenticated) {
      navigate("/");
    }
  }

  return (
    <div className="max-w-1/4 flex flex-col justify-center h-screen mx-auto ">
      <h1 className="text-center font-bold text-5xl mb-10"> SPELL CMS LOGIN</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-4  "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Username"
                    // value={data?.fname}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Password"
                    // value={data?.fname}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
