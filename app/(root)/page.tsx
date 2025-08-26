import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";

const questions = [
  {
    _id: "1",
    title: "How to use Next.js?",
    description: "I am using Next.js for my project. How do I use it?",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "1", name: "Stani" },
    upvotes: 123,
    answers: 12,
    views: 123,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to build my own blog?",
    description: "I am using Next.js for my project. How do I use it?",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
    ],
    author: { _id: "1", name: "Stani" },
    upvotes: 123,
    answers: 12,
    views: 123,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase()),
  );

  return (
    <>
      <section
        className={
          "flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center"
        }
      >
        <h1 className={"h1-bold text-dark100_light900"}>All Questions</h1>
        <Button
          className={"primary-gradient min-h-[46px] px-4 py-3 text-light-900"}
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className={"mt-11"}>
        <LocalSearch
          route={"/"}
          imgSrc={"/icons/search.svg"}
          placeholder={"Search questions..."}
          otherClasses={"flex-1"}
        />
      </section>
      HomeFilter
      <div className={"mt-10 flex w-full flex-col gap-6"}>
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
};

export default Home;
