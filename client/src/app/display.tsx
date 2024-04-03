"use client";
import { Message, MessageTypeEnum } from "@/lib/types/conversation.type";
import { vapi } from "@/lib/vapi.sdk";
import React, { useEffect, useState, Fragment } from "react";
import Editor from "@monaco-editor/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CodeBracketIcon,
  XMarkIcon,
  StopIcon,
} from "@heroicons/react/24/outline";
import { CALL_STATUS, useVapi } from "@/hooks/useVapi";
import { Loader2, Mic, Square } from "lucide-react";
import { Button } from "../ui/button";
import { AssistantButton } from "./assistantButton";
import { useRouter } from "next/navigation";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AIWriter from "react-aiwriter";
const navigation = [
  { name: "Dashboard", href: "", icon: CodeBracketIcon, current: true },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function Display({
  toggleCall,
  callStatus,
  audioLevel = 0,
  stop,
}: Partial<ReturnType<typeof useVapi>>) {
  const [code, setCode] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [problem, setProblem] = useState<any>({
    link: "https://leetcode.com/problems/two-sum",
    questionId: "1",
    questionFrontendId: "1",
    questionTitle: "Two Sum",
    titleSlug: "two-sum",
    difficulty: "Easy",
    isPaidOnly: false,
    question:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
    exampleTestcases: "[2,7,11,15]\n9\n[3,2,4]\n6\n[3,3]\n6",
    topicTags: [
      {
        name: "Array",
        slug: "array",
        translatedName: null,
      },
      {
        name: "Hash Table",
        slug: "hash-table",
        translatedName: null,
      },
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say <code>x</code>, we have to scan the entire array to find the next number <code>y</code> which is <code>value - x</code> where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?",
    ],
    solution: {
      id: "7",
      canSeeDetail: true,
      paidOnly: false,
      hasVideoSolution: true,
      paidOnlyVideo: false,
    },
    companyTagStats: null,
    likes: 55633,
    dislikes: 1913,
    similarQuestions:
      '[{"title": "3Sum", "titleSlug": "3sum", "difficulty": "Medium", "translatedTitle": null}, {"title": "4Sum", "titleSlug": "4sum", "difficulty": "Medium", "translatedTitle": null}, {"title": "Two Sum II - Input Array Is Sorted", "titleSlug": "two-sum-ii-input-array-is-sorted", "difficulty": "Medium", "translatedTitle": null}, {"title": "Two Sum III - Data structure design", "titleSlug": "two-sum-iii-data-structure-design", "difficulty": "Easy", "translatedTitle": null}, {"title": "Subarray Sum Equals K", "titleSlug": "subarray-sum-equals-k", "difficulty": "Medium", "translatedTitle": null}, {"title": "Two Sum IV - Input is a BST", "titleSlug": "two-sum-iv-input-is-a-bst", "difficulty": "Easy", "translatedTitle": null}, {"title": "Two Sum Less Than K", "titleSlug": "two-sum-less-than-k", "difficulty": "Easy", "translatedTitle": null}, {"title": "Max Number of K-Sum Pairs", "titleSlug": "max-number-of-k-sum-pairs", "difficulty": "Medium", "translatedTitle": null}, {"title": "Count Good Meals", "titleSlug": "count-good-meals", "difficulty": "Medium", "translatedTitle": null}, {"title": "Count Number of Pairs With Absolute Difference K", "titleSlug": "count-number-of-pairs-with-absolute-difference-k", "difficulty": "Easy", "translatedTitle": null}, {"title": "Number of Pairs of Strings With Concatenation Equal to Target", "titleSlug": "number-of-pairs-of-strings-with-concatenation-equal-to-target", "difficulty": "Medium", "translatedTitle": null}, {"title": "Find All K-Distant Indices in an Array", "titleSlug": "find-all-k-distant-indices-in-an-array", "difficulty": "Easy", "translatedTitle": null}, {"title": "First Letter to Appear Twice", "titleSlug": "first-letter-to-appear-twice", "difficulty": "Easy", "translatedTitle": null}, {"title": "Number of Excellent Pairs", "titleSlug": "number-of-excellent-pairs", "difficulty": "Hard", "translatedTitle": null}, {"title": "Number of Arithmetic Triplets", "titleSlug": "number-of-arithmetic-triplets", "difficulty": "Easy", "translatedTitle": null}, {"title": "Node With Highest Edge Score", "titleSlug": "node-with-highest-edge-score", "difficulty": "Medium", "translatedTitle": null}, {"title": "Check Distances Between Same Letters", "titleSlug": "check-distances-between-same-letters", "difficulty": "Easy", "translatedTitle": null}, {"title": "Find Subarrays With Equal Sum", "titleSlug": "find-subarrays-with-equal-sum", "difficulty": "Easy", "translatedTitle": null}, {"title": "Largest Positive Integer That Exists With Its Negative", "titleSlug": "largest-positive-integer-that-exists-with-its-negative", "difficulty": "Easy", "translatedTitle": null}, {"title": "Number of Distinct Averages", "titleSlug": "number-of-distinct-averages", "difficulty": "Easy", "translatedTitle": null}, {"title": "Count Pairs Whose Sum is Less than Target", "titleSlug": "count-pairs-whose-sum-is-less-than-target", "difficulty": "Easy", "translatedTitle": null}]',
  });
  function handleEditorChange(value: string | undefined) {
    setCode(value || "");

    vapi.send({
      type: MessageTypeEnum.ADD_MESSAGE,
      message: {
        role: "system",
        content: `Here is the current code written by the user: ${JSON.stringify(
          code
        )}`,
      },
    });
  }

  const [feedback, setFeedback] = useState<any>(null);

  const router = useRouter();

  if (feedback !== null) {
    localStorage.setItem("feedback", JSON.stringify(feedback));

    if (toggleCall) {
      toggleCall();
    }
    router.push("/interview/feedback");
  }

  useEffect(() => {
    const onMessageUpdate = (message: Message) => {
      if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "enableEditor"
      ) {
        vapi.send({
          type: MessageTypeEnum.ADD_MESSAGE,
          message: {
            role: "assistant",
            content: `The  has been enabled, you can start tackling the problem.`,
          },
        });

        setreadOnly(false);
      } else if (
        message.type === MessageTypeEnum.FUNCTION_CALL &&
        message.functionCall.name === "finishInterview"
      ) {
        vapi.send({
          type: MessageTypeEnum.ADD_MESSAGE,
          message: {
            role: "user",
            content: `Say the endCallMessage`,
          },
        });

        setFeedback(message.functionCall.parameters);
      }
    };

    vapi.on("message", onMessageUpdate);
    vapi.on("call-end", () => console.log("call-end"));
    return () => {
      vapi.off("message", onMessageUpdate);
      vapi.off("call-end", () => console.log("call-end"));
    };
  }, []);

  
  const [readOnly, setreadOnly] = useState(true);
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      className="h-8 w-auto invert"
                      src="https://cdn-icons-png.flaticon.com/512/9777/9777458.png"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="-mx-2 flex-1 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}>
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <text>ass</text>
                        <AssistantButton
                          audioLevel={audioLevel}
                          callStatus={callStatus}
                          toggleCall={toggleCall}
                        />
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
        <div className="flex h-16 shrink-0 items-center justify-center">
          <img
            className="h-8 w-auto invert"
            src="https://cdn-icons-png.flaticon.com/512/9777/9777458.png"
            alt="Your Company"
          />
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                    "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold"
                  )}>
                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{item.name}</span>
                </a>
              </li>
            ))}

            <li>
              <AssistantButton
                audioLevel={audioLevel}
                callStatus={callStatus}
                toggleCall={toggleCall}
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setSidebarOpen(true)}>
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Your profile</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-800"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </a>
      </div>

      <main className="lg:pl-20">
        <div className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Editor
              saveViewState={true}
              height="75vh"
              width="100%"
              defaultLanguage="python"
              defaultValue="def twoSum(nums: List[int], target: int) -> List[int]:"
              options={{
                readOnly: false,
                fontSize: 14,
                fontFamily: "Droid Sans Mono",
                acceptSuggestionOnCommitCharacter: true,
                acceptSuggestionOnEnter: "on",
                autoIndent: "full",
                accessibilitySupport: "auto",
                automaticLayout: true,
                codeLens: true,
                colorDecorators: true,
                contextmenu: true,
                cursorBlinking: "blink",
                cursorSmoothCaretAnimation: "on",
                cursorStyle: "line",
                disableLayerHinting: false,
                disableMonospaceOptimizations: false,
                dragAndDrop: true,
                fixedOverflowWidgets: false,
                folding: true,
                foldingStrategy: "auto",
                fontLigatures: false,
                formatOnPaste: false,
                formatOnType: false,
              }}
              onChange={handleEditorChange}
            />
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 left-20 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block ">
        <h2 className="mb-4">
          <b>Problem Statement: </b>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: problem?.question }}></div>
        <CardDemo />
      </aside>
    </div>
  );
}

export { Display };


type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  const { activeTranscript } = useVapi()
  const [message, setMessage] = useState<any>(null)

  useEffect(() => {
    if (activeTranscript?.transcript && activeTranscript.role == "assistant") {
      setMessage(activeTranscript.transcript)
    }
    console.log(message)
  }, [activeTranscript])


  return (
    <Card className={cn("w-[300px] mt-px", className)} {...props}>
      <CardContent className="mt-px">
          <p className="mt-px">
            {message}
          </p>
      </CardContent>
    </Card>
  )
}
  