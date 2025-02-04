import Link from "next/link";

export default function Header() {
  return (
    <header
      className="w-full px-4 border-b flex items-center justify-center bg-background sticky top-0"
      style={{ height: "var(--header-height)" }}
    >
      <Link href="/" className="text-2xl font-bold">
        Algorithm Playground
      </Link>
    </header>
  );
}
