"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const ROUTES = {
  "/pascal-triangle": "pascal",
  "/linked-list-cycle": "linked-list",
  "/factorial-trailing-zeros": "factorial",
} as const;

const TABS = [
  {
    value: "pascal",
    href: "/pascal-triangle",
    label: "Pascal's Triangle",
  },
  {
    value: "linked-list",
    href: "/linked-list-cycle",
    label: "Linked List Cycle",
  },
  {
    value: "factorial",
    href: "/factorial-trailing-zeros",
    label: "Factorial Zeros",
  },
] as const;

function TabItem({ value, href, label }: (typeof TABS)[number]) {
  return (
    <TabsTrigger
      value={value}
      asChild
      className="h-full flex items-center justify-center text-[10px] sm:text-xs md:text-base"
    >
      <Link href={href} className="text-center px-1 sm:px-2">
        {label}
      </Link>
    </TabsTrigger>
  );
}

export default function TabBar() {
  const pathname = usePathname();

  if (!pathname || !(pathname in ROUTES)) {
    return null;
  }

  return (
    <div className="h-[var(--footer-height)] bg-background sticky bottom-5 p-0 mx-4">
      <Tabs
        defaultValue={ROUTES[pathname as keyof typeof ROUTES] || ""}
        className="w-full h-full"
      >
        <TabsList className="grid grid-cols-3 w-full h-full">
          {TABS.map((tab) => (
            <TabItem key={tab.value} {...tab} />
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
