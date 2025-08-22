"use client";

import React, { useEffect, useRef, useState } from "react";
import NavLinks from "@/components/navigation/navbar/NavLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ROUTES from "@/constants/routes";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";

/**
 * Lewy sidebar:
 * - widoczny na >= sm (tam gdzie MobileNav jest ukryty)
 * - sticky pod nawigacją, na pełną wysokość okna minus wysokość paska (80px)
 * - automatycznie zwija etykiety, gdy szerokość jest zbyt mała
 */
const LeftSideBar = () => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const asideRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // automatyczne zwijanie, gdy szerokość < 200px
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const width =
        entry?.contentBoxSize && Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]?.inlineSize
          : entry?.contentRect?.width;

      if (typeof width === "number") {
        if (width < 200) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <aside
      className={cn(
        // ukryj na mobile (< sm), pokaz od sm w górę
        "hidden sm:flex",
        "flex-col justify-between",
        "background-light900_dark200",
        "relative after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-3 after:bg-gradient-to-r after:from-black/10 after:to-transparent dark:after:opacity-0",
        "border-r border-transparent",
        // sticky pod górnym navem (założone ~80px)
        "sticky top-[80px] h-[calc(100vh-80px)]",
        // szerokość zbliżona do „zwijanej” na małych i „rozszerzonej” na większych
        "w-16 md:w-56 lg:w-64",
        // padding i przewijanie
        "px-2 py-4",
      )}
      ref={asideRef}
    >
      {/* Linki na górze */}
      <nav className="no-scrollbar mt-2 flex-1 overflow-y-auto pr-1 mr-1">
        <NavLinks collapsed={collapsed} />
      </nav>

      {/* Akcje na dole */}
      <div className="mt-4 flex flex-col gap-2 px-2 pb-1">
        {isAuthenticated ? (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => signOut()}
            title="Wyloguj się"
          >
            <LogOut />
            {!collapsed && <span>Wyloguj się</span>}
          </Button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link href={ROUTES.SIGN_IN} className="w-full" title="Zaloguj się">
              <Button variant="secondary" className="w-full">
                <LogIn />
                {!collapsed && <span>Zaloguj się</span>}
              </Button>
            </Link>
            <Link
              href={ROUTES.SIGN_UP}
              className="w-full"
              title="Zarejestruj się"
            >
              <Button
                variant="outline"
                className="w-full light-border-2 text-dark400_light900 border"
              >
                <Image
                  src="/icons/sign-up.svg"
                  alt="Sign up"
                  width={18}
                  height={18}
                  className="mr-2 invert-colors"
                />
                {!collapsed && <span>Załóż konto</span>}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftSideBar;
