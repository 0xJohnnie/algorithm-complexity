"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function PascalTrianglePage() {
  const [rows, setRows] = useState<number>(1);
  const [triangle, setTriangle] = useState<number[][]>([[1]]);

  const generatePascalTriangle = (numRows: number) => {
    const triangle: number[][] = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = new Array(row + 1);
      currentRow[0] = 1;
      currentRow[row] = 1;
      for (let col = 1; col < row; col++) {
        currentRow[col] = triangle[row - 1][col - 1] + triangle[row - 1][col];
      }
      triangle.push(currentRow);
    }
    return triangle;
  };

  const handleSliderChange = (value: number[]) => {
    const newRows = value[0];
    setRows(newRows);
    setTriangle(generatePascalTriangle(newRows));
  };

  useEffect(() => {
    setTriangle(generatePascalTriangle(1));
  }, []);

  const algorithmCode = `function generatePascalTriangle(numRows) {
    const triangle = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = new Array(row + 1);
      currentRow[0] = 1;
      currentRow[row] = 1;
      for (let col = 1; col < row; col++) {
        currentRow[col] = triangle[row-1][col-1] + triangle[row-1][col];
      }
      triangle.push(currentRow);
    }
    return triangle;
  }`;

  return (
    <Tabs defaultValue="visualization" className="flex flex-col h-full p-4">
      <TabsList className="grid w-full grid-cols-2 h-[48px] shrink-0">
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="explanation">Explanation</TabsTrigger>
      </TabsList>
      <TabsContent value="visualization" className="flex-grow overflow-auto">
        <div className="flex flex-col h-full">
          <Card className="flex flex-col h-[150px]">
            <CardHeader>
              <CardTitle>Pascal&apos;s Triangle Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="rows" className="block mb-2">
                  Number of Rows: {rows}
                </Label>
                <Slider
                  id="rows"
                  defaultValue={[rows]}
                  min={1}
                  max={8}
                  step={1}
                  onValueChange={handleSliderChange}
                />
              </div>
            </CardContent>
          </Card>

          {triangle.length > 0 && (
            <Card className="mt-4 flex flex-col flex-grow">
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow overflow-auto">
                <div className="flex flex-col items-center">
                  {triangle.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex space-x-2 mb-2">
                      {row.map((num, colIndex) => (
                        <span
                          key={colIndex}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      <TabsContent value="explanation" className="flex-grow overflow-auto">
        <Card className="flex-grow flex flex-col">
          <CardContent className="flex-grow overflow-auto p-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-6">
              <div className="space-y-6">
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">
                      Pascal&apos;s Triangle Generator
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
                      <li>Initialize an empty 2D array for the triangle</li>
                      <li>Create the first row with a single element: 1</li>
                      <li>
                        For each subsequent row:
                        <ul className="text-xs list-disc pl-4 space-y-1">
                          <li>
                            Create an array sized to the current row index
                          </li>
                          <li>Set first and last elements to 1</li>
                          <li>
                            Calculate intermediate elements by summing two
                            numbers from the previous row
                          </li>
                          <li>Append the completed row to the triangle</li>
                        </ul>
                      </li>
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
                    <h4 className="text-sm font-semibold mb-1">
                      Time Complexity: O(n²)
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        The algorithm generates Pascal&apos;s Triangle through a
                        nested iteration process, resulting in quadratic time
                        complexity.
                      </p>
                      <p>
                        Each row requires progressively more computational
                        steps, creating a triangular computational pattern.
                      </p>
                      <hr className="border-muted-foreground/50 my-3 w-full" />
                      <p>
                        <strong>Computational Characteristics:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1">
                        <li>Outer loop iterates through rows (n iterations)</li>
                        <li>
                          Inner loop generates row elements with increasing
                          complexity
                        </li>
                        <li>
                          Total operations follow the arithmetic series:
                          <p>1 + 2 + 3 + ... + n = n(n+1)/2</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr className="border-muted-foreground/30 my-4" />
                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Time optimization strategies
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Even if we could compute each number in constant time,
                          we still must output O(n²) numbers
                        </li>
                        <li>
                          This means that any algorithm that explicitly returns
                          all rows cannot run in less than O(n²) time because it
                          has to at least &quot;touch&quot; every element
                        </li>
                      </ul>
                      <p>i.e. Parallel Processing: </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Using parallel processing (e.g. Splitting the rows
                          across multiple cores) can reduce the
                          &quot;wall-clock&quot; time by distributing the work
                        </li>
                        <li>
                          Though it doesn&apos;t change the fact that the
                          overall amount of work done is O(n²)
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr className="border-muted-foreground/30 my-4" />

                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Space Complexity: O(n²) for whole triangle, O(n) for
                      single row
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        The space complexity directly mirrors the time
                        complexity, as the entire triangle is stored in memory.
                      </p>
                      <p>
                        Memory consumption grows quadratically with the number
                        of rows, requiring O(n²) space.
                      </p>
                      <hr className="border-muted-foreground/50 my-3 w-full" />
                      <p>
                        <strong>Alternative Approach:</strong>
                      </p>
                      <p>
                        For specific use cases, generating only the nth row can
                        reduce space complexity to O(n) using combinatorial
                        formulas.
                      </p>
                    </div>
                  </div>

                  <hr className="border-muted-foreground/30 my-4" />

                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Space optimization strategies
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        Several optimization techniques can be applied to
                        improve memory and computational efficiency:
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Generate rows dynamically instead of storing the
                          entire triangle
                        </li>
                        <li>Implement memoization for repeated calculations</li>
                        <li>
                          Use combinatorial methods for targeted row generation
                        </li>
                      </ul>
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
