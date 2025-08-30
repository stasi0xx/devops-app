import { Button } from "@/components/ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import LocalSearch from "@/components/search/LocalSearch";
import HomeFilter from "@/components/filters/HomeFilter";
import QuestionCard from "@/components/cards/QuestionCard";

const questions = [
  {
    _id: "1",
    title: "How to use Next.js?",
    description: "I am using Next.js for my project. How do I use it?",
    tags: [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
    ],
    author: {
      _id: "1",
      name: "Stani",
      image:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
    },
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
    author: {
      _id: "1",
      name: "Stani",
      image:
        "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png",
    },
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
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchQuery && matchFilter;
  });

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
      <HomeFilter />
      <div className={"mt-10 flex w-full flex-col gap-6"}>
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
};

export default Home;
