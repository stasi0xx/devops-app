"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  isMobileNav?: boolean;
  collapsed?: boolean; // nowy przełącznik: gdy true, ukryj etykiety tekstowe
};

const NavLinks = ({ isMobileNav = false, collapsed = false }: Props) => {
  const pathname = usePathname();
  const userId = 1; // podstaw pod własny mechanizm pobrania id

  return (
    <>
      {sidebarLinks.map((item) => {
        // lokalny href bez mutacji oryginału
        const href =
          item.route === "/profile"
            ? userId
              ? `${item.route}/${userId}`
              : null
            : item.route;

        if (!href) return null;

        const isActive =
          (href.length > 1 && pathname.startsWith(href)) || pathname === href;

        return (
          <Link
            href={href}
            key={item.label}
            title={item.label}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-5 bg-transparent ",
              // w sidebarze zwykle pełna szerokość, w nav-barze desktop już nie
              isMobileNav ? "w-full" : "w-full",
              collapsed ? "justify-center gap-0 px-2 py-3" : "gap-3 px-3 py-5",
              isActive
                ? "primary-gradient text-light-900"
                : "text-dark300_light900 hover:bg-accent/40",
            )}
          >
            <Image
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
              className={cn(isActive ? "" : "invert-colors")}
            />
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium",
                // ukryj label w trybie collapsed (np. gdy mało miejsca)
                !isMobileNav && collapsed && "hidden",
                // w górnym navbarze (niemobilnym) można dodatkowo ukrywać na mniejszych szerokościach
              )}
            >
              {item.label}
            </p>
          </Link>
        );
      })}
    </>
  );
};

export default NavLinks;
