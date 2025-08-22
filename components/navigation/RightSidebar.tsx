import React from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import TagCards from "@/components/cards/TagCards";

const hotQuestions = [
  {
    id: 1,
    title: "How to use Next.js?",
  },
  {
    id: 2,
    title: "How to use React Query?",
  },
  {
    id: 3,
    title: "How to use NextAuth.js?",
  },
  {
    id: 4,
    title: "How to use React Router?",
  },
  {
    id: 5,
    title: "How to use Redux?",
  },
];

const popularTags = [
  {
    id: 1,
    name: "React",
    questions: 123,
  },
  {
    id: 2,
    name: "Next.js",
    questions: 32,
  },
  {
    id: 3,
    name: "Redux",
    questions: 12,
  },
  {
    id: 4,
    name: "Tailwindcss",
    questions: 5,
  },
  {
    id: 5,
    name: "NextAuth.js",
    questions: 1,
  },
];

type Tag = { id: number | string; name: string; questions: number };
const isTag = (t: any): t is Tag =>
  t &&
  t.id != null &&
  typeof t.name === "string" &&
  typeof t.questions === "number";

const RightSidebar = () => {
  return (
    <section
      className={
        "pt-16 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden"
      }
    >
      <div>
        <h3 className={"h3-bold text-dark200_light900"}>Top Questions</h3>

        <div className={"mt-7 flex w-full flex-col gap-[30px]"}>
          {hotQuestions.map(({ id, title }) => (
            <Link
              key={id}
              href={ROUTES.PROFILE(String(id))}
              className={"flex cursor-pointer justify-between gap-7"}
            >
              <p className={"body-medium text-dark500_light700"}>{title}</p>
              <Image
                src={"/icons/chevron-right.svg"}
                alt={"Chevron"}
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className={"mt-16"}>
        <h3 className={"h3-bold text-dark200_light900"}>Popular Tags</h3>
        <div className={"mt-7 flex flex-col gap-4"}>
          {popularTags.filter(isTag).map(({ id, name, questions }) => (
            <TagCards
              key={id}
              _id={String(id)}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
