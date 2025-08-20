import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import NavLinks from "@/components/navigation/navbar/NavLinks";

const MobileNavigation = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt={"menu"}
            width={36}
            height={36}
            className={"invert-colors sm:hidden"}
          />
        </SheetTrigger>
        <SheetContent
          className={"background-light900_dark200 border-none"}
          side={"left"}
        >
          <SheetTitle className={"hidden"}>Navigation</SheetTitle>
          <Link href={"/"} className={"items-center flex gap-1 mt-4 ml-4"}>
            <Image
              src={"/images/site-logo.svg"}
              alt={"logo"}
              width={23}
              height={23}
            />
            <p
              className={
                "h2-bold font-space-grotesk text-dark-100 dark:text-light-900"
              }
            >
              Dev<span className={"text-primary-500"}>Flow</span>
            </p>
          </Link>
          <div
            className={
              "no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto"
            }
          >
            <SheetClose asChild>
              <NavLinks isMobileNav />
            </SheetClose>

            <div className={"flex-col flex gap-3"}>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    className={
                      "small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                    }
                  >
                    <span className={"primary-text-gradient"}>Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={ROUTES.SIGN_IN}>
                  <Button
                    className={
                      "small-medium btn-tertiary light-border-2 text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
                    }
                  >
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default MobileNavigation;
