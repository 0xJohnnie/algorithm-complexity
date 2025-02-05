"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function FactorialTrailingZerosPage() {
  const MAX_SAFE_NUMBER = 500;
  const [number, setNumber] = useState<number>(1);
  const [trailingZeros, setTrailingZeros] = useState<number | null>(null);
  const [factorialValue, setFactorialValue] = useState<string | null>(null);

  const calculateFactorial = (n: number): string => {
    if (n === 0 || n === 1) {
      return "1";
    }
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
      result *= BigInt(i);
    }
    return result.toString();
  };

  const calculateTrailingZeros = (n: number): number => {
    let count = 0;
    while (n > 0) {
      n = Math.floor(n / 5);
      count += n;
    }
    return count;
  };

  const handleSliderChange = (value: number[]) => {
    const newNumber = value[0];
    setNumber(newNumber);
  };

  useEffect(() => {
    setTrailingZeros(null);
    setFactorialValue(null);

    if (number >= 0 && number <= MAX_SAFE_NUMBER) {
      const zeros = calculateTrailingZeros(number);
      setTrailingZeros(zeros);

      const factorial = calculateFactorial(number);
      setFactorialValue(factorial);
    } else {
      throw new Error(`Number must be between 0 and ${MAX_SAFE_NUMBER}`);
    }
  }, [number]);

  const formatTrailingZeros = (zeros: number) => {
    return zeros
      .toString()
      .split("")
      .map((digit, index) => (
        <span
          key={index}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold m-1"
        >
          {digit}
        </span>
      ));
  };

  const algorithmCode = `const calculateTrailingZeros = (n: number): number => {
  let count = 0;
  while (n > 0) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
};`;

  return (
    <Tabs defaultValue="visualization" className="flex flex-col h-full p-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="explanation">Explanation</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization" className="flex-grow overflow-auto">
        <Card className="flex flex-col h-[150]">
          <CardHeader>
            <CardTitle>Factorial Trailing Zeros Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="rows" className="block mb-2">
                Number of factorials : {number}!
              </Label>
              <Slider
                id="rows"
                defaultValue={[number]}
                min={1}
                max={MAX_SAFE_NUMBER}
                step={1}
                onValueChange={handleSliderChange}
              />
            </div>
          </CardContent>
        </Card>

        {trailingZeros !== null && factorialValue !== null && (
          <Card className="mt-4 flex flex-col h-[calc(100%-170px)]">
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <div className="flex flex-col items-center space-y-2">
                <span className="font-semibold text-center">
                  Number of trailing zeros
                </span>
                <div className="flex justify-center">
                  {formatTrailingZeros(trailingZeros)}
                </div>
              </div>
              <span className="font-semibold">Factorial Value:</span>
              <ScrollArea className="h-[calc(100%-130px)] border rounded mt-2 p-2 text-sm font-mono break-all whitespace-normal">
                {factorialValue}
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="explanation" className="flex-grow overflow-auto">
        <Card className="h-full flex flex-col">
          <CardContent className="overflow-y-auto flex-grow p-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-6">
              <div className="space-y-6">
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">
                      Trailing Zeros Algorithm
                    </h3>
                    <Code
                      code={algorithmCode}
                      language="javascript"
                      theme="github-dark"
                    />
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardContent className="overflow-y-auto flex-grow p-4">
                    <h3 className="text-base font-semibold mb-2">
                      Algorithm Steps
                    </h3>
                    <ol className="text-sm list-decimal pl-4 space-y-1">
                      <li>Initialize a zero-tracking counter</li>
                      <li>Iteratively divide input by 5</li>
                      <li>
                        Accumulate division results to count trailing zeros
                      </li>
                      <li>Terminate when input becomes zero</li>
                      <li>Return total trailing zero count</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
              <Card className="bg-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Complexity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        Trailing zeros in factorials come from multiplying by
                        10, which is made up of 2 and 5 (10 = 2 × 5).
                      </p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        Prime factor distribution reveals the following pattern:
                      </p>
                      <p>2s are significantly more prevalent than 5s.</p>
                      <p>
                        Every second number is even and contributes to a factor
                        of 2, where-as only numbers divisible by 5 provide a
                        factor of 5.
                      </p>
                      <p>
                        Thus, the algorithm strategically focuses on counting
                        multiples of 5 as the limiting factor in trailing zero
                        generation.
                      </p>
                    </div>
                  </div>
                  <hr className="border-muted-foreground/30 my-4" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Time Complexity: O(log n)
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        The algorithm runs in logarithmic time complexity by
                        repeatedly reducing the input through division by 5.
                      </p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Computational Characteristics:</strong>
                      </p>
                      <p>
                        For n = 100
                        <br />
                        100 → 20 (100/5)
                        <br />
                        20 → 4 (20/5)
                        <br />4 → 0 (4/5)
                      </p>
                      <p>Total computation steps: 3</p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Key Characteristics:</strong>
                      </p>
                      <ul className="list-disc pl-4">
                        <li>
                          Each step reduces the problem size exponentially
                        </li>
                        <li>Iteration count proportional to log₅(n)</li>
                      </ul>
                    </div>
                  </div>
                  <hr className="border-muted-foreground/30 my-4" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Space Complexity: O(1)
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        The algorithm achieves space efficiency by utilizing a
                        constant amount of memory.
                      </p>
                      <p>A single integer variable tracks trailing zeros.</p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Memory Utilization Insights:</strong>
                      </p>
                      <ul className="list-disc pl-4">
                        <li>Constant memory footprint across all inputs</li>
                        <li>
                          Identical memory usage for n = 10 or n = 1,000,000
                        </li>
                        <li>
                          No additional memory allocation during computation
                        </li>
                      </ul>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        The algorithm&apos;s constant space complexity enables
                        scalability and memory optimization, making it suitable
                        for resource-constrained environments.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
