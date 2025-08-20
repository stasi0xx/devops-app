"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, Path, SubmitHandler, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";

type AuthFormProps<S extends z.ZodTypeAny> = {
  formType: "SIGN_IN" | "SIGN_UP";
  schema: S;
  defaultValues: DefaultValues<z.infer<S>>;
  onSubmit: (data: z.infer<S>) => Promise<{ success: boolean }>;
};

const AuthForm = <S extends z.ZodTypeAny>({
  formType,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps<S>) => {
  type FormValues = z.infer<S>;

  // @ts-expect-error-ignore
  const form = useForm<FormValues>({
    // @ts-expect-error-ignore
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    await onSubmit(data);
  };

  const buttonText = formType === "SIGN_IN" ? "Log in" : "Sign up";

  return (
    // @ts-expect-error-ignore
    <Form {...form}>
      <form
        // @ts-expect-error-ignore
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 mt-10"
      >
        {Object.keys(defaultValues as Record<string, unknown>).map(
          (fieldName) => (
            <FormField
              key={fieldName}
              // @ts-expect-error-ignore
              control={form.control}
              name={fieldName as Path<FormValues>}
              render={({ field }) => (
                <FormItem className="flex w-full flex-col gap-2.5">
                  <FormLabel className="paragraph-medium text-dark400_light700">
                    {field.name === "email"
                      ? "Email Address"
                      : field.name.charAt(0).toUpperCase() +
                        field.name.slice(1)}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={field.name === "password" ? "password" : "text"}
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ),
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
        >
          {form.formState.isSubmitting
            ? buttonText === "Log in"
              ? "Logging in..."
              : "Signing up..."
            : buttonText}
        </Button>

        {formType === "SIGN_IN" ? (
          <p>
            Don&#39;t have an account?{" "}
            <Link
              href={ROUTES.SIGN_UP}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGN_IN}
              className="paragraph-semibold primary-text-gradient"
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
