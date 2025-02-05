"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

class ListNode {
  constructor(public val: number = 0, public next: ListNode | null = null) {}
}

interface CycleInfo {
  detected: boolean;
  value: number | null;
  position: number;
}

export default function LinkedListCyclePage() {
  const [nodes, setNodes] = useState<ListNode[]>([]);
  const [cycleInfo, setCycleInfo] = useState<CycleInfo>({
    detected: false,
    value: null,
    position: -1,
  });

  // Floyd's Cycle-Finding Algorithm (Tortoise and Hare)
  const detectCycle = (
    head: ListNode | null
  ): { detected: boolean; node: ListNode | null; position: number } => {
    if (!head || !head.next) {
      return { detected: false, node: null, position: -1 };
    }

    // Phase 1: Detect cycle using Floyd's algorithm
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;
    let hasCycle = false;

    while (fast && fast.next) {
      slow = slow!.next;
      fast = fast.next.next;
      if (slow === fast) {
        hasCycle = true;
        break;
      }
    }

    if (!hasCycle) {
      return { detected: false, node: null, position: -1 };
    }

    // Phase 2: Find cycle start node
    let start: ListNode = head;
    let position = 0;

    while (start !== slow) {
      start = start.next!;
      slow = slow!.next;
      position++;
    }

    return { detected: true, node: start, position };
  };

  const createLinkedList = (values: number[], cyclePos: number = -1) => {
    if (values.length === 0) {
      return [];
    }

    const nodes: ListNode[] = values.map((val) => new ListNode(val));

    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].next = nodes[i + 1];
    }

    if (cyclePos >= 0 && cyclePos < nodes.length) {
      nodes[nodes.length - 1].next = nodes[cyclePos];
    }
    return nodes;
  };

  const randomizeNodes = () => {
    // Generate exactly 5 nodes with random values between -9 to 9
    const length = 5;
    const values = Array.from(
      { length },
      () => Math.floor(Math.random() * 19) - 9
    );

    // Create cycle at random position or no cycle
    const cyclePos =
      Math.random() > 0.5 ? Math.floor(Math.random() * length) : -1;
    const newNodes = createLinkedList(values, cyclePos);
    setNodes(newNodes);

    // Detect cycle
    const { detected, node, position } = detectCycle(newNodes[0] || null);
    setCycleInfo({
      detected,
      value: node ? node.val : null,
      position,
    });
  };

  const algorithmCode = `function detectCycle(head) {
    if (!head || !head.next) {
      return { detected: false, node: null, position: -1 };
    }

    // Phase 1: Detect cycle using Floyd's algorithm
    let slow = head;
    let fast = head;
    let hasCycle = false;

    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
        hasCycle = true;
        break;
      }
    }

    if (!hasCycle) {
      return { detected: false, node: null, position: -1 };
    }

    // Phase 2: Find cycle start node
    let start = head;
    let position = 0;

    while (start !== slow) {
      start = start.next;
      slow = slow.next;
      position++;
    }

    return { detected: true, node: start, position };
  }`;

  return (
    <Tabs defaultValue="visualization" className="flex flex-col h-full p-4">
      <TabsList className="grid w-full grid-cols-2 h-[48]">
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="explanation">Explanation</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization" className="flex-grow overflow-auto">
        <Card className="flex flex-col h-[250]">
          <CardHeader>
            <CardTitle>Linked List Cycle Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={randomizeNodes} className="w-full">
                Randomize Nodes
              </Button>
              <div className="flex flex-col space-y-2">
                <Label>Current Node Values</Label>
                <div className="flex flex-wrap gap-4 items-center">
                  {nodes.map((node, index) => (
                    <div key={index} className="flex items-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {node.val}
                      </span>
                      {index < nodes.length - 1 && (
                        <span className="mx-1">→</span>
                      )}
                      {index === nodes.length - 1 && cycleInfo.detected && (
                        <div className="flex items-center">
                          <span className="mx-1">→</span>
                          <span className="text-red-500 font-bold">
                            cycles to index {cycleInfo.position}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 flex flex-col h-[calc(100%-270px)]">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto">
            <div className="flex flex-col items-center space-y-2">
              <span
                className={`font-semibold text-center ${
                  cycleInfo.detected ? "text-red-500" : "text-primary"
                }`}
              >
                {cycleInfo.detected ? "Cycle Detected" : "No Cycle"}
              </span>
              <div className="flex justify-center">
                {cycleInfo.detected && (
                  <p className="text-sm">
                    Cycles to index #{cycleInfo.position}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold ml-2">
                      {cycleInfo.value}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="explanation" className="flex-grow overflow-auto">
        <Card className="h-full flex flex-col">
          <CardContent className="overflow-y-auto flex-grow p-4">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1fr] gap-6">
              <div className="space-y-6">
                <Card className="bg-muted">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-2">
                      Linked List Cycle Detection
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
                      <li>
                        Phase 1: Cycle Detection
                        <ul className="text-xs list-disc pl-4 space-y-1">
                          <li>
                            Start with two pointers, slow and fast, both
                            initially pointing to the head
                          </li>
                          <li>
                            Move slow pointer one step at a time, fast pointer
                            two steps at a time
                          </li>
                          <li>
                            If pointers meet, a cycle exists; if fast reaches
                            end, no cycle
                          </li>
                        </ul>
                      </li>
                      <li>
                        Phase 2: Cycle Start Identification
                        <ul className="text-xs list-disc pl-4 space-y-1">
                          <li>
                            Reset one pointer (start) to the head of the list
                          </li>
                          <li>
                            Move start and slow pointers one step at a time
                          </li>
                          <li>
                            The point where they meet is the start of the cycle
                          </li>
                        </ul>
                      </li>
                      <li>
                        Return the cycle start node and its position in the list
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
                      Time Complexity: O(n)
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        Floyd&apos;s Cycle-Finding Algorithm demonstrates an
                        efficient approach to cycle detection.
                      </p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Computational Characteristics:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Phase 1 (Cycle Detection): O(k), where k is the
                          distance from the head to the cycle&apos;s entry point
                        </li>
                        <li>
                          Phase 2 (Cycle Start Identification): O(m), where m is
                          the cycle&apos;s circumference
                        </li>
                        <li>
                          Total traversal: Bounded by O(n), where n is the total
                          number of nodes
                        </li>
                      </ul>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Insights:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Worst-case scenario: Single traversal of the entire
                          list
                        </li>
                        <li>
                          Best-case scenario: Early cycle detection or no cycle
                        </li>
                        <li>Guaranteed termination for finite lists</li>
                      </ul>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        The algorithm runs in linear time complexity by moving
                        pointers efficiently, avoiding redundant computations.
                      </p>
                    </div>
                  </div>

                  <hr className="border-muted-foreground/50 my-3 w-full" />

                  <div>
                    <h4 className="text-sm font-semibold mb-1">
                      Space Complexity: O(1)
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-2">
                      <p>
                        The algorithm achieves space efficiency by utilizing a
                        constant amount of memory, independent of the linked
                        list&apos;s structural complexity.
                      </p>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Memory Utilization Insights:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>
                          Constant number of pointer variables (slow, fast,
                          start)
                        </li>
                        <li>
                          No additional data structures or recursive call stack
                        </li>
                        <li>
                          Memory footprint remains consistent regardless of
                          input list size
                        </li>
                      </ul>
                      <hr className="border-muted-foreground/20 my-2" />
                      <p>
                        <strong>Comparative Memory Efficiency:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground list-disc pl-4">
                        <li>Alternative hash-set approaches: O(n) space</li>
                        <li>Recursive solutions: O(n) call stack space</li>
                        <li>Floyd&apos;s method: Consistently O(1) space</li>
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
