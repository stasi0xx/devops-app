"use client";

import React, { useRef } from "react";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AskQuestionSchema } from "@/lib/validations";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Undici from "undici-types";
import FormData = Undici.FormData;
import { Button } from "@/components/ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import TagCards from "@/components/cards/TagCards";
import { z } from "zod";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] },
  ) => {
    console.log(field, e);
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag must be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {
    console.log(data);
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);

    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "You must add at least one tag",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className={"flex w-full flex-col gap-10"}
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className={"flex w-full flex-col"}>
              <FormLabel className={"paragraph-semibold text-dark400_light800"}>
                Question Title <span className={"text-primary-500"}>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  className={
                    "paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription className={"body-regular text-light-500 mt-2.5"}>
                Be specific and imagine you're asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className={"flex w-full flex-col"}>
              <FormLabel className={"paragraph-semibold text-dark400_light800"}>
                Detailed explanation of your problem{" "}
                <span className={"text-primary-500"}>*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className={"body-regular text-light-500 mt-2.5"}>
                Introduce the problem in detail and expand what you've put in
                the title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name={"tags"}
          render={({ field }) => (
            <FormItem className={"flex w-full flex-col gap-3"}>
              <FormLabel className={"paragraph-semibold text-dark400_light800"}>
                Tags <span className={"text-primary-500"}>*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    className={
                      "paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px] border"
                    }
                    placeholder={"Add tags..."}
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />

                  <div className={"flex-start mt-2.5 flex-wrap gap-2.5"}>
                    {field.value.length > 0 &&
                      field?.value?.map((tag) => (
                        <TagCards
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription className={"body-regular text-light-500 mt-2.5"}>
                Add up to 3 tags to help others find your question. You need to
                press enter to add a tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <div className={"mt-16  flex justify-end"}>
          <Button
            type={"submit"}
            className={"primary-gradient text-light-900 w-fit"}
          >
            Ask a question
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default QuestionForm;
