"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/url";

const filters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");
  const router = useRouter();

  const handleTypeClick = (filter: string) => {
    if (filter !== active) {
      setActive(filter);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive("");

      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keyToRemove: ["filter"],
      });
      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className={"mt-10 hidden flex-wrap gap-3 sm:flex"}>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "primary-gradient text-light-900 "
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500-500 dark:hover:bg-dark-500",
          )}
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};
export default HomeFilter;
