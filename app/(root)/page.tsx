import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <div className={"primary-gradient"}>
        <h1 className={"h1-bold font-inter "}>Hello World</h1>
      </div>
      <form
        className={"px-10 pt-[100px]"}
        action={async () => {
          "use server";

          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      >
        <Button type={"submit"}>Log out</Button>
      </form>
    </>
  );
};

export default Home;
