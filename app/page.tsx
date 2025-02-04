import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const algorithms = [
    {
      title: "Pascal's Triangle",
      description: "Generate symmetrical number patterns using a nested loop",
      href: "/pascal-triangle",
    },
    {
      title: "Linked List Cycle Detection",
      description: "Detect and locate cycles in a linked list",
      href: "/linked-list-cycle",
    },
    {
      title: "Factorial Trailing Zeros Calculator",
      description: "Count the number of zeros at the end of a factorial result",
      href: "/factorial-trailing-zeros",
    },
  ];

  return (
    <main className="flex flex-col w-full p-4 md:p-8 overflow-auto">
      <div className="container mx-auto grid grid-cols-1 gap-4">
        {algorithms.map((algo) => (
          <Card
            key={algo.href}
            className="w-full hover:shadow-lg transition-shadow flex flex-col"
          >
            <CardHeader>
              <CardTitle>{algo.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {algo.description}
              </p>
              <Link href={algo.href} className="w-full">
                <Button className="w-full">Explore</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
